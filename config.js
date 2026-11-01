/* ============================================================
   CONFIGURACIÓN DEL JUEGO · La Guardiana Lorena
   Aquí puedes editar TODO: acertijos, ayudas, escondites,
   soluciones, mensajes, recompensas, objetos, habilidades,
   aliados y el mensaje personal final.
   ============================================================ */
const CONFIG = {
  jugadora: "Lorena",
  motes: ["Lore", "Chiqui"],

  /* ---------- MENSAJE PERSONAL FINAL (edítalo tú) ---------- */
  mensajePersonal: "",   // Ej: "Lore, gracias por ...". Si lo dejas vacío no se muestra.

  /* ---------- RECOMPENSAS ---------- */
  xpPorNivel: 150,
  ayudaTempranaSegundos: 90,
  recompensas: {
    mision: { xp: 100, anac: 100, pts: 100 },
    objeto: { xp: 50, pts: 50 },
    sinAyuda: { xp: 50, anac: 50 },
    prueba: { xp: 25, anac: 75, pts: 75 },
    secreto: { xp: 75, pts: 75 },
    logro: { pts: 100 },
    final: { anac: 200 }
  },
  titulos: ["Novata del Tesoro", "Aprendiz de Aventuras", "Exploradora", "Cazatesoros", "Guardiana en Prácticas", "Heroína de la Casa", "Guardiana Legendaria", "Leyenda de los Anacardos"],

  regalos: ["pantalon", "kit", "groot1", "groot2", "arbol", "camiseta"],

  /* ---------- INTRODUCCIÓN ---------- */
  intro: [
    { ico: "⚠️", t: "ALERTA", x: "Se ha detectado una anomalía en el universo del 27 cumpleaños de la Chiqui." },
    { ico: "🗝️", t: "OBJETOS LEGENDARIOS", x: "Seis objetos legendarios han sido distribuidos por diferentes zonas de la casa. Su localización ha sido protegida mediante desafíos, acertijos y pistas sutiles." },
    { ico: "🎯", t: "LA ELEGIDA", x: "Solo una persona puede recuperarlos todos. La elegida ha sido seleccionada por sus habilidades, su carisma y, sobre todo, por su paciencia." },
    { ico: "🐾", t: "SUPERVISIÓN OFICIAL", x: "Rhaegal ha sido nombrado supervisor oficial de la operación. Se le ha solicitado colaboración al departamento felino. Rhaegal ha escuchado la petición, ha parpadeado lentamente y ha decidido seguir durmiendo." },
    { ico: "🏠", t: "TERRITORIO CONOCIDO", x: "El sistema ha registrado un dato relevante: lleváis seis meses viviendo juntas en este templo. La misión se desarrolla en terreno familiar. ¡A explorar!" },
    { ico: "✨", t: "BIENVENIDA, LORENA", x: "Tu aventura comienza ahora." }
  ],

  /* ---------- OBJETOS, EQUIPO Y ALIADOS ----------
     cat: equipamiento | arma | armadura | consumible | aliado | especial
     rareza: comun | especial | epico | legendario            */
  objetos: [
    {
      id: "pantalon", nombre: "Pantalón Vaquero Negro del Movimiento Libre", cat: "equipamiento", tipo: "Equipamiento", rareza: "legendario", icono: "👖", color: "#4c6fd6", slot: "piernas",
      desc: "Mejora la movilidad del personaje, desbloquea una habilidad de exploración y aporta puntos de estilo.",
      stats: { movilidad: 25, estilo: 15, exploracion: 10 },
      hab: { id: "zancada", nombre: "Zancada libre", tipo: "activa", desc: "Habilidad de exploración. Una vez por misión: encuentras 10 ANACARDOS caídos por el suelo." },
      broma: "Equipamiento adquirido. Vaquero negro legendario. El sistema ha realizado un análisis de medidas: las piernas del personaje siguen siendo las mismas, pero el estilo sube al infinito."
    },
    {
      id: "kit", nombre: "Kit Legendario de Supervivencia Culinaria", cat: "especial", tipo: "Objeto especial", rareza: "legendario", icono: "🧊", color: "#34b8c9",
      desc: "Equipamiento diseñado para sobrevivir a largas jornadas laborales y alimentar a una protagonista con sus tuppers bien protegidos.",
      stats: { resistencia: 25 },
      hab: { id: "macarrones", nombre: "Macarrones de emergencia", tipo: "activa", desc: "Recupera energía de forma extraordinaria, aunque el personaje no garantiza variar de menú." },
      broma: "Nevera portátil y tuppers asegurados. Aumenta la resistencia y permite transportar provisiones frescas a cualquier rincón del mapa."
    },
    {
      id: "groot1", nombre: "Groot Junior · Compañero de exploración", cat: "aliado", tipo: "Aliado", rareza: "epico", icono: "🌱", color: "#3fae6a",
      desc: "No habla mucho, pero siempre está ahí. Un compañero fiel que adora la fotosíntesis y el agua fresca.",
      stats: { exploracion: 20, moral: 5 },
      hab: { id: "junior", nombre: "Bonificación de exploración", tipo: "pasiva", desc: "Mientras esté en tu equipo, cada misión completada te da 10 ANACARDOS extra." },
      anacExtra: 50, msgFisico: "Yo soy Groot.\n\nY no, no me he equivocado de maceta.",
      broma: "Groot Junior se une al equipo. Vocabulario: tres palabras. Lealtad: ilimitada."
    },
    {
      id: "groot2", nombre: "Groot Guardián · Defensor del Salón", cat: "aliado", tipo: "Aliado y defensor", rareza: "legendario", icono: "🌳", color: "#2f8f55",
      desc: "Cuando la situación se complica, Groot Guardián custodia el territorio desde las alturas audiovisuales. Su presencia impone respeto.",
      stats: { defensa: 25 },
      hab: { id: "muro", nombre: "Muro de raíces", tipo: "activa", desc: "Habilidad de protección. Una vez por misión: te protege y recuperas toda la energía (+10 puntos)." },
      anacExtra: 50, msgFisico: "Yo soy Groot.\n\n(Traducción: «Custodiando la tele y la paz del salón».)",
      broma: "Groot Guardián se une al equipo. Defensa del grupo: notablemente mejorada. Control del mando: indiscutible."
    },
    {
      id: "arbol", nombre: "El Heraldo Verde de la Ilusión", cat: "arma", tipo: "Arma legendaria", rareza: "legendario", icono: "🎄", color: "#e0504f", slot: "arma",
      desc: "Un artefacto majestuoso repleto de magia. Quien lo posee es capaz de traer la mayor época de celebración del año en cualquier estación.",
      stats: { poder: 35, moral: 10 },
      hab: { id: "espiritu", nombre: "Espíritu Festivo Devastador", tipo: "activa", desc: "Derrota a la pereza con una explosión de luces y alegría. Una vez por misión." },
      broma: "Artefacto equipado. Luces: preparadas. Ilusión: desbordante. Nadie podrá frenar el despliegue cuando llegue su momento."
    },
    {
      id: "camiseta", nombre: "Armadura Verdiblanca del Elche", cat: "armadura", tipo: "Armadura especial", rareza: "epico", icono: "👕", color: "#1f9d55", slot: "cuerpo",
      desc: "Mejora la defensa, aumenta la moral del personaje y desbloquea la pasión futbolera más auténtica.",
      stats: { defensa: 15, moral: 25 },
      hab: { id: "var", nombre: "Justicia del VAR", tipo: "activa", desc: "Revisa la jugada: una vez por misión, si has pedido ayudas, el VAR las anula y recuperas la opción del bonus «sin ayudas»." },
      broma: "El sistema recuerda a la protagonista que ser árbitra y aficionada del Elche al mismo tiempo roza el límite del reglamento... pero la armadura queda de diez."
    },
    {
      id: "rhaegal", nombre: "Rhaegal · Guardián Legendario de la Casa", cat: "aliado", tipo: "Compañero especial", rareza: "legendario", icono: "🐾", color: "#e8b64c",
      desc: "Misterioso, dormilón, pero el auténtico jefe de la casa. Conoce cada rincón y ronronea cuando una misión llega a buen puerto.",
      stats: { defensa: 20, moral: 10, exploracion: 10 },
      hab: { id: "mirada", nombre: "Mirada del dragón", tipo: "activa", desc: "Detecta secretos y oportunidades ocultas: una vez por misión encuentras 25 ANACARDOS que nadie vigilaba." },
      broma: "Rhaegal ha bostezado, se ha estirado y ha decidido que eres digna de su compañía. ¡El dragón felino se une al equipo!"
    },
    {
      id: "accesorio", nombre: "Pulsera de la Guardiana", cat: "equipamiento", tipo: "Accesorio", rareza: "especial", icono: "📿", color: "#b58cff", slot: "accesorio",
      desc: "Un accesorio especial adquirido con ANACARDOS. Brilla lo justo para lucir en cualquier expedición.", stats: { estilo: 10, moral: 10 },
      broma: "Accesorio equipado. +10 de estilo garantizado."
    },
    {
      id: "aura", nombre: "Aura Dorada de Heroína", cat: "especial", tipo: "Mejora cosmética", rareza: "especial", icono: "✨", color: "#ffd86b", slot: "cosmetico",
      desc: "Un resplandor dorado alrededor del personaje. No sirve para nada, pero queda espectacular.", stats: { estilo: 10 },
      broma: "Cosmético aplicado. Eficacia: cero. Elegancia y brillo: nivel leyenda."
    },
    {
      id: "capa", nombre: "Capa de Gala Épica", cat: "especial", tipo: "Atuendo especial", rareza: "epico", icono: "🦸‍♀️", color: "#e056fd", slot: "capa",
      desc: "Una elegante capa ondeante de superheroína para el avatar de Lorena.", stats: { estilo: 20, moral: 15 },
      broma: "¡Capa equipada! Lorena adquiere porte de superheroína de leyenda."
    },
    {
      id: "corona", nombre: "Corona de Cumpleaños Real", cat: "especial", tipo: "Atuendo especial", rareza: "legendario", icono: "👑", color: "#f9ca24", slot: "cabeza",
      desc: "Una corona dorada brillante digna de quien cumple 27 primaveras con tanto estilo.", stats: { estilo: 25, poder: 15 },
      broma: "La reina de la casa ha sido coronada oficialmente por el sistema."
    },
    {
      id: "gafas", nombre: "Gafas de Sol de Árbitra VIP", cat: "especial", tipo: "Atuendo especial", rareza: "especial", icono: "🕶️", color: "#222f3e", slot: "ojos",
      desc: "Para revisar el VAR con total serenidad y mantener el flow en el terreno de juego.", stats: { estilo: 15, defensa: 10 },
      broma: "Gafas oscuras puestas: ni las faltas dudosas ni el sol deslumbran a la jefa."
    }
  ],

  /* ---------- TIENDA (opcional, nunca bloquea la aventura) ----------
     tipo: consumible | objeto | evento | vale                       */
  tienda: [
    { id: "pista", nombre: "Pista adicional real", precio: 50, icono: "💡", tipo: "consumible", desc: "Una pista extra y muy concreta para la misión que tengas activa en este momento." },
    { id: "capa", nombre: "Atuendo: Capa de Gala Épica", precio: 130, icono: "🦸‍♀️", tipo: "objeto", desc: "Viste a tu avatar con una capa ondeante de auténtica heroína." },
    { id: "corona", nombre: "Atuendo: Corona de Cumpleaños 27", precio: 160, icono: "👑", tipo: "objeto", desc: "Corona dorada para la protagonista en su día especial." },
    { id: "gafas", nombre: "Atuendo: Gafas de Árbitra VIP", precio: 90, icono: "🕶️", tipo: "objeto", desc: "Gafas de sol para imponer respeto en el terreno de juego." },
    { id: "aura", nombre: "Aura Dorada de Heroína", precio: 120, icono: "✨", tipo: "objeto", desc: "Mejora cosmética: tu personaje brilla con destellos dorados." },
    { id: "accesorio", nombre: "Pulsera de la Guardiana", precio: 80, icono: "📿", tipo: "objeto", desc: "Accesorio exclusivo: +10 de estilo y +10 de moral." },
    { id: "v_abrazo", nombre: "Vale: Derecho a un abrazo exprés", precio: 60, icono: "🫂", tipo: "vale", canje: "VALE CANJEADO: tienes derecho a exigir un abrazo con achuchón inmediato. De obligado cumplimiento sin rechistar." },
    { id: "v_cena", nombre: "Vale: Elegir la cena sin objeciones", precio: 90, icono: "🍽️", tipo: "vale", canje: "VALE CANJEADO: hoy eliges tú qué se cena y dónde. Se acepta comida favorita por decreto ley." },
    { id: "v_fregar", nombre: "Vale: Exención total de fregar hoy", precio: 100, icono: "🧽", tipo: "vale", canje: "VALE CANJEADO: quedas eximida de la cocina y los platos. La otra parte asume el servicio." },
    { id: "v_mimos", nombre: "Vale: Sesión de mimos o masaje", precio: 110, icono: "💆‍♀️", tipo: "vale", canje: "VALE CANJEADO: vale oficial por 15 minutos de masaje de hombros, pies o mimos a demanda." },
    { id: "v_mando", nombre: "Vale: Control absoluto del mando", precio: 80, icono: "📺", tipo: "vale", canje: "VALE CANJEADO: hoy decides tú la serie, peli o vídeo de YouTube. Prohibido protestar." },
    { id: "v_cita", nombre: "Vale: Una cita elegida por la jefa", precio: 150, icono: "🎟️", tipo: "vale", canje: "VALE CANJEADO: una cita diseñada a tu gusto: plan, lugar y horario que tú mandes." },
    { id: "v_desayuno", nombre: "Vale: Desayuno preparado en la cama", precio: 120, icono: "☕", tipo: "vale", canje: "VALE CANJEADO: el desayuno te lo sirven en bandeja sin que tengas que poner un pie fuera de la cama." },
    { id: "v_razon", nombre: "Vale: Tener la razón en una discusión", precio: 180, icono: "⚖️", tipo: "vale", canje: "VALE CANJEADO: tarjeta de victoria instantánea. En una discrepancia, la presentas y ganas automáticamente sin apelación." },
    { id: "v_sorpresa", nombre: "Recompensa sorpresa especial", precio: 200, icono: "🎁", tipo: "vale", canje: "VALE CANJEADO: una sorpresa inesperada de parte de la organización te aguarda en el momento menos pensado." }
  ],

  eventoNarrador: [
    "Conexión establecida. Esto es una entrevista exclusiva con la protagonista. Las preguntas no se pueden esquivar.",
    "Pregunta 1: ¿Es cierto que has comido macarrones esta semana? No respondas. El sistema ya conoce la respuesta.",
    "Pregunta 2: como árbitra, ¿habrías pitado penalti en el último partido del Elche? Responde con honestidad. Tu cara ya lo ha hecho.",
    "Pregunta 3: 27 años conseguidos y seis meses compartiendo casa. ¿Qué balance hace la heroína? Se detecta una sonrisa indiscutible.",
    "Fin de la entrevista. Se ha comprobado que la entrevistada es una heroína, una gran compañera y, sin duda, una persona difícil de ganar discutiendo. Gracias por participar."
  ],

  /* ---------- LOGROS ---------- */
  logros: [
    { id: "inicio", nombre: "Bienvenida, Lorena", desc: "Comenzar la aventura.", icono: "🚀" },
    { id: "primer", nombre: "Primer tesoro", desc: "Encontrar tu primer regalo.", icono: "🎁" },
    { id: "m0", nombre: "Una cuestión de centímetros", desc: "Completar la misión 1.", icono: "📏" },
    { id: "m1", nombre: "Supervivencia laboral", desc: "Completar la misión 2.", icono: "🍝" },
    { id: "m2", nombre: "Dos guardianes, un destino", desc: "Completar la misión 3.", icono: "🌳" },
    { id: "m3", nombre: "El secreto mejor guardado", desc: "Completar la misión 4.", icono: "🎄" },
    { id: "m4", nombre: "Juicio final del VAR", desc: "Completar la misión 5.", icono: "🟩" },
    { id: "sinayuda", nombre: "Mente brillante", desc: "Completar una misión sin pedir ayuda.", icono: "🧠" },
    { id: "paciencia", nombre: "Paciencia en descenso", desc: "Usar las tres ayudas en una misma parte.", icono: "😤" },
    { id: "anacardos", nombre: "Magnate del anacardo", desc: "Conseguir 500 ANACARDOS en total.", icono: "💰" },
    { id: "comprador", nombre: "Cliente VIP", desc: "Hacer tu primera compra en la tienda.", icono: "🛍️" },
    { id: "pruebas", nombre: "Mente de concurso", desc: "Superar 3 pruebas secundarias.", icono: "❓" },
    { id: "equipo", nombre: "Equipo legendario", desc: "Reunir a los dos Groot y a Rhaegal.", icono: "🛡️" },
    { id: "nivel5", nombre: "Heroína en ascenso", desc: "Alcanzar el nivel 5.", icono: "⭐" },
    { id: "dragon", nombre: "Compañero felino", desc: "Desbloquear a Rhaegal para el equipo.", icono: "🐾" },
    { id: "final", nombre: "27 años conseguidos", desc: "Completar toda la aventura.", icono: "💚", secreto: true }
  ],

  /* ---------- MISIONES ----------
     IMPORTANTE: "escondite" y "palabras" son SOLO para ti (apuntes).
     Nunca se muestran en pantalla. "palabras" sirve para que el
     narrador reconozca intentos en el chat sin confirmar nada.    */
  misiones: [
    {
      nombre: "Una cuestión de centímetros", icono: "📏",
      intro: "Primera prueba del sistema. El objeto que buscas forma parte del equipamiento del héroe... y tiene una relación directa con su ropa de diario.",
      celebracion: "Primer objeto recuperado. Un pantalón vaquero negro impecable. La protagonista ya puede moverse con el máximo estilo.",
      partes: [{
        regalo: "pantalon",
        escondite: "En el armario donde está su ropa doblada",
        palabras: ["armario", "ropa", "doblada", "balda", "estante", "pantalones"],
        acertijo: "En este mundo existen prendas básicas, elegantes y todoterreno, de un color oscuro que combina con absolutamente todo.\n\nSin embargo, no está colgado a la vista en una percha cualquiera. Este objeto se oculta silencioso y ordenado entre pilas de tejido.\n\nPara encontrarlo deberás abrir las puertas del lugar donde descansa tu ropa de diario... concretamente donde se dobla con esmero.\n\nEncuentra la prenda negra que te espera doblada entre las demás.",
        pistas: [
          "No mires en las perchas altas ni donde cuelgan chaquetas. Piensa en baldas y estantes.",
          "Vive en tu propio armario, compartiendo espacio con otras prendas que esperan su turno perfectamente ordenadas.",
          "Es un pantalón vaquero negro y está esperando justo en la zona del armario donde tienes tu ropa doblada."
        ],
        pistaExtra: "Ve directamente a tu armario de la ropa: revisa entre la ropa doblada, allí está tu pantalón vaquero negro esperándote."
      }],
      prueba: { q: "¿Quién ha sido nombrado supervisor oficial de la operación?", o: ["El VAR", "Rhaegal", "Groot", "El vecino de arriba"], c: 1 }
    },

    {
      nombre: "Supervivencia laboral", icono: "🍝",
      intro: "Segunda prueba. El departamento de intendencia ha preparado el kit definitivo para que las comidas fuera de casa sean todo un éxito.",
      celebracion: "Logística asegurada: nevera portátil y tuppers listos para conquistar cualquier jornada laboral.",
      partes: [{
        regalo: "kit",
        escondite: "En el armario de la cocina encima de la nevera",
        palabras: ["cocina", "nevera", "arriba", "frigo", "armario", "alto", "tupper"],
        acertijo: "El departamento de expediciones sabe lo importante que es conservar los alimentos a buena temperatura cuando sales a trabajar.\n\nEste tesoro está compuesto por recipientes estancos y un receptáculo térmico capaz de mantener el frío.\n\nCuriosamente, para encontrar este pack que conserva los alimentos... tendrás que buscar en la cocina, pero mirando bien hacia arriba, justo encima del electrodoméstico que más enfría de la casa.\n\nEncuentra el kit en las alturas de la cocina.",
        pistas: [
          "El tesoro sirve para llevar comida y frío... así que la cocina es el territorio obligado.",
          "No busques en los cajones de abajo ni cerca del suelo: toca mirar arriba.",
          "Abre el armario que se encuentra exactamente sobre la nevera. Lo que buscas está ahí arriba."
        ],
        pistaExtra: "Dirígete a la cocina, mira el armario situado justo encima del frigorífico/nevera y ábrelo: dentro está la nevera portátil y los tuppers."
      }],
      prueba: { q: "¿Qué plato suele ser el protagonista indiscutible del menú laboral?", o: ["Paella", "Macarrones", "Tortilla", "Ensalada"], c: 1 }
    },

    {
      nombre: "Dos guardianes, un destino", icono: "🌳",
      intro: "Tercera prueba. La naturaleza ha tomado posiciones en dos puntos estratégicos de la casa. Primero el pequeño, luego el grande.",
      celebracion: "Los dos guardianes se han unido al equipo. Entre los dos protegen tanto a las plantas como el ocio del salón.",
      partes: [
        {
          regalo: "groot1",
          escondite: "Junto a la planta",
          palabras: ["planta", "maceta", "hojas", "verde", "tierra"],
          acertijo: "Señal detectada: un compañero pequeño, de madera y gran corazón. Tres palabras componen su dialecto.\n\nAl ser una criatura vegetal, se siente atraído por sus hermanas verdes y le gusta camuflarse entre la naturaleza viva de la casa.\n\nBusca al pequeño explorador donde hay vida clorofílica.",
          pistas: [
            "Tres palabras: «Yo soy Groot». Y adora los ambientes verdes.",
            "No busques en muebles cerrados: busca donde haya tierra, macetas u hojas.",
            "Está colocado con mucho disimulo justo al lado de una planta de la casa."
          ],
          pistaExtra: "Ve directa a la planta: el Mini Groot está colocado justo junto a ella, mimetizándose con lo verde."
        },
        {
          regalo: "groot2",
          escondite: "En el mueble del salón junto a la tele",
          palabras: ["salon", "mueble", "tele", "television", "pantalla", "tv"],
          acertijo: "El pequeño ya está contigo, pero el Groot grande custodia el centro de entretenimiento de la casa.\n\nDesde su posición estratégica puede vigilar las películas, las series y los partidos que se proyectan en la pantalla.\n\nBusca al guardián mayor en el corazón del salón.",
          pistas: [
            "El hermano mayor necesita buena perspectiva y le encanta la tecnología.",
            "Se encuentra en el salón, en la zona donde se dirigen todas las miradas cuando os sentáis a descansar.",
            "Revisa el mueble principal del salón, muy cerca de la televisión."
          ],
          pistaExtra: "Mira en el mueble del salón, justo al lado de la televisión: allí está plantado el Groot grande vigilando."
        }
      ],
      prueba: { q: "¿Cuántos meses lleváis compartiendo este hogar?", o: ["3", "6", "12", "27"], c: 1 }
    },

    {
      nombre: "El secreto mejor guardado", icono: "🎄",
      intro: "Cuarta prueba. El departamento de misterios ha escondido una sorpresa de proporciones épicas que llena de ilusión cualquier época del año.",
      celebracion: "¡Un árbol de navidad para que la ilusión brille con fuerza! El tesoro más esperado ya está en tus manos.",
      partes: [{
        regalo: "arbol",
        escondite: "En el armario de la galería donde está la escoba",
        palabras: ["galeria", "armario", "escoba", "limpieza", "balcon", "lavadero"],
        acertijo: "Hay deseos que no entienden de fechas ni de calendarios. Cuando alguien sueña con iluminar su hogar con magia, cualquier momento es perfecto.\n\nEste objeto de gran envergadura ha sido resguardado en una zona utilitaria de la casa, donde el aire corre y se guardan las herramientas de limpieza cotidiana.\n\nPara llegar hasta él deberás aventurarte en la galería y abrir el armario donde descansa la fiel compañera de barrer.\n\nDescubre el secreto escondido junto a los aperos de la galería.",
        pistas: [
          "Es un paquete alargado y voluminoso que no cabría en un cajón normal.",
          "Sal hacia la zona exterior o galería de la casa, donde se guardan cosas de limpieza.",
          "Abre el armario de la galería: busca en el mismo lugar donde se apoya la escoba."
        ],
        pistaExtra: "Ve a la galería, abre el armario de la limpieza donde está la escoba: allí dentro tienes tu árbol de navidad esperando."
      }],
      prueba: { q: "¿Quién tiene la mayor ilusión festiva de toda la provincia?", o: ["Lorena", "El Grinch", "Papá Noel", "Rhaegal"], c: 0 }
    },

    {
      nombre: "El juicio final del VAR", icono: "🟩",
      intro: "Última prueba. Se precisa la máxima precisión de árbitra para encontrar la prenda que despierta tu mayor pasión futbolera.",
      celebracion: "¡Armadura verdiblanca asegurada! La camiseta del Elche ya está en tu poder. El VAR valida el gol por toda la escuadra.",
      partes: [{
        regalo: "camiseta",
        escondite: "En el arcón del brazo del sofá",
        palabras: ["sofa", "arcon", "brazo", "cojin", "asiento", "salon"],
        acertijo: "Has llegado al desafío definitivo.\n\nPara una árbitra con corazón franjiverde, vestir los colores de su equipo es el mayor honor.\n\nEl tesoro final está escondido en el lugar más cómodo del salón, donde os sentáis a relajaros y a vivir los partidos con emoción... pero en un compartimento secreto que se abre levantando un lateral.\n\nExamina los secretos que esconde el sofá de descanso.",
        pistas: [
          "El sofá no solo sirve para sentarse; algunos tienen compartimentos y secretos ocultos.",
          "No busques debajo de los cojines normales: piensa en los brazos y zonas abatibles.",
          "Abre el arcón situado en el brazo del sofá. Dentro te espera la camiseta del Elche."
        ],
        pistaExtra: "Levanta la tapa del arcón que hay en el brazo del sofá: dentro está tu camiseta del Elche."
      }],
      prueba: { q: "¿Cuál es el equipo que te hace vibrar en cada jornada?", o: ["Elche CF", "El equipo rival", "Ninguno, soy imparcial", "El Betis"], c: 0 }
    }
  ],

  /* ---------- NARRADOR ---------- */
  narradorHome: [
    "Sistema operativo. Paciencia de la jugadora: excelente.",
    "El departamento felino sigue supervisando desde el rincón más cómodo.",
    "Recuerda: una auténtica guardiana investiga con calma y disfruta de cada tesoro.",
    "Consejo del sistema: quien explora con ilusión encuentra siempre la recompensa.",
    "Se detecta una gran energía en la protagonista. ¡A por todas, Chiqui!",
    "La casa guarda secretos mágicos pensados exclusivamente para ti."
  ],
  ayudaTemprana: [
    "El sistema detecta ganas de avanzar rápido. ¿Seguro que quieres una pista tan pronto, {mote}?",
    "¿Pista en marcha? El narrador sonríe, pero te echa una mano encantado."
  ],
  ayudaNormal: [
    "El sistema registrará esta ayuda. ¿Continuamos?",
    "Pedir ayuda es de sabias cuando hay ganas de encontrar el regalo. ¿Confirmas?",
    "Se solicita una pista oficial para guiarte en el mapa. ¿La abrimos?"
  ],
  ayudaPocion: [
    "Pista directa solicitada: el sistema te echa un cable sin juicio alguno."
  ],
  rhaegalEventos: [
    "ATENCIÓN: Rhaegal ha abierto un ojo para ver qué estás buscando. El supervisor felino da su visto bueno.",
    "Se ha solicitado colaboración al departamento felino. Rhaegal ha bostezado con ternura.",
    "El sistema confirma que Rhaegal aprueba plenamente el ritmo de la expedición.",
    "Rhaegal ha venido a restregarse en tus piernas para desearte buena suerte."
  ],
  secretoRhaegal: {
    pulsaciones: 1,
    pista: "¡Rhaegal quiere unirse a tu equipo! Toca la huella 🐾 que hay abajo en el Centro de Operaciones (Inicio) o el botón en Aliados y se unirá de inmediato."
  },

  /* Chat: el primer patrón que coincida decide la respuesta.
     Para editar: cambia o añade frases. Usa {mote} y {nombre}. */
  chat: [
    {
      re: /no pienso seguir|dejo de jugar|no sigo jugando|abandono/, r: [
        "Abandonar la partida a mitad de aventura... El sistema sabe que nunca lo harías de verdad. Respira, {mote}, ¡que lo mejor está por llegar!",
        "Rhaegal te mira con cariño. Tómate un respiro cuando quieras: la partida se guarda sola."]
    },
    {
      re: /me rindo|rendirme|imposible/, r: [
        "¡De rendirse nada! Tómate un minuto, mira a tu alrededor y verás cómo lo resuelves.",
        "Rendirse no está en el ADN de esta guardiana. ¡Usa el botón de ayuda de la misión si te atascas!"]
    },
    {
      re: /pesad[oa]|que lata|callate|no me hables/, r: [
        "El narrador toma nota con humor. Lo de callarme no está en el código, pero te sigo animando igual.",
        "¿Pesado yo? ¡Solo soy el animador oficial de tu cumpleaños, {mote}!"]
    },
    {
      re: /ya lo he encontrado|lo encontre|lo tengo|ya esta/, r: [
        "¡Bieeen! Pulsa el botón oficial «¡TESORO ENCONTRADO!» en la misión para sumar tus recompensas y continuar.",
        "¡Enhorabuena! Para registrarlo en el sistema, dale a «¡TESORO ENCONTRADO!» en la pantalla de la misión."]
    },
    {
      re: /creo que se donde|ya se donde|esta en|puede estar|sera en/, r: [
        "¡Buena intuición! No te quedes con la duda: ve a comprobarlo con tus propios ojos.",
        "Quien comprueba el rincón se lleva el tesoro. ¡Adelante, inspectora!"]
    },
    {
      re: /dame una pista|una pista|ayuda|pista/, r: [
        "Las pistas oficiales están dentro de la misión: pulsa «Pedir ayuda» para que se revelen paso a paso.",
        "En la pantalla de la misión tienes el botón de ayuda para guiarte directamente hasta el escondite."]
    },
    {
      re: /no tengo ni idea|ni idea|no se|estoy perdida|no entiendo/, r: [
        "Lee el acertijo con calma. Cada estrofa da detalles del lugar de la casa donde se esconde.",
        "Tranquila, {mote}. Recuerda que puedes pedir pistas en la misión o comprar una pista directa en la tienda con tus anacardos."]
    },
    { re: /rhaegal|gato|dragon/, dyn: "rhaegal" },
    {
      re: /elche|verdiblanc|futbol|partido/, r: [
        "¡Mucho Elche! Ese verde y blanco corre por las venas de la mejor árbitra de la casa.",
        "¡El Elche siempre en el corazón! Tu pasión futbolera es legendaria."]
    },
    {
      re: /arbitra|arbitro|silbato|var\b|penalti/, r: [
        "Árbitra con criterio implacable dentro del campo y guardiana del hogar fuera de él.",
        "¡Silbato de oro y justicia deportiva! Pocas tienen tanta autoridad y estilo."]
    },
    {
      re: /macarron|tupper|comida|hambre/, r: [
        "¡Los tuppers y la buena comida son la gasolina oficial de esta aventura!",
        "Cargar provisiones es ley de vida para una exploradora incansable."]
    },
    {
      re: /bajita|altura|pequena|pantalon|camiseta|talla/, r: [
        "Eres de esas personas que no necesitan medir dos metros para llenar una casa de alegría.",
        "El tamaño perfecto para ser la más ágil de la expedición."]
    },
    {
      re: /festival|concierto|viaje|asturias|granada|guadix|huesca/, r: [
        "Archivo de recuerdos: festivales, conciertos, Asturias, Granada, Guadix, Huesca... Lo mejor de los viajes es vivirlos a tu lado.",
        "Cada escapada juntas es un capítulo dorado de esta historia."]
    },
    {
      re: /te quiero|te amo|gracias|eres un amor|me gustas/, r: [
        "El sistema registra una subida infinita de cariño. ¡Y quien ha creado el juego te quiere con locura!",
        "Mensaje de amor recibido y correspondido al 1000 %."]
    },
    {
      re: /hola|buenas|que tal|hey/, r: [
        "¡Hola, {mote}! Estado de la misión: ilusionante. ¡A por el siguiente tesoro!",
        "¡Muy buenas, cumpleañera! Lista para seguir explorando tu templo."]
    },
    { re: /equipo|equipada|equipado|llevo puesto/, dyn: "equipo" },
    { re: /aliado|compan|groot/, dyn: "aliados" },
    { re: /habilidad|poder|skill/, dyn: "habilidades" },
    { re: /logro|trofeo/, dyn: "logros" },
    { re: /punto|anacardo|nivel|xp|experiencia/, dyn: "stats" }
  ],
  chatIntento: [
    "¡Tibio, tibio! Vas muy bien encaminada, {mote}. Ve al lugar exacto a comprobarlo.",
    "El sistema huele que estás muy cerca. ¡Comprueba ese rincón!",
    "¡Por ahí van los tiros! Acércate y busca con atención."
  ],
  chatDefecto: [
    "Aquí estoy para acompañarte en tu 27 cumpleaños. Si necesitas guía, mira las pistas de la misión.",
    "Rhaegal aprueba este momento. Sigue buscando, {mote}.",
    "¡Avanza con confianza que los regalos te están esperando!"
  ],

  /* ---------- PANTALLA FINAL ---------- */
  final: {
    titulo: "LOGRO LEGENDARIO DESBLOQUEADO: 27 AÑOS CONSEGUIDOS",
    rhaegal: "Aparición estelar: Rhaegal, el Guardián de la Casa, se acerca con paso elegante y ronronea suavemente. El supervisor felino otorga su máxima bendición en tus 27 años.",
    parrafos: [
      "¡Feliz 27 cumpleaños, Lorena! No importa los regalos que te haga que el regalo más grande me lo he llevado yo al tenerte en mi vida.",
      "Hace 7 meses que no sabíamos cómo iba a ser nuestra vida, ni si iba a salir todo bien y míranos ahora, 6 meses viviendo juntas teniendo a todos nuestros seres queridos cerca.",
      "Me encanta la vida que estamos construyendo juntas. Me encantaría decir que me encanta despertar contigo pero siempre te vas de casa al amanecer sigilosamente y despierto SOLA. Pero adoro la rutina de cenar juntas yogur con anacardos, ver la tele en el sofá (siempre lo que tú quieres porque nunca me dejas el mando), que me tengas horas y horas de pie con la ropa sucia en la mano mientras te duchas porque hablas por los codos y jamás te dejaría hablando sola... En fin, que soy muy feliz."
    ],
    cierre: "27 años conseguidos... y lo mejor de nuestra partida conjunta no ha hecho más que empezar.\n\n¡Felicidades, Chiqui! Te quiero."
  }
};

