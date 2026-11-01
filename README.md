# La Guardiana Lorena · La leyenda de los anacardos

Videojuego web de cumpleaños (HTML5 + CSS3 + JavaScript nativo). Sin dependencias, sin servidor, sin compilación.

## Archivos
- `index.html` · estructura
- `styles.css` · diseño
- `config.js` · **TODO lo editable**: acertijos, ayudas, escondites, soluciones (campo `escondite` y `palabras`), mensajes, recompensas, objetos, habilidades, aliados, tienda, logros, diálogos del narrador y `mensajePersonal` final
- `script.js` · lógica del juego (no hace falta tocarlo)

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
- Revisa los escondites reales y ajusta las pistas si no coinciden con tu casa. Los campos `escondite` y `palabras` solo son apuntes tuyos; nunca se muestran. `palabras` hace que el narrador reconozca intentos en el chat sin confirmar nada.
- Prueba la partida en tu móvil y reinícala (⚙ → Reiniciar partida, doble confirmación) antes de entregarla.
- Secreto de Rhaegal: pulsar 5 veces la huella 🐾 al final de la pantalla de Inicio. Si Lorena pregunta por Rhaegal en el chat, el narrador le da la pista.

## Notas
- Sonido: música y efectos generados por código (sin archivos). Empieza tras el primer toque en pantalla. Hay silencio y volumen en ⚙.
- Para Rhaegal y Lorena no se inventan rasgos físicos: el personaje es una silueta estilizada.
- La partida se guarda por navegador y dispositivo.
