"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { clone } from "three/addons/utils/SkeletonUtils.js";
import { CAROUSEL_ORIGIN, type Soda } from "@/lib/sodas";

/**
 * Drives the entire WebGL soda-shelf experience: the can carousel, the
 * scroll-scrubbed camera/lighting choreography, and the DOM chrome that
 * reacts to it (boot screen, carousel labels, scroll progress rail).
 *
 * This stays imperative and queries the DOM by stable class/data attributes
 * rather than refs, because it orchestrates a dozen+ elements spread across
 * several sibling components with a single shared animation clock — passing
 * that many refs through props would add indirection without a real benefit
 * here, since the DOM structure never changes after mount.
 */
export function useSodaShelfScene(sodas: Soda[]) {
  useEffect(() => {
    let disposed = false;

    const canvas = document.querySelector<HTMLCanvasElement>(".webgl");
    const boot = document.querySelector<HTMLElement>(".boot");
    const root = document.documentElement;
    const body = document.body;
    const carouselControls = document.querySelector<HTMLElement>(".carousel-controls");
    const carouselButtons = document.querySelectorAll<HTMLButtonElement>(
      "[data-carousel-direction]",
    );
    const carouselCurrentLabel = document.querySelector<HTMLElement>(
      "[data-carousel-current]",
    );
    const carouselEra = document.querySelector<HTMLElement>("[data-carousel-era]");
    const carouselDescription = document.querySelector<HTMLElement>(
      "[data-carousel-description]",
    );
    const chapterSections = document.querySelectorAll<HTMLElement>("[data-chapter]");
    const revealTargets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const backdropLayers = document.querySelectorAll<HTMLElement>(
      "[data-chapter-backdrop]",
    );
    if (
      !canvas ||
      !boot ||
      !carouselControls ||
      !carouselCurrentLabel ||
      !carouselEra ||
      !carouselDescription
    ) {
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, innerWidth / innerHeight, 0.1, 100);
    camera.position.set(0, 0, 14);

    const world = new THREE.Group();
    scene.add(world);

    const CAN_HEIGHT = 3.62;
    const Y_SHIFT = -0.3;
    const INTRO_LABEL_YAW = THREE.MathUtils.degToRad(10);
    const INGREDIENTS_PANEL = {
      x: 70,
      y: 132,
      width: 164,
      height: 250,
    };
    const INGREDIENTS_U =
      (INGREDIENTS_PANEL.x + INGREDIENTS_PANEL.width * 0.5) / 1024;
    const INGREDIENTS_LOCAL_Y =
      (0.5 -
        (INGREDIENTS_PANEL.y + INGREDIENTS_PANEL.height * 0.5) / 512) *
      3.18;

    const ambient = new THREE.HemisphereLight(0x566057, 0x010202, 0.42);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x87958c, 0.75);
    keyLight.position.set(-5, 6, 7);
    scene.add(keyLight);

    const spotTarget = new THREE.Object3D();
    scene.add(spotTarget);

    const heroSpot = new THREE.SpotLight(
      0xfff1d2,
      255,
      24,
      THREE.MathUtils.degToRad(13),
      0.62,
      1.35,
    );
    heroSpot.position.set(0, 9, 3.4);
    heroSpot.target = spotTarget;
    heroSpot.castShadow = true;
    heroSpot.shadow.mapSize.set(2048, 2048);
    heroSpot.shadow.camera.near = 1;
    heroSpot.shadow.camera.far = 24;
    heroSpot.shadow.bias = -0.00015;
    scene.add(heroSpot);

    const rimLight = new THREE.PointLight(0x9bb4ff, 19, 17, 2);
    rimLight.position.set(5.5, 0.5, 3);
    scene.add(rimLight);

    const redLight = new THREE.PointLight(0xff304b, 13, 14, 2);
    redLight.position.set(-5, -0.5, 2.5);
    scene.add(redLight);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({
        color: 0x050706,
        roughness: 0.92,
        metalness: 0.04,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.16 + Y_SHIFT;
    floor.receiveShadow = true;
    scene.add(floor);

    const assetPath = (path: string) => `/${path.replace(/^\/+/, "")}`;

    const CAROUSEL_MIN = CAROUSEL_ORIGIN - (sodas.length - 1);
    const CAROUSEL_MAX = CAROUSEL_ORIGIN;

    const textureLoader = new THREE.TextureLoader();

    function wrapTextureText(
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number,
      maxLines: number,
    ) {
      const words = text.split(" ");
      let line = "";
      const lines: string[] = [];

      words.forEach((word) => {
        const testLine = line ? `${line} ${word}` : word;
        if (ctx.measureText(testLine).width > maxWidth && line) {
          lines.push(line);
          line = word;
          return;
        }
        line = testLine;
      });
      if (line) lines.push(line);
      lines.slice(0, maxLines).forEach((textLine, index) => {
        ctx.fillText(textLine, x, y + index * lineHeight);
      });
    }

    function drawIngredientsPanel(ctx: CanvasRenderingContext2D, flavor: Soda) {
      const { x, y, width, height } = INGREDIENTS_PANEL;
      const inset = 10;

      ctx.save();
      ctx.fillStyle = "rgba(4, 6, 5, 0.84)";
      ctx.fillRect(x, y, width, height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.94)";
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 1, y + 1, width - 2, height - 2);

      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.font = "900 17px Arial Narrow, Arial, sans-serif";
      ctx.fillText("NUTRITION FACTS", x + inset, y + 9);

      ctx.fillRect(x + inset, y + 32, width - inset * 2, 3);
      ctx.font = "700 8px Arial, sans-serif";
      ctx.fillText("SERVING SIZE 1 CAN", x + inset, y + 41);
      ctx.fillText("AMOUNT PER SERVING", x + inset, y + 56);

      ctx.font = "900 11px Arial, sans-serif";
      ctx.fillText("CALORIES", x + inset, y + 70);
      ctx.textAlign = "right";
      ctx.font = "900 25px Arial Narrow, Arial, sans-serif";
      ctx.fillText(flavor.calories, x + width - inset, y + 62);
      ctx.textAlign = "left";

      ctx.fillRect(x + inset, y + 94, width - inset * 2, 3);
      ctx.font = "700 8px Arial, sans-serif";
      ([
        ["TOTAL FAT", "0G"],
        ["SODIUM", "45MG"],
        ["TOTAL CARBOHYDRATE", "39G"],
        ["TOTAL SUGARS", "39G"],
      ] as const).forEach(([label, value], index) => {
        const rowY = y + 103 + index * 13;
        ctx.fillText(label, x + inset, rowY);
        ctx.textAlign = "right";
        ctx.fillText(value, x + width - inset, rowY);
        ctx.textAlign = "left";
        ctx.fillRect(x + inset, rowY + 10, width - inset * 2, 1);
      });

      ctx.font = "900 10px Arial, sans-serif";
      ctx.fillText("INGREDIENTS", x + inset, y + 160);
      ctx.font = "700 8px Arial, sans-serif";
      wrapTextureText(
        ctx,
        flavor.ingredients,
        x + inset,
        y + 175,
        width - inset * 2,
        11,
        5,
      );

      ctx.fillStyle = "rgba(255, 255, 255, 0.78)";
      ctx.font = "700 6px Arial, sans-serif";
      ctx.fillText(
        "DEMONSTRATION LABEL · NOT FOR RETAIL",
        x + inset,
        y + height - 16,
      );
      ctx.restore();
    }

    function loadSleeveTexture(flavor: Soda) {
      const label = document.createElement("canvas");
      label.width = 1024;
      label.height = 512;
      const ctx = label.getContext("2d")!;
      ctx.fillStyle = "#090b0a";
      ctx.fillRect(0, 0, label.width, label.height);

      const texture = new THREE.CanvasTexture(label);
      textureLoader.load(assetPath(flavor.texture), (sourceTexture) => {
        if (disposed) {
          sourceTexture.dispose();
          return;
        }
        ctx.drawImage(sourceTexture.image, 0, 0, label.width, label.height);
        drawIngredientsPanel(ctx, flavor);
        texture.needsUpdate = true;
        sourceTexture.dispose();
      });
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return texture;
    }

    function buildCan(source: THREE.Object3D, flavor: Soda, index: number) {
      const can = new THREE.Group();
      can.name = `can-${flavor.name.toLowerCase()}`;

      const model = clone(source);
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const scale = CAN_HEIGHT / size.y;
      model.scale.setScalar(scale);
      model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

      const metal = new THREE.MeshPhysicalMaterial({
        color: 0xaeb4b0,
        metalness: 0.62,
        roughness: 0.28,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
      });
      model.traverse((child) => {
        if (!(child as THREE.Mesh).isMesh) return;
        const mesh = child as THREE.Mesh;
        mesh.material = metal;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      });
      can.add(model);

      const sleeve = new THREE.Mesh(
        new THREE.CylinderGeometry(1.112, 1.112, 3.18, 64, 1, true),
        new THREE.MeshPhysicalMaterial({
          map: loadSleeveTexture(flavor),
          roughness: 0.28,
          metalness: 0.18,
          clearcoat: 0.92,
          clearcoatRoughness: 0.14,
          side: THREE.DoubleSide,
        }),
      );
      sleeve.rotation.y = Math.PI * 0.44;
      sleeve.castShadow = true;
      sleeve.userData.isSleeve = true;
      can.add(sleeve);

      const rimMaterial = new THREE.MeshStandardMaterial({
        color: 0xbec3bc,
        metalness: 0.92,
        roughness: 0.2,
      });

      [-1.7, 1.7].forEach((y) => {
        const rim = new THREE.Mesh(new THREE.TorusGeometry(1.03, 0.055, 12, 64), rimMaterial);
        rim.rotation.x = Math.PI / 2;
        rim.position.y = y;
        rim.castShadow = true;
        can.add(rim);
      });

      const lid = new THREE.Mesh(new THREE.CylinderGeometry(1.03, 1.03, 0.035, 64), rimMaterial);
      lid.position.y = 1.7;
      lid.castShadow = true;
      can.add(lid);

      const tab = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.11, 0.31, 5, 10),
        new THREE.MeshStandardMaterial({ color: 0x8c918c, metalness: 0.95, roughness: 0.22 }),
      );
      tab.scale.set(1.25, 0.34, 1);
      tab.rotation.x = Math.PI / 2;
      tab.rotation.z = 0.22;
      tab.position.set(0.03, 1.735, 0.08);
      tab.castShadow = true;
      can.add(tab);

      const gloss = new THREE.Mesh(
        new THREE.CylinderGeometry(1.124, 1.124, 3.02, 64, 1, true, -0.38, 0.16),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
      gloss.userData.isGloss = true;
      can.add(gloss);

      can.userData.index = index;
      can.userData.flavor = flavor;
      can.userData.frontRotation = Math.PI - sleeve.rotation.y;
      const ingredientsTheta = INGREDIENTS_U * Math.PI * 2;
      can.userData.ingredientsRotation =
        THREE.MathUtils.euclideanModulo(
          -ingredientsTheta - sleeve.rotation.y + Math.PI,
          Math.PI * 2,
        ) - Math.PI;
      can.userData.ingredientsLocalPoint = new THREE.Vector3(
        Math.sin(ingredientsTheta + sleeve.rotation.y) * 1.13,
        INGREDIENTS_LOCAL_Y,
        Math.cos(ingredientsTheta + sleeve.rotation.y) * 1.13,
      );
      return can;
    }

    const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const smoothstep = (a: number, b: number, value: number) => {
      const x = clamp((value - a) / (b - a));
      return x * x * (3 - 2 * x);
    };
    const easeOut = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Each chapter's own [start, end) window of the page's total scroll
    // range, measured from actual layout so it stays correct regardless of
    // viewport size or content changes. Chapters are contiguous, so one
    // chapter's end is simply the next chapter's start — that shared
    // boundary point is where its crossfade window is centered, which is
    // what makes the outgoing and incoming chapter overlap symmetrically
    // instead of both bottoming out right at the handoff.
    const REVEAL_CROSSFADE = 0.025;
    const BACKDROP_CROSSFADE = 0.05;
    const REVEAL_DISTANCE_REM = 1.75;

    let chapterRanges: Record<string, { start: number; end: number }> = {};

    function measureChapters() {
      const total = document.documentElement.scrollHeight - innerHeight;
      if (total <= 0) return;
      const measured = Array.from(chapterSections)
        .map((section) => ({ chapter: section.dataset.chapter, start: section.offsetTop / total }))
        .filter((entry): entry is { chapter: string; start: number } => Boolean(entry.chapter))
        .sort((a, b) => a.start - b.start);

      const next: typeof chapterRanges = {};
      measured.forEach((entry, index) => {
        const end = index < measured.length - 1 ? measured[index + 1].start : 1;
        next[entry.chapter] = { start: entry.start, end };
      });
      chapterRanges = next;
    }

    function chapterPresence(
      chapter: string | undefined,
      progress: number,
      crossfade: number,
      { skipEntryFade = false, skipExitFade = false } = {},
    ) {
      if (!chapter) return 0;
      const range = chapterRanges[chapter];
      if (!range) return 0;
      const fadeIn = skipEntryFade
        ? 1
        : smoothstep(range.start - crossfade, range.start + crossfade, progress);
      const fadeOut = skipExitFade
        ? 1
        : 1 - smoothstep(range.end - crossfade, range.end + crossfade, progress);
      return clamp(Math.min(fadeIn, fadeOut));
    }

    const bgStops = [
      { at: 0, color: [7, 9, 9] },
      { at: 0.34, color: [8, 17, 12] },
      { at: 0.61, color: [5, 10, 8] },
      { at: 1, color: [3, 4, 4] },
    ];

    function interpolateBackground(progress: number) {
      let left = bgStops[0];
      let right = bgStops.at(-1)!;
      for (let i = 0; i < bgStops.length - 1; i += 1) {
        if (progress >= bgStops[i].at && progress <= bgStops[i + 1].at) {
          left = bgStops[i];
          right = bgStops[i + 1];
          break;
        }
      }
      const t = smoothstep(left.at, right.at, progress);
      return left.color.map((value, i) => Math.round(lerp(value, right.color[i], t)));
    }

    const loader = new GLTFLoader();
    const ingredientSpotPoint = new THREE.Vector3();
    const pointerNdc = new THREE.Vector2(2, 2);
    const pointerTarget = new THREE.Vector2();
    const pointerCurrent = new THREE.Vector2();
    const heroRaycaster = new THREE.Raycaster();
    let cans: THREE.Group[] = [];
    let scrollTarget = 0;
    let scrollCurrent = 0;
    let previousScroll = 0;
    let velocity = 0;
    const clockRef = new THREE.Clock();
    let carouselTarget = 0;
    let carouselCurrent = 0;
    let selectedIndex = CAROUSEL_ORIGIN;
    let isDraggingCarousel = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartOffset = 0;
    let carouselSnapTimer: ReturnType<typeof setTimeout>;
    let frameId = 0;

    loader.load(
      assetPath("models/soda-can.glb"),
      ({ scene: source }) => {
        if (disposed) return;
        cans = sodas.map((flavor, index) => buildCan(source, flavor, index));
        cans.forEach((can) => world.add(can));
        requestAnimationFrame(() => boot.classList.add("is-ready"));
      },
      undefined,
      (error) => {
        console.error("Could not load the soda-can model.", error);
        const mark = boot.querySelector(".boot__mark");
        if (mark) mark.textContent = "ERROR AL CARGAR";
      },
    );

    function setCanPose(can: THREE.Group, index: number, progress: number, time: number) {
      const focusIn = easeInOut(smoothstep(0.21, 0.4, progress));
      const ingredientsIn = easeInOut(smoothstep(0.48, 0.64, progress));
      const returnScale = easeOut(smoothstep(0.68, 0.8, progress));
      const returnIn = easeOut(smoothstep(0.76, 0.94, progress));
      const ingredientsFocus = ingredientsIn * (1 - returnIn);
      const centered = index - CAROUSEL_ORIGIN + carouselCurrent;
      const rememberedCentered = index - selectedIndex;
      const isHero = index === selectedIndex;

      const compact = innerWidth < 760;
      const spread = compact ? 2.62 : 2.78;
      const introX = centered * spread;
      const introY = -0.45 + Y_SHIFT + Math.cos(centered * 0.8) * 0.38;
      const introZ = -Math.abs(centered) * 0.2;
      const introRotZ = centered * -0.13;
      const introRotX = Math.sin(centered * 0.9) * 0.14;

      const focusHeroX = compact ? 0.72 : 2.65;
      const focusDepth = compact ? 0.3 : 0.5;
      const visibleHeightAtFocus =
        2 *
        (camera.position.z - focusDepth) *
        Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
      const heightFittedScale = (visibleHeightAtFocus * 0.68) / CAN_HEIGHT;
      const focusScale = Math.min(compact ? 1.12 : 1.38, heightFittedScale);
      const outerDirection = rememberedCentered < 0 ? -1 : 1;
      const outerX = introX + outerDirection * (compact ? 8 : 12) * focusIn;
      const outerY = introY + Math.abs(centered) * 0.35 * focusIn;

      const finalScale = compact ? 0.54 : 0.82;
      const finalSpread = compact ? 2.05 : 2.55;
      const finalX = rememberedCentered * finalSpread;
      const finalY =
        -0.72 + Y_SHIFT + Math.abs(rememberedCentered) * (compact ? 0.14 : 0.1);
      const finalRotZ = rememberedCentered * 0.055;
      const logoForwardRotation =
        can.userData.frontRotation +
        INTRO_LABEL_YAW +
        Math.sin(index * 1.7) * 0.025;

      let x = isHero ? lerp(introX, focusHeroX, focusIn) : outerX;
      let y = isHero ? lerp(introY, -0.1 + Y_SHIFT, focusIn) : outerY;
      let z = isHero ? lerp(introZ, focusDepth, focusIn) : introZ - focusIn * 3;
      let scale = isHero ? lerp(1, focusScale, focusIn) : lerp(1, 0.7, focusIn);
      let rotX = introRotX;
      let rotY = logoForwardRotation;
      let rotZ = introRotZ;

      if (isHero) {
        const frontFacingRotation = can.userData.frontRotation + Math.PI * 4;
        rotY =
          lerp(rotY, frontFacingRotation, focusIn) +
          Math.sin(time * 0.7) * 0.018 * focusIn * (1 - returnIn);
        const ingredientsFacingRotation =
          can.userData.ingredientsRotation + Math.PI * 4;
        rotY = lerp(rotY, ingredientsFacingRotation, ingredientsIn);
        rotX =
          lerp(lerp(rotX, -0.12, focusIn), 0.06, ingredientsIn) +
          velocity * 0.0015;
        rotZ =
          lerp(lerp(rotZ, 0.11, focusIn), -0.1, ingredientsIn) +
          Math.sin(time * 1.2) * 0.015 * focusIn * (1 - returnIn);
        y += Math.sin(time * 1.35) * 0.045 * focusIn;
      }

      if (returnIn > 0) {
        x = lerp(x, finalX, returnIn);
        y = lerp(y, finalY, returnIn);
        z = lerp(z, 0, returnIn);
        rotX = lerp(rotX, 0, returnIn);
        rotY = lerp(rotY, logoForwardRotation + Math.PI * 4, returnIn);
        rotZ = lerp(rotZ, finalRotZ, returnIn);
      }
      scale = lerp(scale, finalScale, returnScale);

      const breathe = 1 + Math.sin(time * 0.9 + index) * 0.004;
      can.position.set(x, y, z);
      can.rotation.set(rotX, rotY, rotZ);
      can.scale.setScalar(scale * breathe);

      const opacityOut = isHero ? 1 : 1 - smoothstep(0.24, 0.34, progress);
      const opacityBack = smoothstep(0.74, 0.9, progress);
      can.visible = Math.max(opacityOut, opacityBack) > 0.02;
      const landingBrightness = lerp(0.38, 1, smoothstep(0, 0.5, progress));
      can.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh || !mesh.material) return;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((material) => {
          if (material.userData.baseOpacity === undefined) {
            material.userData.baseOpacity = material.opacity;
          }
          const coloredMaterial = material as THREE.MeshStandardMaterial;
          if (!material.userData.baseColor) {
            material.userData.baseColor = coloredMaterial.color.clone();
          }
          coloredMaterial.color
            .copy(material.userData.baseColor)
            .multiplyScalar(landingBrightness);
          if (child.userData.isSleeve) {
            const physical = material as THREE.MeshPhysicalMaterial;
            physical.roughness = lerp(0.28, 0.43, ingredientsFocus);
            physical.clearcoat = lerp(0.92, 0.38, ingredientsFocus);
          }
          const detailGloss =
            child.userData.isGloss && isHero ? 1 - ingredientsFocus * 0.84 : 1;
          material.transparent = true;
          material.opacity =
            material.userData.baseOpacity *
            Math.max(opacityOut, opacityBack) *
            detailGloss;
        });
      });
    }

    const updateDOM = (progress: number) => {
      const [r, g, b] = interpolateBackground(progress);
      root.style.setProperty("--scene-r", String(r));
      root.style.setProperty("--scene-g", String(g));
      root.style.setProperty("--scene-b", String(b));
      root.style.setProperty("--progress", String(progress));

      const carouselIsActive = progress < 0.205;
      body.classList.toggle("is-carousel-active", carouselIsActive);
      carouselControls.setAttribute("aria-hidden", String(!carouselIsActive));
      carouselButtons.forEach((button) => {
        const direction = Number(button.dataset.carouselDirection);
        const atBoundary =
          (direction > 0 && selectedIndex === 0) ||
          (direction < 0 && selectedIndex === sodas.length - 1);
        button.disabled = !carouselIsActive || atBoundary;
        button.tabIndex = carouselIsActive && !atBoundary ? 0 : -1;
      });

      document.querySelectorAll<HTMLElement>("[data-depth]").forEach((line) => {
        const depth = Number(line.dataset.depth);
        const amount = Math.min(scrollCurrent * innerHeight, innerHeight * 1.3);
        line.style.transform = `translate3d(${amount * depth}px, ${amount * -0.035}px, 0)`;
      });
    };

    function updateScroll() {
      const maxScroll = document.documentElement.scrollHeight - innerHeight;
      scrollTarget = maxScroll > 0 ? scrollY / maxScroll : 0;
    }

    function resize() {
      renderer.setSize(innerWidth, innerHeight);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
      camera.aspect = innerWidth / innerHeight;
      camera.fov = innerWidth < 760 ? 42 : 32;
      camera.position.z = innerWidth < 760 ? 15 : 14;
      camera.updateProjectionMatrix();
      measureChapters();
    }

    const syncSelectedCan = () => {
      const nextIndex = clamp(
        CAROUSEL_ORIGIN - Math.round(carouselTarget),
        0,
        sodas.length - 1,
      );
      if (nextIndex === selectedIndex) return;
      selectedIndex = nextIndex;
      carouselCurrentLabel.textContent = sodas[selectedIndex].label;
      carouselEra.textContent = sodas[selectedIndex].era;
      carouselDescription.textContent = sodas[selectedIndex].description;
    };

    function updateCarousel(direction: number) {
      carouselTarget = clamp(
        Math.round(carouselTarget) + direction,
        CAROUSEL_MIN,
        CAROUSEL_MAX,
      );
      syncSelectedCan();
    }

    function snapCarousel() {
      carouselTarget = clamp(Math.round(carouselTarget), CAROUSEL_MIN, CAROUSEL_MAX);
      syncSelectedCan();
    }

    function scheduleCarouselSnap() {
      clearTimeout(carouselSnapTimer);
      carouselSnapTimer = setTimeout(snapCarousel, 140);
    }

    function handleCarouselButtonClick(event: Event) {
      const button = event.currentTarget as HTMLButtonElement;
      updateCarousel(Number(button.dataset.carouselDirection));
    }
    carouselButtons.forEach((button) => {
      button.addEventListener("click", handleCarouselButtonClick);
    });

    function handlePointerDown(event: PointerEvent) {
      if (
        scrollCurrent >= 0.205 ||
        event.button !== 0 ||
        (event.target as HTMLElement).closest?.("a, button, input, textarea, select")
      ) {
        return;
      }

      isDraggingCarousel = true;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      dragStartOffset = carouselTarget;
      body.classList.add("is-dragging");
    }

    function handlePointerMove(event: PointerEvent) {
      pointerNdc.set(
        (event.clientX / innerWidth) * 2 - 1,
        -(event.clientY / innerHeight) * 2 + 1,
      );
      if (!isDraggingCarousel) return;

      const deltaX = event.clientX - dragStartX;
      const deltaY = event.clientY - dragStartY;
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 5) {
        event.preventDefault();
      }
      carouselTarget = clamp(
        dragStartOffset + (deltaX / innerWidth) * 4.2,
        CAROUSEL_MIN,
        CAROUSEL_MAX,
      );
      syncSelectedCan();
    }

    function handlePointerLeave() {
      pointerNdc.set(2, 2);
    }

    function endCarouselDrag() {
      isDraggingCarousel = false;
      body.classList.remove("is-dragging");
      snapCarousel();
    }

    function handleWheel(event: WheelEvent) {
      if (scrollCurrent >= 0.205) return;
      const lateralDelta = event.shiftKey ? event.deltaY : event.deltaX;
      if (Math.abs(lateralDelta) < Math.abs(event.deltaY) * 0.65) return;

      event.preventDefault();
      carouselTarget = clamp(
        carouselTarget - lateralDelta * 0.0028,
        CAROUSEL_MIN,
        CAROUSEL_MAX,
      );
      syncSelectedCan();
      scheduleCarouselSnap();
    }

    function handleKeydown(event: KeyboardEvent) {
      if (
        scrollCurrent >= 0.205 ||
        (event.target as HTMLElement).matches?.("input, textarea, select")
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        updateCarousel(1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        updateCarousel(-1);
      }
    }

    addEventListener("pointerdown", handlePointerDown);
    addEventListener("pointermove", handlePointerMove);
    addEventListener("pointerleave", handlePointerLeave);
    addEventListener("pointerup", endCarouselDrag);
    addEventListener("pointercancel", endCarouselDrag);
    addEventListener("wheel", handleWheel, { passive: false });
    addEventListener("keydown", handleKeydown);
    addEventListener("scroll", updateScroll, { passive: true });
    addEventListener("resize", resize);
    updateScroll();
    measureChapters();

    function updateChapterEffects() {
      backdropLayers.forEach((layer) => {
        const presence = chapterPresence(
          layer.dataset.chapterBackdrop,
          scrollCurrent,
          BACKDROP_CROSSFADE,
          {
            skipEntryFade: layer.dataset.chapterBackdrop === "intro",
            skipExitFade: layer.dataset.chapterBackdrop === "finale",
          },
        );
        layer.style.opacity = String(presence);
      });

      revealTargets.forEach((el) => {
        if (reducedMotion) {
          el.style.opacity = "1";
          el.style.translate = "none";
          return;
        }
        const presence = chapterPresence(el.dataset.reveal, scrollCurrent, REVEAL_CROSSFADE, {
          skipEntryFade: el.dataset.reveal === "intro",
          skipExitFade: el.dataset.reveal === "finale",
        });
        el.style.opacity = String(presence);
        el.style.translate = `0 ${(1 - presence) * REVEAL_DISTANCE_REM}rem`;
      });
    }

    function render() {
      if (disposed) return;
      const time = clockRef.getElapsedTime();
      const smoothing = reducedMotion ? 1 : 0.075;
      scrollCurrent = lerp(scrollCurrent, scrollTarget, smoothing);
      velocity = lerp(velocity, (scrollCurrent - previousScroll) * 10000, 0.12);
      previousScroll = scrollCurrent;
      carouselCurrent = lerp(carouselCurrent, carouselTarget, reducedMotion ? 1 : 0.12);
      syncSelectedCan();

      updateDOM(scrollCurrent);
      updateChapterEffects();
      cans.forEach((can, index) => setCanPose(can, index, scrollCurrent, time));

      world.rotation.y = Math.sin(time * 0.28) * 0.015;
      camera.position.x = Math.sin(time * 0.22) * 0.04 + velocity * 0.0002;
      camera.lookAt(0, -0.1, 0);
      camera.updateMatrixWorld();

      const heroCan = cans[selectedIndex];
      const pointerPresence =
        smoothstep(0.2, 0.38, scrollCurrent) * (1 - smoothstep(0.68, 0.82, scrollCurrent));
      if (heroCan && pointerPresence > 0.01) {
        heroCan.updateWorldMatrix(true, true);
        heroRaycaster.setFromCamera(pointerNdc, camera);
        const isHoveringHero = heroRaycaster.intersectObject(heroCan, true).length > 0;
        if (isHoveringHero) {
          pointerTarget.set(pointerNdc.x, pointerNdc.y);
        } else {
          pointerTarget.set(0, 0);
        }
      } else {
        pointerTarget.set(0, 0);
      }
      pointerCurrent.lerp(
        pointerTarget,
        reducedMotion ? 1 : pointerTarget.lengthSq() > 0 ? 0.09 : 0.065,
      );
      if (heroCan) {
        const pointerStrength = pointerPresence * (innerWidth < 760 ? 0.72 : 1);
        heroCan.rotation.x += -pointerCurrent.y * 0.085 * pointerStrength;
        heroCan.rotation.y += pointerCurrent.x * 0.12 * pointerStrength;
        heroCan.rotation.z +=
          (-pointerCurrent.x * 0.045 + pointerCurrent.y * 0.02) * pointerStrength;
      }

      const ingredientsPresence =
        smoothstep(0.47, 0.64, scrollCurrent) * (1 - smoothstep(0.73, 0.86, scrollCurrent));
      if (heroCan) {
        const lightSmoothing = reducedMotion ? 1 : 0.16;
        ingredientSpotPoint.copy(heroCan.userData.ingredientsLocalPoint);
        heroCan.localToWorld(ingredientSpotPoint);
        spotTarget.position.x = lerp(
          spotTarget.position.x,
          lerp(heroCan.position.x, ingredientSpotPoint.x, ingredientsPresence),
          lightSmoothing,
        );
        spotTarget.position.y = lerp(
          spotTarget.position.y,
          lerp(heroCan.position.y + 0.35, ingredientSpotPoint.y, ingredientsPresence),
          lightSmoothing,
        );
        spotTarget.position.z = lerp(
          spotTarget.position.z,
          lerp(heroCan.position.z, ingredientSpotPoint.z, ingredientsPresence),
          lightSmoothing,
        );
        heroSpot.position.x = lerp(
          heroSpot.position.x,
          lerp(heroCan.position.x - 0.35, ingredientSpotPoint.x - 0.7, ingredientsPresence),
          reducedMotion ? 1 : 0.12,
        );
        heroSpot.position.y = lerp(
          heroSpot.position.y,
          lerp(9, ingredientSpotPoint.y + 3.2, ingredientsPresence),
          reducedMotion ? 1 : 0.12,
        );
        heroSpot.position.z = lerp(
          heroSpot.position.z,
          lerp(3.4, ingredientSpotPoint.z + 4.8, ingredientsPresence),
          reducedMotion ? 1 : 0.12,
        );
      }
      heroSpot.angle = lerp(
        THREE.MathUtils.degToRad(13),
        THREE.MathUtils.degToRad(10.5),
        ingredientsPresence,
      );

      rimLight.intensity = lerp(13, 24, smoothstep(0.18, 0.48, scrollCurrent));
      redLight.intensity = lerp(12, 6, smoothstep(0.35, 0.7, scrollCurrent));

      const focusPresence =
        smoothstep(0.18, 0.38, scrollCurrent) * (1 - smoothstep(0.68, 0.86, scrollCurrent));
      const finalePresence = smoothstep(0.74, 0.9, scrollCurrent);
      const restingFloorY = lerp(-2.16 + Y_SHIFT, -2.55 + Y_SHIFT, finalePresence);
      floor.position.y = lerp(restingFloorY, -2.92 + Y_SHIFT, focusPresence);
      heroSpot.intensity = lerp(lerp(255, 340, focusPresence), 195, ingredientsPresence);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(carouselSnapTimer);
      carouselButtons.forEach((button) => {
        button.removeEventListener("click", handleCarouselButtonClick);
      });
      removeEventListener("pointerdown", handlePointerDown);
      removeEventListener("pointermove", handlePointerMove);
      removeEventListener("pointerleave", handlePointerLeave);
      removeEventListener("pointerup", endCarouselDrag);
      removeEventListener("pointercancel", endCarouselDrag);
      removeEventListener("wheel", handleWheel);
      removeEventListener("keydown", handleKeydown);
      removeEventListener("scroll", updateScroll);
      removeEventListener("resize", resize);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.geometry?.dispose();
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((material) => material?.dispose());
        }
      });
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
