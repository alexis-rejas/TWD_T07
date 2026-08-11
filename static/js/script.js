// Importar Three.js para gráficos 3D
import * as THREE from 'three';

// Array de 50 lenguajes de programación
const LANGUAGES = ["JavaScript","Python","Java","C","C++","C#","TypeScript","PHP","Ruby","Swift","Kotlin","Go","Rust","Dart","Scala","Perl","Haskell","Lua","R","MATLAB","Julia","Elixir","Erlang","Clojure","F#","Objective-C","Assembly","COBOL","Fortran","Ada","Groovy","Shell","PowerShell","SQL","HTML","CSS","Visual Basic","Delphi","Pascal","Scheme","Prolog","Racket","OCaml","Crystal","Nim","Zig","Solidity","VHDL","Verilog","Smalltalk"];

// Crear escena 3D con fondo negro
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Configurar cámara perspectiva con ratio 60°
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 9;

// Configurar renderizador WebGL
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Grupo para contener toda la esfera (facilita rotación conjunta)
const group = new THREE.Group();
scene.add(group);

// Esfera wireframe (marco visible) con opacidad 25%
// Esfera núcleo sólido con opacidad 60% (fondo)
group.add(new THREE.Mesh(new THREE.SphereGeometry(4, 24, 16), new THREE.MeshBasicMaterial({ color: 0x1a3a4a, wireframe: true, transparent: true, opacity: 0.25 })));
group.add(new THREE.Mesh(new THREE.SphereGeometry(3.85, 32, 32), new THREE.MeshBasicMaterial({ color: 0x040c14, transparent: true, opacity: 0.6 })));

// Función: Crear textura de texto en canvas para cada lenguaje
// highlighted: verdadero = cyan, falso = gris claro
function createLabel(text, highlighted) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const fontSize = 46;
    
    ctx.font = `bold ${fontSize}px Arial`;
    const textWidth = ctx.measureText(text).width;
    canvas.width = textWidth + 40;
    canvas.height = fontSize + 40;
    
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    // Color cyan si está resaltado, gris claro si no
    ctx.fillStyle = highlighted ? '#00eaff' : 'rgba(150,170,190,0.55)';
    if (highlighted) ctx.shadowColor = '#00eaff', ctx.shadowBlur = 25;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    return { texture: new THREE.CanvasTexture(canvas), aspect: canvas.width / canvas.height };
}

// Función: Distribución de puntos tipo Fibonacci sphere (uniforme en la esfera)
function fibonacciSphere(samples) {
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Ángulo de oro
    for (let i = 0; i < samples; i++) {
        const y = 1 - (i / (samples - 1)) * 2; // Altura
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i; // Ángulo azimut
        points.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius));
    }
    return points;
}

// Radio de la esfera donde se distribuyen los lenguajes
const RADIUS = 4;
const positions = fibonacciSphere(LANGUAGES.length);
const sprites = [];

// Crear sprite (2D con imagen) para cada lenguaje
LANGUAGES.forEach((lang, i) => {
    const dir = positions[i];
    const { texture, aspect } = createLabel(lang, false);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
    sprite.scale.set(0.85 * aspect, 0.85, 1);
    sprite.position.copy(dir).multiplyScalar(RADIUS); // Posicionar en la esfera
    sprite.userData = { lang, dir: dir.clone(), highlighted: false };
    group.add(sprite);
    sprites.push(sprite);
});

// Iluminación ambiente para mejor visualización
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

// Variables de interactividad: drag, velocidad, rotación automática
let isDragging = false, previousMousePosition = { x: 0, y: 0 }, velocity = { x: 0, y: 0 }, autoRotate = true;

// Evento: Click del mouse inicia arrastre
document.addEventListener('mousedown', (e) => {
    isDragging = true;
    autoRotate = false;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

// Evento: Movimiento del mouse rota la esfera y calcula velocidad
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        group.rotation.y += deltaX * 0.01;
        group.rotation.x += deltaY * 0.01;
        velocity = { x: deltaY * 0.01, y: deltaX * 0.01 }; // Guardar para inercia
        previousMousePosition = { x: e.clientX, y: e.clientY };
    }
});

// Evento: Soltar el mouse detiene el arrastre
document.addEventListener('mouseup', () => { isDragging = false; });

// Evento: Redimensionar ventana actualiza cámara y renderizador
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Dirección de la cámara (hacia adelante en Z)
const cameraDir = new THREE.Vector3(0, 0, 1);
const worldDir = new THREE.Vector3();

// Función de animación: Loop principal
function animate() {
    requestAnimationFrame(animate);
    
    // Si NO estamos arrastrando: aplicar inercia y fricción
    if (!isDragging) {
        group.rotation.x += velocity.x;
        group.rotation.y += velocity.y;
        velocity.x *= 0.95; // Fricción: reducir velocidad 5% cada frame
        velocity.y *= 0.95;
        
        // Si velocidad es muy baja, reactivar rotación automática
        if (Math.abs(velocity.x) < 0.0001 && Math.abs(velocity.y) < 0.0001) autoRotate = true;
        // Rotación automática lenta
        if (autoRotate) {
            group.rotation.y += 0.002;
            group.rotation.x += 0.0005;
        }
    }
    
    group.updateMatrixWorld();
    
    // Actualizar color de cada lenguaje según visibilidad
    sprites.forEach(sprite => {
        worldDir.copy(sprite.userData.dir).transformDirection(group.matrixWorld);
        const shouldHighlight = worldDir.dot(cameraDir) > 0.82; // Threshold de visibilidad
        
        if (shouldHighlight !== sprite.userData.highlighted) {
            sprite.userData.highlighted = shouldHighlight;
            const { texture, aspect } = createLabel(sprite.userData.lang, shouldHighlight);
            sprite.material.map.dispose();
            sprite.material.map = texture;
            const scale = shouldHighlight ? 1.15 : 0.85; // Ampliar si está visible
            sprite.scale.set(scale * aspect, scale, 1);
        }
    });
    
    // Renderizar la escena
    renderer.render(scene, camera);
}

// Iniciar la animación
animate();
