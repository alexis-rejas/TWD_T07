# Fundamentos de Tailwind CSS - Respuesta del Proyecto

## G. Definición y Comprensión (0/2)

### ¿Qué es Tailwind CSS?

Tailwind CSS es un framework CSS de **utilidad-primero** que proporciona clases predefinidas para construir diseños sin escribir CSS personalizado. En lugar de crear clases con nombres semánticos, usas clases pequeñas y reutilizables directamente en el HTML.

### Características principales en el proyecto:

```html
<!-- En templates/index.html usamos clases Tailwind -->
<div id="info" class="fixed top-2 left-1/2 -translate-x-1/2 text-gray-500 text-sm uppercase tracking-widest pointer-events-none z-8">
    ESFERA DE LENGUAJES — GIRANDO
</div>
```

**Clases Tailwind usadas:**
- `fixed` - Posicionamiento fijo
- `top-2` - Top: 0.5rem
- `left-1/2` - Left: 50%
- `-translate-x-1/2` - Centra horizontalmente
- `text-gray-500` - Color de texto gris
- `text-sm` - Tamaño pequeño
- `uppercase` - Texto en mayúsculas
- `tracking-widest` - Espaciado de letras
- `pointer-events-none` - No captura eventos del mouse
- `z-8` - Z-index: 20

### Ventajas aplicadas en este proyecto:

1. **Desarrollo rápido** - Estilos listos sin escribir CSS
2. **Consistencia** - Espaciado, colores y tipografía uniformes
3. **Responsive** - Clases para diferentes tamaños de pantalla
4. **Dark Mode** - Soporte integrado (fondo negro)
5. **Sin CSS innecesario** - Solo genera estilos usados

---

## H. Cómo Funciona (0/3)

### Flujo de compilación en nuestro proyecto:

```
input.css (directivas Tailwind)
    ↓
Tailwind procesa
    ↓
output.css (estilos compilados)
    ↓
index.html carga output.css
```

### Archivos del proyecto:

**1. `static/css/input.css`** - Archivo fuente:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html, body {
    @apply m-0 p-0 w-full h-full;
  }

  body {
    @apply bg-black overflow-hidden;
  }
}

@layer components {
  #info {
    @apply fixed top-2 left-1/2 -translate-x-1/2 text-gray-500 text-sm uppercase tracking-widest pointer-events-none z-8;
  }
}
```

**Explicación:**
- `@tailwind base` - Reset y estilos base del navegador
- `@tailwind components` - Componentes reutilizables
- `@tailwind utilities` - Clases de utilidad (la mayoría del tamaño)
- `@layer base/components/utilities` - Organiza estilos por capas
- `@apply` - Aplica clases Tailwind dentro de CSS personalizado

**2. `static/css/output.css`** - Archivo compilado (generado):
```css
html, body {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}

body {
  overflow: hidden;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
}

#info {
  pointer-events: none;
  position: fixed;
  top: 0.5rem;
  left: 50%;
  /* ...más estilos compilados */
}
```

**Tailwind convierte las clases en CSS real**

### Proceso de compilación:

En `package.json` definimos los scripts:
```json
{
  "scripts": {
    "dev": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css --watch",
    "build": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css"
  }
}
```

**Comandos:**
```bash
npm run build    # Compila una sola vez
npm run dev      # Compila y observa cambios (desarrollo)
```

### Configuración:

**`tailwind.config.js`** define dónde buscar clases:
```javascript
export default {
  content: [
    "./templates/**/*.html",      // Busca clases en HTML
    "./static/**/*.js",            // Busca clases en JS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Tailwind **solo genera clases que usa** en estos archivos.

---

## I. Escenarios de Uso (0/4)

### Escenario 1: Diseño Dark Mode

**Problema:** Necesitamos un fondo negro con tipografía gris/blanca

**Solución con Tailwind:**
```html
<body class="bg-black">
  <div class="text-gray-500">Contenido</div>
</body>
```

**En input.css:**
```css
@layer base {
  body {
    @apply bg-black overflow-hidden;
  }
}
```

**Resultado:** Fondo completamente negro sin escribir `background-color: #000000`

### Escenario 2: Posicionamiento y Centrado

**Problema:** Posicionar el título en el centro superior

**Solución con Tailwind:**
```html
<div class="fixed top-2 left-1/2 -translate-x-1/2">
  ESFERA DE LENGUAJES
</div>
```

**Clases:**
- `fixed` = position: fixed
- `top-2` = top: 0.5rem
- `left-1/2` = left: 50%
- `-translate-x-1/2` = transform: translateX(-50%)

**Ventaja:** 4 clases = centraje perfecto. Sin calculadoras manuales.

### Escenario 3: Tipografía

**Problema:** Texto en mayúsculas, gris, pequeño, con espaciado

**Solución con Tailwind:**
```html
<div class="uppercase text-gray-500 text-sm tracking-widest">
  ESFERA DE LENGUAJES — GIRANDO
</div>
```

**Clases:**
- `uppercase` = text-transform: uppercase
- `text-gray-500` = color: rgb(107 114 128)
- `text-sm` = font-size: 0.875rem
- `tracking-widest` = letter-spacing: 0.1em

### Escenario 4: Interactividad y Z-index

**Problema:** El título no debe interferir con clics del mouse

**Solución con Tailwind:**
```html
<div class="pointer-events-none z-8">
  <!-- No captura eventos del mouse -->
</div>
```

**Clases:**
- `pointer-events-none` = pointer-events: none
- `z-8` = z-index: 20

---

## J. Cómo Prevenir Errores (0/4)

### Error 1: Olvidar compilar Tailwind

**Problema:**
```bash
npm install   # Instala dependencias
# Olvidas compilar
npm run build # ❌ FALTA
python app.py # El CSS no está compilado
```

**Solución:**
```bash
npm install
npm run build  # ✓ SIEMPRE compila primero
python app.py
```

### Error 2: Usar clases personalizadas sin @apply

**Incorrecto:**
```css
/* input.css */
.titulo {
  fixed top-2 left-1/2;  /* ❌ Sintaxis incorrecta */
}
```

**Correcto:**
```css
/* input.css */
.titulo {
  @apply fixed top-2 left-1/2;  /* ✓ Usa @apply */
}
```

### Error 3: Las clases no existen en el output.css

**Problema:**
```html
<!-- templates/index.html -->
<div class="bg-red-999">  <!-- ❌ No existe -->
  Contenido
</div>
```

**Solución - Usa clases válidas:**
```html
<div class="bg-red-500">  <!-- ✓ Existe en Tailwind -->
  Contenido
</div>
```

**Clases Tailwind válidas:**
- Colores: `red-50`, `red-100`, ..., `red-900`, `red-950`
- Tamaños: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`
- Espacios: `p-0`, `p-1`, `p-2`, ..., `p-96`

### Error 4: No actualizar tailwind.config.js

**Problema:**
```javascript
// tailwind.config.js - MALO
export default {
  content: [
    "./templates/**/*.html",  // Solo busca templates
    // ❌ Se olvidó static/js/
  ]
}
```

**Solución:**
```javascript
// tailwind.config.js - CORRECTO
export default {
  content: [
    "./templates/**/*.html",  // HTML files
    "./static/**/*.js",       // JavaScript files
    "./static/**/*.html",     // Todos los HTML
  ]
}
```

### Error 5: Cambios no se reflejan en desarrollo

**Problema:**
```bash
npm run build  # Compiló una sola vez
# Haces cambios en input.css
# Cambios NO aparecen
```

**Solución - Usa watch mode:**
```bash
npm run dev    # Observa cambios automáticamente
# En otra terminal
python app.py
```

---

## Resumen Aplicado al Proyecto

### Estructura completa:

```
1. Editas static/css/input.css
   ↓
2. npm run dev (observa cambios)
   ↓
3. Tailwind compila → static/css/output.css
   ↓
4. templates/index.html carga output.css
   ↓
5. Clases Tailwind se aplican en HTML
   ↓
6. Esfera con estilos correctos
```

### Clases Tailwind del proyecto:

| Elemento | Clases | Resultado |
|----------|--------|-----------|
| Body | `bg-black overflow-hidden m-0 p-0` | Fondo negro, sin scroll, sin márgenes |
| Info | `fixed top-2 left-1/2 -translate-x-1/2 text-gray-500 text-sm uppercase tracking-widest pointer-events-none z-8` | Título centrado, gris, pequeño, no interfiere |

### Comandos clave:

```bash
# Instalación
npm install

# Desarrollo (observa cambios)
npm run dev

# Producción (compila una vez)
npm run build

# Ejecutar proyecto
python app.py
```

---

## Conclusión

**Tailwind CSS permite:**
1. **Escribir CSS en el HTML** con clases predefinidas
2. **Compilar solo lo usado** (archivo pequeño)
3. **Mantener consistencia** de diseño
4. **Desarrollar rápido** sin escribir CSS personalizado
5. **Escalar fácilmente** reutilizando clases

En este proyecto usamos Tailwind para estilizar un único elemento (`#info`) de forma rápida y consistente, manteniendo el foco en la lógica 3D con Three.js.
