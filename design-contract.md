# FoxCode Landing Dev Contract (Astro + Tailwind) — v1.0

Este documento define **normas obligatorias** para que un agente (Codex/Antigravity) genere código mantenible y consistente a partir de un diseño (p. ej. Stitch/Figma).  
**No define secciones ni contenido específico**: solo estándares de desarrollo.

---

## 0) Objetivo

- Entregar una landing **limpia, mantenible, componentizada y escalable**.
- Separar **UI** de **data**.
- Mantener consistencia de estilos con **Tailwind + tokens en CSS variables**.
- Evitar complejidad innecesaria: **sin librerías extra**.

---

## 1) Stack y restricciones

### Stack permitido

- **Astro** (pages/layouts/components)
- **TailwindCSS**
- **TypeScript**
- **React (opcional)**: solo si una sección requiere estado/interacción real.  
  Por defecto: **preferir componentes `.astro`**.

### Prohibido

- Modificar configs del proyecto: `astro.config.*`, `tailwind.config.*`, `package.json`, `tsconfig.json` (a menos que el prompt lo autorice explícitamente).
- Añadir librerías externas (UI kits, carousels, sliders, icon packs, etc.).
- Inline styles repetitivos cuando puede resolverse con clases Tailwind o utilidades comunes.
- Duplicar código de UI (botones/cards) sin abstraer.

---

## 2) Arquitectura de carpetas (obligatoria)

La estructura mínima debe seguir este patrón:

src/
pages/
index.astro
layouts/
MainLayout.astro
components/
ui/
Button.astro
Card.astro
Badge.astro
SectionHeading.astro
sections/
_.astro
data/
_.data.ts
styles/
global.css
utils/
(opcional) helpers.ts
types/
(opcional) index.ts

Reglas:

- **UI primitives** en `components/ui/`.
- **Secciones** en `components/sections/`.
- **Data** en `src/data/` con archivos `*.data.ts`.
- **Iconos SVG** en `src/assets/icons/`.
- **Tipos** compartidos en `src/types/` (si aplica).
- Evitar componentes gigantes: si un archivo supera ~200 líneas, dividir.
- Los Header y Footer se inicializan directamente en el Layout principal

---

## 3) Componentización: reglas

### 3.1 UI primitives (reutilizables)

Cualquier patrón repetido debe abstraerse como `ui/`:

- `Button`
- `Card`
- `Badge`
- `SectionHeading`
- (opcional) `Container`, `Icon`, `Input`, `Tag`

**Regla:** si se repite 2+ veces, se abstrae.

### 3.2 Secciones (features)

Cada sección debe:

- ser un componente dedicado `components/sections/<SectionName>.astro`
- recibir `props` cuando corresponda (ej. arrays de items)
- consumir data desde `src/data/*.data.ts` o `props`

### 3.3 Composición en `index.astro`

- `src/pages/index.astro` solo ensambla:
  - import de secciones
  - paso de data por props
  - orden del layout
- Cero lógica compleja dentro de `index.astro`.

---

## 4) Separación UI vs Data (obligatoria)

### 4.1 Data files

Toda data “editable” debe vivir en `src/data/`:

Ejemplos:

- `plans.data.ts`
- `testimonials.data.ts`
- `locations.data.ts`
- `benefits.data.ts`
- `faqs.data.ts` (si existe)

**Regla:** no hardcodear listas dentro de componentes si pueden iterarse.

### 4.2 Forma recomendada

- Exportar arreglos tipados.
- Definir types por entidad si aplica.

Ejemplo de contrato (referencia):

- `export const plans = [...] as const;`
- `export type Plan = (typeof plans)[number];`

### 4.3 Iteración (obligatoria)

Las secciones deben renderizar cards/items iterando la data:

- `plans.map(...)`
- `testimonials.map(...)`
- `benefits.map(...)`

---

## 5) Estilos y design tokens

### 5.1 Tokens y clases de color (OBLIGATORIO)

Los valores base (colores/fuentes) se definen en `src/styles/global.css`.

**Regla importante de uso en Tailwind:**
- **No uses** `bg-[var(--color-primary)]` ni `text-[var(--color-secondary)]`.
- **Usa SIEMPRE** clases semánticas:
  - `bg-primary`
  - `text-secondary`
  - `border-primary`
  - `ring-primary`
  - etc.

### 5.2 Convenciones de Tailwind

- Mobile-first: `base` sin prefijo, luego `sm: md: lg: xl:`.
- Preferir clases semánticas por composición: usar `ui/Button` para consistencia.
- Evitar cadenas de clases enormes. Si se complica, mover a:
  - componentes UI
  - utilidades (opcional) en `utils/helpers.ts` para `cn()` si ya existe (si no existe, evitar inventar).

---

## 6) Iconos SVG (NUEVO — obligatorio)

Todos los iconos deben guardarse en:

src/assets/icons/

Ejemplo: src/assets/icons/dumbell.svg


Importación en astro components:

```ts
import Dumbell from "src/assets/icons/dumbell.svg";
```

Uso en el componete:

<Dumbell class='text-primary size-4' />

---

## 7) Accesibilidad (A11y) — obligatorio

- Jerarquía correcta de headings: `h1` único, luego `h2/h3`.
- Botones reales para acciones (`<button>`), links para navegación (`<a>`).
- `alt` en imágenes (si son decorativas, `alt=""`).
- Focus visible en elementos interactivos.
- Contraste legible (especialmente sobre fondos oscuros).
- `aria-label` en icon-only buttons (si existen).

---

## 8) HTML semántico y SEO técnico básico

- `header`, `main`, `footer`, `section` con `aria-labelledby` cuando sea útil.
- Meta tags se manejan en `MainLayout.astro` (o donde ya esté definido).
- `title`, `description` y OpenGraph se parametrizan si existe soporte en layout.
- Evitar múltiples `h1`.

---

## 9) Rendimiento y buenas prácticas

- Imágenes: usar placeholders o `loading="lazy"` por defecto (excepto hero si aplica).
- Evitar efectos pesados (blur excesivo, sombras intensas) sin necesidad.
- CSS: no escribir CSS adicional salvo en `global.css` para tokens/base.
- No generar JS innecesario: si no hay estado, usar `.astro`.

---

## 10) Naming conventions

- Componentes: `PascalCase` (ej. `Pricing.astro`, `TestimonialCard.astro`).
- Archivos data: `kebab.case` + `.data.ts` (ej. `plans.data.ts`).
- Types: `PascalCase` (ej. `Plan`, `Testimonial`).
- Clases Tailwind: consistentes, sin duplicación.

---

## 11) Contrato de WhatsApp / CTAs

- Cualquier CTA de WhatsApp debe ser un `<a>` con formato:
  - `href="https://wa.me/<countrycode><number>?text=<encoded>"`
- Si el número real no está disponible:
  - usar placeholder `51XXXXXXXXX`
- El texto debe ser breve y orientado a conversión.
- Debe existir “estilo primario” para CTA principal (usar `Button`).

---

## 121) Manejo de estados visuales

Obligatorio en UI:

- Hover
- Focus
- Active (si aplica)
- Disabled (si se usa)

Los estados deben ser consistentes y centralizados en los primitives (Button, Card).

---

## 13) Reglas de entrega del agente

Cuando el agente genere código:

1. Debe listar **todos los archivos creados/modificados**.
2. Debe entregar el contenido completo por archivo.
3. No debe incluir explicaciones largas; solo lo necesario para integrarlo.
4. Si falta información crítica (p. ej. número WhatsApp real), usar placeholder, **no bloquear**.

---

## 14) Definition of Done (DoD)

Una landing está “lista” cuando:

- No hay duplicación evidente de UI repetida (primitives presentes).
- La data está en `src/data/*.data.ts` y se itera.
- `index.astro` solo compone secciones.
- Responsive correcto (mobile-first).
- A11y mínimo (headings, focus, links/buttons correctos).
- No se añadieron librerías ni se tocaron configs.

---

## 15) Checklist rápido (para auto QA)

- [ ] ¿Secciones están en `components/sections/`?
- [ ] ¿Botones/cards repetidos están en `components/ui/`?
- [ ] ¿Listas están en `src/data/` y se itera con `.map()`?
- [ ] ¿Existe un solo `h1`?
- [ ] ¿Hay focus visible en CTAs?
- [ ] ¿No se tocaron configs / no hay librerías extra?
- [ ] ¿Mobile se ve bien sin hacks?

---