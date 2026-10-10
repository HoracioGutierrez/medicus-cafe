import type { Soda } from "@/lib/sodas";

type CarouselControlsProps = {
  /** The soda shown centered when the shelf loads — the engine takes over
   *  updating these labels as the visitor browses the carousel. */
  initialSoda: Soda;
};

export function CarouselControls({ initialSoda }: CarouselControlsProps) {
  return (
    <div className="carousel-controls" data-slot="carousel-controls">
      <button
        type="button"
        className="carousel-control carousel-control--previous"
        data-carousel-direction="1"
        aria-label="Lata anterior"
      >
        ‹
      </button>
      <button
        type="button"
        className="carousel-control carousel-control--next"
        data-carousel-direction="-1"
        aria-label="Lata siguiente"
      >
        ›
      </button>
      <p className="carousel-hint">
        <i aria-hidden="true" />
        <span className="carousel-meta">
          <span className="carousel-current" data-carousel-current>
            {initialSoda.label}
          </span>
          <span className="carousel-era" data-carousel-era>
            {initialSoda.era}
          </span>
        </span>
      </p>
      <p className="carousel-description" data-carousel-description>
        {initialSoda.description}
      </p>
    </div>
  );
}
