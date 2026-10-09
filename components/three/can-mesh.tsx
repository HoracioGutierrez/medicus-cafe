"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getCanGeometry } from "./can-geometry";
import "./can-material";
import { cans, type CanEntry } from "@/lib/cans-data";

const SPACING = 1.6;
const BACKGROUND_COLOR = new THREE.Color("#131209");

type CanMaterialImpl = THREE.ShaderMaterial & {
  uFocus: number;
  uTime: number;
};

export function CanMesh({
  can,
  index,
  offsetRef,
  onSelect,
}: {
  can: CanEntry;
  index: number;
  offsetRef: MutableRefObject<number>;
  onSelect: (index: number) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<CanMaterialImpl>(null);
  const geometry = getCanGeometry();

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    if (!mesh || !material) return;

    // Shortest signed distance around the cycle, so the shelf wraps
    // seamlessly instead of sweeping back across every can on loop.
    const n = cans.length;
    const rawDistance = index - offsetRef.current;
    let distance = ((rawDistance % n) + n) % n;
    if (distance > n / 2) distance -= n;
    const absDistance = Math.abs(distance);

    const scale = THREE.MathUtils.clamp(1.85 - absDistance * 0.5, 0.2, 1.85);
    const targetX = distance * SPACING;
    const targetZ = -absDistance * 1.05;
    const targetRotY = THREE.MathUtils.clamp(-distance * 0.5, -1.1, 1.1);
    const targetY = -absDistance * 0.04;

    mesh.position.x = THREE.MathUtils.damp(mesh.position.x, targetX, 8, delta);
    mesh.position.y = THREE.MathUtils.damp(mesh.position.y, targetY, 8, delta);
    mesh.position.z = THREE.MathUtils.damp(mesh.position.z, targetZ, 8, delta);
    mesh.rotation.y = THREE.MathUtils.damp(mesh.rotation.y, targetRotY, 8, delta);
    mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, scale, 8, delta));

    // Falls off faster than linear so outer cans fade to the background
    // color well before they would otherwise be clipped by the canvas edge.
    const falloff = Math.pow(THREE.MathUtils.clamp(absDistance / 1.75, 0, 1), 1.6);
    const targetFocus = THREE.MathUtils.clamp(1 - falloff, 0, 1);
    material.uFocus = THREE.MathUtils.damp(material.uFocus, targetFocus, 7, delta);
    material.uTime = state.clock.elapsedTime;

    mesh.visible = absDistance < 1.9;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[(index - offsetRef.current) * SPACING, 0, 0]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(index);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <canMaterial
        ref={materialRef}
        uLabelColor={can.labelColor}
        uMetalColor={can.metalColor}
        uRimColor={can.rimColor}
        uBackgroundColor={BACKGROUND_COLOR}
      />
    </mesh>
  );
}
