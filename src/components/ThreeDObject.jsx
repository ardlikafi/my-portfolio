import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleCloud({ count = 1200 }) {
  const pointsRef = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 2.2 + Math.random() * 1.8 // Shell distribution
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.04
    pointsRef.current.rotation.z = Math.sin(time * 0.05) * 0.1
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#c5a880"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function MorphingSphere() {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.1
    meshRef.current.rotation.y = time * 0.15
    meshRef.current.position.y = Math.sin(time * 1.2) * 0.12
  })

  return (
    <mesh ref={meshRef} scale={1.15}>
      <sphereGeometry args={[1.0, 64, 64]} />
      <MeshDistortMaterial
        color="#c5a880"
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        metalness={0.95}
        roughness={0.08}
        distort={0.45}
        speed={1.6}
      />
    </mesh>
  )
}

function InteractiveGroup() {
  const groupRef = useRef()

  useFrame((state) => {
    const { x, y } = state.pointer // Normalized coordinates between -1 and 1
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.6, 0.04)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.6, 0.04)
  })

  return (
    <group ref={groupRef}>
      <MorphingSphere />
      <ParticleCloud />
    </group>
  )
}

export default function ThreeDObject() {
  return (
    <div className="hero-3d-container w-full h-full min-h-[380px] cursor-grab relative">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#c5a880" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#4f46e5" />
        <pointLight position={[2, 2, 2]} intensity={2.0} color="#c5a880" />
        
        <InteractiveGroup />
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
