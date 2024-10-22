'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export const Donut3D = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const donutRef = useRef<THREE.Group | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const initialScaleRef = useRef<number>(25)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 5, 15)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 2, 5)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    )
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.minDistance = 3
    controls.maxDistance = 10
    controls.autoRotate = true
    controls.autoRotateSpeed = 2.0
    controlsRef.current = controls

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 500
    directionalLight.shadow.bias = -0.0001
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xffffff, 1.5)
    pointLight.position.set(-5, 5, 0)
    pointLight.castShadow = true
    scene.add(pointLight)

    const rimLight = new THREE.SpotLight(0xffffff, 1)
    rimLight.position.set(0, 5, -5)
    rimLight.angle = Math.PI / 4
    scene.add(rimLight)

    const handleScroll = () => {
      if (!donutRef.current) return

      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const maxScroll = document.documentElement.scrollHeight - windowHeight

      const scrollProgress = Math.min(scrollPosition / maxScroll, 1)

      const targetScale = initialScaleRef.current * (1 + scrollProgress * 0.5)
      donutRef.current.scale.setScalar(targetScale)

      if (containerRef.current) {
        const targetPosition = scrollProgress * 200
        containerRef.current.style.transform = `translateX(${targetPosition}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)

    const loader = new GLTFLoader()
    loader.load(
      './donut.glb',
      (gltf) => {
        console.log('Model loaded successfully')
        const donut = gltf.scene

        const box = new THREE.Box3().setFromObject(donut)
        const center = box.getCenter(new THREE.Vector3())
        donut.position.sub(center)

        donut.scale.set(
          initialScaleRef.current,
          initialScaleRef.current,
          initialScaleRef.current
        )
        donut.rotation.x = Math.PI / 6
        scene.add(donut)
        donutRef.current = donut

        donut.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
            if (child.material) {
              child.material.roughness = 0.8
              child.material.metalness = 0.2
              child.material.envMapIntensity = 1.5
              child.material.transparent = true
              child.material.opacity = 1

              if (child.material.transparent) {
                child.material.alphaTest = 0.5
                child.material.side = THREE.DoubleSide
              }
            }
          }
        })
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    )

    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (controlsRef.current) {
        controlsRef.current.update()
      }

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (controlsRef.current) {
        controlsRef.current.dispose()
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
        containerRef.current?.removeChild(rendererRef.current.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-80 h-80 -z-10 rounded-lg bg-gradient-to-br from-transparent to-transparent fixed top-0 left-0"
    />
  )
}
