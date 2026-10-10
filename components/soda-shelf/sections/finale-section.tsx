export function FinaleSection() {
  return (
    <section
      className="chapter chapter--finale"
      data-slot="finale-section"
      data-chapter="finale"
    >
      <div className="finale-copy">
        <h2 data-reveal="finale">
          VISITÁ LA <span className="text-glow">ESTANTERÍA</span>
        </h2>
        <p className="chapter-description">
          Abrimos desde las siete de la mañana hasta que se apaga la última
          luz. Vení, sentate con nosotros, y escuchá alguna de estas
          historias con un cafecito en la mano.
        </p>
        <p className="chapter-description">
          En Boedo, a dos cuadras del subte, con la persiana siempre un poco
          levantada para quien llegue tarde. La estantería no se mueve de
          ahí hace sesenta años, y nosotros tampoco.
        </p>
      </div>
    </section>
  );
}
