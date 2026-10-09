import * as THREE from "three";

let cached: THREE.LatheGeometry | null = null;

export function getCanGeometry() {
  if (cached) return cached;

  const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.68, 0),
    new THREE.Vector2(0.74, 0.04),
    new THREE.Vector2(0.72, 0.14),
    new THREE.Vector2(0.74, 0.24),
    new THREE.Vector2(0.74, 1.9),
    new THREE.Vector2(0.7, 2.0),
    new THREE.Vector2(0.44, 2.12),
    new THREE.Vector2(0.4, 2.18),
    new THREE.Vector2(0.4, 2.2),
    new THREE.Vector2(0, 2.2),
  ];

  const geometry = new THREE.LatheGeometry(points, 56);
  geometry.center();
  cached = geometry;
  return geometry;
}
