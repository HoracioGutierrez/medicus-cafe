import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uLabelColor;
  uniform vec3 uMetalColor;
  uniform vec3 uRimColor;
  uniform vec3 uBackgroundColor;
  uniform vec3 uLightDir;
  uniform float uFocus;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);

    float diffuse = max(dot(normal, normalize(uLightDir)), 0.0);
    float wrap = clamp(dot(normal, normalize(uLightDir)) * 0.5 + 0.5, 0.0, 1.0);

    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.5);

    float band = smoothstep(0.18, 0.26, vUv.y) - smoothstep(0.74, 0.86, vUv.y);
    vec3 baseColor = mix(uMetalColor, uLabelColor, band);

    float brushed = sin(vUv.y * 420.0) * 0.015;
    baseColor += brushed;

    vec3 lit = baseColor * (0.32 + 0.68 * wrap);
    lit += uRimColor * fresnel * (0.45 + 0.55 * band);
    lit += uMetalColor * fresnel * 0.25 * (1.0 - band);

    float luminance = dot(lit, vec3(0.299, 0.587, 0.114));
    vec3 desaturated = mix(vec3(luminance), lit, 0.35 + 0.65 * uFocus);

    vec3 finalColor = mix(uBackgroundColor, desaturated, 0.22 + 0.78 * uFocus);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const CanMaterial = shaderMaterial(
  {
    uLabelColor: new THREE.Color("#b23a2e"),
    uMetalColor: new THREE.Color("#b7a98f"),
    uRimColor: new THREE.Color("#f3ead9"),
    uBackgroundColor: new THREE.Color("#131209"),
    uLightDir: new THREE.Vector3(0.6, 0.9, 0.7),
    uFocus: 1,
    uTime: 0,
  },
  vertexShader,
  fragmentShader,
);

extend({ CanMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    canMaterial: ThreeElements["shaderMaterial"] & {
      uLabelColor?: THREE.Color | string;
      uMetalColor?: THREE.Color | string;
      uRimColor?: THREE.Color | string;
      uBackgroundColor?: THREE.Color | string;
      uFocus?: number;
    };
  }
}
