import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei'

function MorphingSphere() {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Slowly rotate the sphere
    meshRef.current.rotation.x = time * 0.15
    meshRef.current.rotation.y = time * 0.2
    
    // Wave movement simulating floatation
    meshRef.current.position.y = Math.sin(time * 1.5) * 0.2
  })

  return (
    <mesh ref={meshRef} scale={1.1}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#6c5ce7"
        clearcoat={1.0}
        clearcoatRoughness={0.15}
        metalness={0.2}
        roughness={0.1}
        distort={0.3} // Strength of distortion
        speed={1.8} // Speed of morph animation
      />
    </mesh>
  )
}

export default function ThreeDObject() {
  return (
    <div className="hero-3d-container" style={{ width: '100%', height: '100%', minHeight: '380px', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 8.0], fov: 45 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={2.0} color="#00f5d4" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#6c5ce7" />
        <pointLight position={[2, 2, 2]} intensity={2.0} color="#00bbf9" />
        
        <MorphingSphere />
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
