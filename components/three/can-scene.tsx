"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CanMesh } from "./can-mesh";
import { cans } from "@/lib/cans-data";

export function CanScene({
  focusIndex,
  offsetRef,
  isDraggingRef,
  onSelect,
}: {
  focusIndex: number;
  offsetRef: MutableRefObject<number>;
  isDraggingRef: MutableRefObject<boolean>;
  onSelect: (index: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!isDraggingRef.current) {
      offsetRef.current = THREE.MathUtils.damp(offsetRef.current, focusIndex, 5.2, delta);
    }
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} color="#f3ead9" />
      <directionalLight position={[2.5, 4, 3]} intensity={1.6} color="#f3d9a8" />
      <directionalLight position={[-3, -1, -2]} intensity={0.35} color="#b23a2e" />
      <pointLight position={[0, 1.5, 2.5]} intensity={0.4} color="#e8b64a" />

      <group ref={groupRef}>
        {cans.map((can, index) => (
          <CanMesh
            key={can.id}
            can={can}
            index={index}
            offsetRef={offsetRef}
            onSelect={onSelect}
          />
        ))}
      </group>
    </>
  );
}
