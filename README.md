# La Guardiana Lorena · La leyenda de los anacardos

Videojuego web de cumpleaños (HTML5 + CSS3 + JavaScript nativo). Sin dependencias, sin servidor, sin compilación.

## Archivos
- `index.html` · estructura
- `styles.css` · diseño
- `config.js` · **TODO lo editable**: acertijos, ayudas, escondites reales, soluciones (campo `escondite` y `palabras`), mensajes, recompensas, objetos, habilidades, aliados, tienda con vales y atuendos, logros, diálogos del narrador y `mensajePersonal` final
- `script.js` · lógica del juego, render del avatar interactivo, desbloqueos y audio

## Probarlo en local
Abre `index.html` con el navegador. El progreso se guarda en `localStorage`.

## Publicar en GitHub Pages
1. Crea un repositorio nuevo en GitHub (por ejemplo `guardiana-lorena`).
2. Sube los 4 archivos (`index.html`, `styles.css`, `script.js`, `config.js`) a la raíz.
3. En **Settings → Pages**, elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. En un minuto estará en `https://TU-USUARIO.github.io/guardiana-lorena/`.

Todas las rutas son relativas, así que funciona bajo una ruta de proyecto.

## Antes de dárselo
- Escribe tu mensaje en `mensajePersonal` (config.js). Si queda vacío, no se muestra.
- Revisa los escondites reales ya configurados en `config.js`:
  * Misión 1 (Pantalón negro vaquero): armario donde está su ropa doblada
  * Misión 2 (Kit nevera y tuppers): armario de cocina encima de la nevera
  * Misión 3 - Parte 1 (Mini Groot): junto a la planta
  * Misión 3 - Parte 2 (Groot grande): mueble del salón junto a la tele
  * Misión 4 (Árbol de navidad): armario de la galería donde está la escoba
  * Misión 5 (Camiseta de fútbol del Elche): arcón del brazo del sofá
- Prueba la partida en tu móvil y reinícala (⚙ → Reiniciar partida, doble confirmación) antes de entregarla.
- Rhaegal ahora se desbloquea de forma inmediata y clara: tocando la huella en el Inicio o pulsando directamente el botón dedicado en la pantalla de **Aliados**.

## Notas
- Sonido: música y efectos generados por código (sin archivos). Empieza tras el primer toque en pantalla. Hay silencio y volumen en ⚙.
- Para Rhaegal y Lorena no se inventan rasgos físicos: el personaje es una silueta estilizada.
- La partida se guarda por navegador y dispositivo.
