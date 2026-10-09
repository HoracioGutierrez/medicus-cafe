# Medicus Café

Landing page para Medicus, un bar-café clásico de Buenos Aires: paredes cubiertas de banderines y bufandas de fútbol, y una estantería repleta de latas y botellas de gaseosas de todas las épocas. El sitio pone esa estantería en el centro de la experiencia con un carrusel de latas en 3D que reacciona al scroll.

**Demo en vivo:** https://medicusresto.vercel.app

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [Three.js](https://threejs.org) para la escena 3D (carga de modelo GLTF, texturas de canvas generadas en runtime para las etiquetas de cada lata)
- TypeScript + React 19
- Desplegado en [Vercel](https://vercel.com)

## La escena 3D

Todo el carrusel vive en `components/home-scene.tsx`: un único componente cliente que monta una escena de Three.js (cámara, luces, el modelo de la lata, texturas de sleeve dibujadas a mano en un `<canvas>`) y la sincroniza con el scroll de la página. El progreso de scroll controla la posición/rotación de cada lata, el fundido de las luces y un oscurecimiento del brillo de las latas al llegar a la página que se disipa a medida que el usuario avanza.

## Desarrollo local

Este proyecto usa [Bun](https://bun.sh) como gestor de paquetes.

```bash
bun install
bun dev
```

Abrí [http://localhost:3000](http://localhost:3000) para verlo.

Otros scripts:

```bash
bun run build   # build de producción
bun run start   # sirve el build de producción
bun run lint    # eslint
```

## Estructura

```
app/                  App Router: layout, page y estilos globales
components/
  home-scene.tsx       Escena 3D + markup de toda la landing
public/
  models/              Modelo GLTF de la lata
  brands/              Texturas de las etiquetas
  backgrounds/         Fondo fotográfico de la estantería
```

## Deploy

```bash
vercel deploy --prod
```

El proyecto está linkeado a `horacio-gutierrez-s-projects/medicusresto` en Vercel.
