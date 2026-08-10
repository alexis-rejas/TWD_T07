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

## Instalación y Ejecución

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/alexis-rejas/TWD_T07.git
cd TWD_T07
```

### Paso 2: Instalar dependencias Node
```bash
npm install
```

### Paso 3: Crear entorno virtual Python
```bash
python -m venv venv
```

**En Windows:**
```bash
venv\Scripts\activate
```

**En macOS/Linux:**
```bash
source venv/bin/activate
```

### Paso 4: Instalar Flask
```bash
pip install flask
```

### Paso 5: Compilar Tailwind CSS (opcional, ya está compilado)
```bash
npm run build
```

### Paso 6: Ejecutar la aplicación
```bash
python app.py
```

Accede a: **`http://localhost:8000`**

### Resumen (copiar y pegar)

**Windows:**
```bash
git clone https://github.com/alexis-rejas/TWD_T07.git
cd TWD_T07
npm install
python -m venv venv
venv\Scripts\activate
pip install flask
python app.py
```

**macOS/Linux:**
```bash
git clone https://github.com/alexis-rejas/TWD_T07.git
cd TWD_T07
npm install
python -m venv venv
source venv/bin/activate
pip install flask
python app.py
```

## Estructura

```
├── app.py                 # Servidor Flask
├── templates/index.html   # Página principal
├── static/
│   ├── css/              # Estilos (Tailwind)
│   └── js/script.js      # Lógica 3D (Three.js)
├── package.json          # Dependencias npm
└── tailwind.config.js    # Config Tailwind
```

## Interacción

- **Autorotación**: La esfera gira automáticamente
- **Drag**: Arrastra con el mouse para controlar la esfera
- **Momentum**: Suelta para que continúe girando con inercia
- **Fricción**: La velocidad disminuye gradualmente
