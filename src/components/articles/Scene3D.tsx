'use client';

import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  Sphere,
  Cone,
  Torus,
  RoundedBox,
} from '@react-three/drei';
import * as THREE from 'three';
import type { Mesh, Group } from 'three';

/* ─── Scroll-driven camera parallax ─── */
function ScrollCamera() {
  const { camera, invalidate } = useThree();
  const target = useRef(0);
  useFrame(() => {
    if (typeof window === 'undefined') return;
    target.current = -window.scrollY * 0.003;
    const diff = target.current - camera.position.y;
    if (Math.abs(diff) > 0.001) {
      camera.position.y += diff * 0.05;
      invalidate();
    }
  });
  return null;
}

/* ─── Auto-rotate wrapper ─── */
function Spin({ children, dx, dy }: { children: React.ReactNode; dx: number; dy: number }) {
  const ref = useRef<Mesh>(null!);
  const { invalidate } = useThree();
  useFrame(() => {
    ref.current.rotation.x += dx;
    ref.current.rotation.y += dy;
    invalidate();
  });
  return <mesh ref={ref}>{children}</mesh>;
}

/* ─── Themed shape: Speech Bubble (sphere + pointer cone) ─── */
function SpeechBubble({ color }: { color: string }) {
  const ref = useRef<Group>(null!);
  useFrame(() => { ref.current.rotation.z += 0.001; });
  return (
    <group ref={ref}>
      <Sphere args={[0.5, 16, 16]}>
        <meshStandardMaterial color={color} transparent opacity={0.3} wireframe />
      </Sphere>
      <Cone args={[0.18, 0.35, 6]} position={[-0.35, -0.45, 0]} rotation={[0, 0, 0.7]}>
        <meshStandardMaterial color={color} transparent opacity={0.3} wireframe />
      </Cone>
    </group>
  );
}

/* ─── Themed shape: Heart (extruded path) ─── */
function Heart({ color }: { color: string }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.3);
    shape.bezierCurveTo(0, 0.35, -0.05, 0.5, -0.25, 0.5);
    shape.bezierCurveTo(-0.55, 0.5, -0.55, 0.25, -0.55, 0.25);
    shape.bezierCurveTo(-0.55, 0, -0.35, -0.2, 0, -0.45);
    shape.bezierCurveTo(0.35, -0.2, 0.55, 0, 0.55, 0.25);
    shape.bezierCurveTo(0.55, 0.25, 0.55, 0.5, 0.25, 0.5);
    shape.bezierCurveTo(0.05, 0.5, 0, 0.35, 0, 0.3);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.15,
      bevelEnabled: true,
      bevelSize: 0.03,
      bevelThickness: 0.03,
      bevelSegments: 3,
    });
  }, []);
  return (
    <mesh geometry={geometry} scale={1.4}>
      <meshStandardMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

/* ─── Themed shape: Star (extruded path) ─── */
function Star({ color }: { color: string }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const points = 5;
    const outer = 0.5;
    const inner = 0.22;
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const r = i % 2 === 0 ? outer : inner;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSize: 0.02,
      bevelThickness: 0.02,
      bevelSegments: 2,
    });
  }, []);
  return (
    <mesh geometry={geometry} scale={1.5}>
      <meshStandardMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

/* ─── All themed shapes ─── */
function ThemedShapes() {
  // On mobile portrait, the viewport is very narrow (~0.46 aspect ratio).
  // Shapes at x=±3 fall outside the frustum. Scale the whole group tighter
  // horizontally so all 6 shapes are visible on any screen.
  // On mobile portrait, only compress the x-axis so shapes stay
  // full-size (visible) but fit the narrow viewport. y and z stay 1.0.
  const [mobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  return (
    <group scale={mobile ? [0.35, 0.85, 0.85] : [1, 1, 1]}>
      {/* Speech bubble — representing communication & speech therapy */}
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1} position={[-3, 2.5, -1]}>
        <group scale={mobile ? 1.4 : 1}>
          <SpeechBubble color="#87C6C7" />
        </group>
      </Float>

      {/* Heart — representing care, family partnership */}
      <Float speed={0.8} rotationIntensity={0.7} floatIntensity={1.5} position={[2.5, -2, 0.5]}>
        <group scale={mobile ? 1.4 : 1}>
          <Spin dx={0.002} dy={0.001}>
            <Heart color="#3B2C59" />
          </Spin>
        </group>
      </Float>

      {/* Star — representing achievement, potential */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8} position={[-2, -1.5, 1]}>
        <group scale={mobile ? 1.5 : 1}>
          <Spin dx={0.001} dy={0.003}>
            <Star color="#87C6C7" />
          </Spin>
        </group>
      </Float>

      {/* Ring — representing connection, community */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[3.5, 1, -0.5]}>
        <group scale={mobile ? 1.3 : 1}>
          <Spin dx={0.001} dy={0.002}>
            <Torus args={[0.6, 0.15, 12, 24]}>
              <meshStandardMaterial color="#3B2C59" transparent opacity={0.3} wireframe />
            </Torus>
          </Spin>
        </group>
      </Float>

      {/* Building block — representing learning, development */}
      <Float speed={0.5} rotationIntensity={0.6} floatIntensity={1.2} position={[1.5, 3, -2]}>
        <group scale={mobile ? 1.3 : 1}>
          <Spin dx={0.003} dy={0.001}>
            <RoundedBox args={[0.7, 0.7, 0.7]}>
              <meshStandardMaterial color="#87C6C7" transparent opacity={0.3} wireframe />
            </RoundedBox>
          </Spin>
        </group>
      </Float>

      {/* Second speech bubble — smaller, opposite side */}
      <Float speed={1} rotationIntensity={0.8} floatIntensity={0.5} position={[-3.5, -0.5, 1.5]}>
        <group scale={mobile ? 1.1 : 0.7}>
          <SpeechBubble color="#3B2C59" />
        </group>
      </Float>
    </group>
  );
}

/* ─── Main export ─── */
export default function Scene3D() {
  const [capable] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Default to 4 cores if hardwareConcurrency is undefined (some mobile browsers)
    const cores = navigator.hardwareConcurrency ?? 4;
    return (
      cores > 2 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      (() => {
        try {
          const c = document.createElement('canvas');
          return !!c.getContext('webgl2') || !!c.getContext('webgl');
        } catch {
          return false;
        }
      })()
    );
  });

  // Mobile or weak device: no 3D, no animations — just clean empty background
  const [isMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  if (!capable || isMobile) {
    return null;
  }

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="demand"
      camera={{ position: [0, 0, 6], fov: 65 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.4} />
      <ThemedShapes />
      <ScrollCamera />
    </Canvas>
  );
}
