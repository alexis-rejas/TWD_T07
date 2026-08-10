# Comandos Usados para Instalar Tailwind y Configurar el Proyecto

## 1. Inicializar proyecto Node

```bash
npm init -y
```

Crea `package.json` con configuración por defecto.

---

## 2. Instalar Tailwind CSS y dependencias

```bash
npm install -D tailwindcss postcss autoprefixer
npm install three
```

**Lo que instala:**
- `tailwindcss` - Framework CSS
- `postcss` - Procesador CSS
- `autoprefixer` - Prefijos automáticos para navegadores
- `three` - Librería 3D (Three.js)

---

## 3. Inicializar configuración de Tailwind

```bash
npx tailwindcss init -p
```

Crea dos archivos:
- `tailwind.config.js` - Configuración de Tailwind
- `postcss.config.js` - Configuración de PostCSS

---

## 4. Configurar template paths en tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./templates/**/*.html",
    "./static/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 5. Crear estructura de carpetas

```bash
mkdir -p static/css
mkdir -p static/js
mkdir -p templates
```

---

## 6. Crear static/css/input.css

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

---

## 7. Compilar Tailwind (primera vez)

```bash
npx tailwindcss -i ./static/css/input.css -o ./static/css/output.css
```

Genera `static/css/output.css` con todos los estilos compilados.

---

## 8. Agregar scripts a package.json

```json
{
  "scripts": {
    "dev": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css --watch",
    "build": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css",
    "start": "python -m http.server 8000 --directory ."
  }
}
```

---

## 9. Crear static/js/script.js

Script de Three.js con la esfera (ver archivo existente).

---

## 10. Crear templates/index.html

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Esfera de Lenguajes de Programación</title>
    <link rel="stylesheet" href="static/css/output.css">
</head>
<body>
    <div id="info">ESFERA DE LENGUAJES — GIRANDO</div>
    <script type="importmap">
    {
        "imports": {
            "three": "/node_modules/three/build/three.module.js",
            "three/addons/": "/node_modules/three/examples/jsm/"
        }
    }
    </script>
    <script type="module" src="static/js/script.js"></script>
</body>
</html>
```

---

## 11. Crear app.py

```python
from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, template_folder='templates', static_folder='.', static_url_path='')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
```

---

## 12. Instalar Flask

```bash
pip install flask
```

---

## 13. Crear entorno virtual

```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
```

---

## 14. Crear .gitignore

```
node_modules/
venv/
__pycache__/
*.pyc
.env
.DS_Store
static/css/output.css
```

---

## 15. Inicializar git

```bash
git init
git add .
git commit -m "Initial commit: Esfera de Lenguajes 3D"
git remote add origin https://github.com/alexis-rejas/TWD_T07.git
git branch -M main
git push -u origin main
```

---

## Resumen: Comandos en orden (Windows)

```bash
# 1. Inicializar Node
npm init -y

# 2. Instalar dependencias
npm install -D tailwindcss postcss autoprefixer
npm install three

# 3. Crear configuración Tailwind
npx tailwindcss init -p

# 4. Crear carpetas
mkdir -p static/css static/js templates

# 5. Compilar CSS inicial
npx tailwindcss -i ./static/css/input.css -o ./static/css/output.css

# 6. Instalar Python dependencies
pip install flask

# 7. Crear entorno virtual
python -m venv venv
venv\Scripts\activate

# 8. Compilar Tailwind (producción)
npm run build

# 9. Ejecutar Flask
python app.py
```

---

## Modo desarrollo (Tailwind con watch)

```bash
npm run dev
```

En otra terminal:
```bash
python app.py
```

---

## Archivos generados automáticamente

- `package.json` - Dependencias Node
- `package-lock.json` - Lock file npm
- `tailwind.config.js` - Configuración Tailwind
- `postcss.config.js` - Configuración PostCSS
- `static/css/output.css` - CSS compilado (generado)
- `node_modules/` - Carpeta de dependencias
- `venv/` - Entorno virtual Python
