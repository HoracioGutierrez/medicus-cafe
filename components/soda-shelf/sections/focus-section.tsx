export function FocusSection() {
  return (
    <section
      className="chapter chapter--focus"
      data-slot="focus-section"
      data-chapter="focus"
    >
      <div className="focus-copy">
        <h2 className="display display--focus" data-reveal="focus">
          MIRÁ DE CERCA
          <br />
          <em>leé la etiqueta</em>
        </h2>
        <p className="chapter-description">
          Cada lata de esta estantería lleva más tiempo acá que muchos
          parroquianos en su mesa de siempre. Dale una vuelta — los
          ingredientes no cambiaron desde el día que llegó.
        </p>
        <p className="chapter-description">
          Si mirás bien vas a encontrar abolladuras que no son accidentes:
          cada una tiene una historia, aunque el mozo de turno no siempre se
          acuerde cuál.
        </p>
      </div>
    </section>
  );
}
