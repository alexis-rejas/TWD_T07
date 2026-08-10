import * as THREE from 'three';

const LANGUAGES = [
    "JavaScript", "Python", "Java", "C", "C++", "C#", "TypeScript", "PHP", "Ruby", "Swift",
    "Kotlin", "Go", "Rust", "Dart", "Scala", "Perl", "Haskell", "Lua", "R", "MATLAB",
    "Julia", "Elixir", "Erlang", "Clojure", "F#", "Objective-C", "Assembly", "COBOL", "Fortran", "Ada",
    "Groovy", "Shell", "PowerShell", "SQL", "HTML", "CSS", "Visual Basic", "Delphi", "Pascal", "Scheme",
    "Prolog", "Racket", "OCaml", "Crystal", "Nim", "Zig", "Solidity", "VHDL", "Verilog", "Smalltalk"
];

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 9;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Grupo que contiene todo (esfera + etiquetas) para rotarlo en conjunto
const group = new THREE.Group();
scene.add(group);

// Esfera semi-transparente de referencia (wireframe sutil)
const wireGeo = new THREE.SphereGeometry(4, 24, 16);
const wireMat = new THREE.MeshBasicMaterial({
    color: 0x1a3a4a,
    wireframe: true,
    transparent: true,
    opacity: 0.25
});
const wireSphere = new THREE.Mesh(wireGeo, wireMat);
group.add(wireSphere);

// Núcleo sólido tenue en el centro
const coreGeo = new THREE.SphereGeometry(3.85, 32, 32);
const coreMat = new THREE.MeshBasicMaterial({
    color: 0x040c14,
    transparent: true,
    opacity: 0.6
});
group.add(new THREE.Mesh(coreGeo, coreMat));

// Función para crear textura de texto (sprite) para cada lenguaje
function createLabel(text, highlighted) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const fontSize = 46;
    
    ctx.font = `bold ${fontSize}px Segoe UI, Arial`;
    const padding = 20;
    const textWidth = ctx.measureText(text).width;
    
    canvas.width = textWidth + padding * 2;
    canvas.height = fontSize + padding * 2;
    
    ctx.font = `bold ${fontSize}px Segoe UI, Arial`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    
    if (highlighted) {
        ctx.shadowColor = '#00eaff';
        ctx.shadowBlur = 25;
        ctx.fillStyle = '#00eaff';
    } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(150,170,190,0.55)';
    }
    
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return { texture, aspect: canvas.width / canvas.height };
}

// Distribución tipo Fibonacci sphere para colocar las etiquetas de forma pareja
function fibonacciSphere(samples) {
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < samples; i++) {
        const y = 1 - (i / (samples - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        
        points.push(new THREE.Vector3(x, y, z));
    }
    
    return points;
}

const RADIUS = 4;
const positions = fibonacciSphere(LANGUAGES.length);
const sprites = [];

LANGUAGES.forEach((lang, i) => {
    const dir = positions[i];
    const { texture, aspect } = createLabel(lang, false);
    
    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false
    });
    
    const sprite = new THREE.Sprite(material);
    const scale = 0.85;
    sprite.scale.set(scale * aspect, scale, 1);
    sprite.position.copy(dir).multiplyScalar(RADIUS);
    sprite.userData = { lang, dir: dir.clone(), highlighted: false };
    
    group.add(sprite);
    sprites.push(sprite);
});

// Iluminación
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const cameraDir = new THREE.Vector3(0, 0, 1);
const worldPos = new THREE.Vector3();
const worldDir = new THREE.Vector3();

// Variables para interactividad con el mouse - Drag and drop
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let velocity = { x: 0, y: 0 };
let autoRotate = true;

document.addEventListener('mousedown', (e) => {
    isDragging = true;
    autoRotate = false;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        
        // Girar la esfera basado en el movimiento del mouse
        group.rotation.y += deltaX * 0.01;
        group.rotation.x += deltaY * 0.01;
        
        // Guardar velocidad para continuar girando después
        velocity.x = deltaY * 0.01;
        velocity.y = deltaX * 0.01;
        
        previousMousePosition = { x: e.clientX, y: e.clientY };
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

function animate() {
    requestAnimationFrame(animate);
    
    if (!isDragging) {
        // Si no estamos arrastrando, aplicar velocidad con fricción
        group.rotation.x += velocity.x;
        group.rotation.y += velocity.y;
        
        // Fricción: reducir velocidad gradualmente
        velocity.x *= 0.95;
        velocity.y *= 0.95;
        
        // Si la velocidad es muy pequeña, detener
        if (Math.abs(velocity.x) < 0.0001 && Math.abs(velocity.y) < 0.0001) {
            autoRotate = true;
        }
        
        // Si no hay movimiento y autoRotate está activo, rotar automáticamente
        if (autoRotate && Math.abs(velocity.x) < 0.0001) {
            group.rotation.y += 0.002;
            group.rotation.x += 0.0005;
        }
    }
    
    group.updateMatrixWorld();
    
    // Detectar qué etiquetas están "de frente" a la cámara (más cerca del observador)
    sprites.forEach(sprite => {
        worldDir.copy(sprite.userData.dir).transformDirection(group.matrixWorld);
        const facing = worldDir.dot(cameraDir);
        const shouldHighlight = facing > 0.82; // umbral: mirando casi de frente
        
        if (shouldHighlight !== sprite.userData.highlighted) {
            sprite.userData.highlighted = shouldHighlight;
            const { texture, aspect } = createLabel(sprite.userData.lang, shouldHighlight);
            sprite.material.map.dispose();
            sprite.material.map = texture;
            const scale = shouldHighlight ? 1.15 : 0.85;
            sprite.scale.set(scale * aspect, scale, 1);
        }
    });
    
    renderer.render(scene, camera);
}

animate();