# Esfera de Lenguajes de Programación

Visualización 3D interactiva de 50 lenguajes de programación distribuidos en una esfera que gira continuamente.

## Características

- **Esfera 3D**: Renderizado con Three.js
- **50 Lenguajes**: Distribuidos uniformemente usando algoritmo de Fibonacci
- **Interactivo**: Controla la esfera con drag del mouse
- **Momentum**: La esfera continúa girando después de soltar el mouse
- **Highlighting**: Los lenguajes se resaltan en cyan cuando miran hacia la cámara
- **Estilo Dark Mode**: Interfaz minimalista con fondo negro

## Tecnologías

- **Frontend**: HTML5, CSS (Tailwind), JavaScript (ES6 Modules)
- **3D Graphics**: Three.js r128
- **Styling**: Tailwind CSS
- **Server**: Flask (Python)

## Instalación Completa (Paso a Paso)

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/alexis-rejas/TWD_T07.git
cd TWD_T07
```

### Paso 2: Crear entorno virtual Python
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Paso 3: Instalar Flask
```bash
pip install flask
```

### Paso 4: Instalar dependencias de Node (npm)

#### Opción A: Si npm ya está instalado
```bash
npm install
```

#### Opción B: Si necesitas instalar Node.js primero
- Descarga desde: https://nodejs.org/ (versión LTS recomendada)
- Instala
- Verifica: `node --version` y `npm --version`
- Luego ejecuta: `npm install`

### Paso 5: Instalar Tailwind CSS y dependencias

Ya están en `package.json`, pero si necesitas hacerlo manualmente:

```bash
npm install -D tailwindcss postcss autoprefixer
```

Esto instala:
- `tailwindcss` - Framework CSS
- `postcss` - Procesador de CSS
- `autoprefixer` - Añade prefijos automáticos

### Paso 6: Instalar Three.js

```bash
npm install three
```

### Paso 7: Compilar Tailwind CSS

#### Compilación única (build)
```bash
npm run build
```

Esto crea `static/css/output.css` a partir de `static/css/input.css`

#### Compilación en tiempo real (watch mode - desarrollo)
```bash
npm run dev
```

Monitorea cambios en `input.css` y recompila automáticamente

### Paso 8: Ejecutar la aplicación

```bash
python app.py
```

Accede a: **`http://localhost:8000`**

---

## 📋 Comandos Rápidos por Sistema

### **Windows (Instalación completa)**
```bash
git clone https://github.com/alexis-rejas/TWD_T07.git
cd TWD_T07
python -m venv venv
venv\Scripts\activate
pip install flask
npm install
npm run build
python app.py
```

### **macOS/Linux (Instalación completa)**
```bash
git clone https://github.com/alexis-rejas/TWD_T07.git
cd TWD_T07
python3 -m venv venv
source venv/bin/activate
pip install flask
npm install
npm run build
python app.py
```

---

## 📦 Scripts Disponibles (package.json)

```json
{
  "scripts": {
    "dev": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css --watch",
    "build": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css",
    "start": "python -m http.server 8000 --directory ."
  }
}
```

### Uso de scripts:

- **`npm run dev`** - Modo desarrollo (compila y observa cambios)
- **`npm run build`** - Compila una sola vez
- **`npm start`** - Servidor HTTP simple (opcional, usamos Flask)

---

## 🎨 Tailwind CSS Workflow

### Archivos CSS

- **`static/css/input.css`** - Archivo fuente (contiene directivas Tailwind)
- **`static/css/output.css`** - Archivo compilado (generado automáticamente)

### Flujo de compilación

1. Editas `input.css` con directivas Tailwind:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. Ejecutas `npm run dev` o `npm run build`

3. Tailwind procesa y genera `output.css` con todos los estilos necesarios

4. En `templates/index.html` se enlaza el output:
   ```html
   <link rel="stylesheet" href="static/css/output.css">
   ```

---

## 📂 Estructura Final

```
TWD_T07/
├── app.py                     # Servidor Flask
├── package.json              # Dependencias Node
├── package-lock.json         # Lock file npm
├── tailwind.config.js        # Config de Tailwind
├── postcss.config.js         # Config de PostCSS
├── .gitignore               # Archivos ignorados en git
├── README.md                # Este archivo
├── templates/
│   └── index.html           # Página principal
├── static/
│   ├── js/
│   │   └── script.js        # Lógica Three.js
│   └── css/
│       ├── input.css        # Fuente Tailwind
│       └── output.css       # Output compilado
├── node_modules/            # Dependencias npm (gitignored)
└── venv/                    # Entorno Python (gitignored)
```

---

## 🚀 Solución de Problemas

### Tailwind no compila
```bash
npm install -D tailwindcss postcss autoprefixer
npm run build
```

### Three.js no se carga
```bash
npm install three
```

### Flask no inicia
```bash
pip install flask
python app.py
```

### Puerto 8000 en uso
```bash
python app.py --port 8001
```

### Necesito limpiar todo
```bash
rm -r node_modules
rm package-lock.json
npm install
npm run build
```
