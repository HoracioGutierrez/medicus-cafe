export function BurstSection() {
  return (
    <section
      className="chapter chapter--burst"
      data-slot="burst-section"
      data-chapter="burst"
    >
      <h2 className="burst-title" data-reveal="burst">
        <span>SIGUEN FRÍAS</span>
        <span>siguen acá</span>
      </h2>
      <p className="chapter-description burst-description">
        La cocina no para desde las siete: medialunas recién horneadas a la
        mañana, milanesas al mediodía, y una picada improvisada si te quedás
        hasta tarde.
      </p>
      <p className="chapter-description burst-description">
        Atrás del mostrador casi siempre está Martín, que te va a preguntar
        por tu semana antes que por tu pedido. Acá no hay clientes nuevos,
        solo gente que todavía no volvió.
      </p>
    </section>
  );
}
