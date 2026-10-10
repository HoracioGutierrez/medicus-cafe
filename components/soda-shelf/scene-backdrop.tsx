const BACKDROPS = [
  { chapter: "intro", image: "/backgrounds/bg-1.jpg" },
  { chapter: "focus", image: "/backgrounds/bg-2.jpg" },
  { chapter: "burst", image: "/backgrounds/bg-3.jpg" },
  { chapter: "finale", image: "/backgrounds/bg-4.jpg" },
] as const;

/**
 * Four stacked, full-viewport background photos — one per chapter. Their
 * opacity is crossfaded by the scene engine every frame, driven by how much
 * of each chapter is currently in view, so the backdrop changes as the
 * visitor scrolls between sections.
 */
export function SceneBackdrop() {
  return (
    <div className="scene-backdrop" data-slot="scene-backdrop" aria-hidden="true">
      {BACKDROPS.map(({ chapter, image }) => (
        <div
          key={chapter}
          className="scene-backdrop__layer"
          data-chapter-backdrop={chapter}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
}
