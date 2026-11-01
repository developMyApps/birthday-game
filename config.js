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
    mision:   { xp: 100, anac: 100, pts: 100 },
    objeto:   { xp: 50,  pts: 50 },
    sinAyuda: { xp: 50,  anac: 50 },
    prueba:   { xp: 25,  anac: 75, pts: 75 },
    secreto:  { xp: 75,  pts: 75 },
    logro:    { pts: 100 },
    final:    { anac: 200 }
  },
  titulos: ["Novata del Tesoro", "Aprendiz de Aventuras", "Exploradora", "Cazatesoros", "Guardiana en Prácticas", "Heroína de la Casa", "Guardiana Legendaria", "Leyenda de los Anacardos"],

  regalos: ["pantalon", "kit", "groot1", "groot2", "arbol", "camiseta"],

  /* ---------- INTRODUCCIÓN ---------- */
  intro: [
    { ico: "⚠️", t: "ALERTA", x: "Se ha detectado una anomalía en el universo del 27 cumpleaños de la Chiqui." },
    { ico: "🗝️", t: "OBJETOS LEGENDARIOS", x: "Cinco objetos legendarios han sido distribuidos por diferentes zonas de la casa. Su localización ha sido protegida mediante desafíos, acertijos y algún que otro intento de sabotaje." },
    { ico: "🎯", t: "LA ELEGIDA", x: "Solo una persona puede recuperarlos todos. La elegida ha sido seleccionada por sus habilidades, su carisma y, sobre todo, por su infinita paciencia." },
    { ico: "🐾", t: "SUPERVISIÓN OFICIAL", x: "Rhaegal ha sido nombrado supervisor oficial de la operación. Se le ha solicitado colaboración al departamento felino. Rhaegal ha escuchado la petición, ha parpadeado lentamente y ha decidido seguir durmiendo." },
    { ico: "🏠", t: "TERRITORIO CONOCIDO", x: "El sistema ha registrado un dato relevante: lleváis seis meses viviendo juntas. La misión se desarrolla, por tanto, en terreno familiar. Aun así, alguien ha movido cosas de sitio." },
    { ico: "✨", t: "BIENVENIDA, LORENA", x: "Tu aventura comienza ahora." }
  ],

  /* ---------- OBJETOS, EQUIPO Y ALIADOS ----------
     cat: equipamiento | arma | armadura | consumible | aliado | especial
     rareza: comun | especial | epico | legendario            */
  objetos: [
    { id: "pantalon", nombre: "Pantalón Legendario del Movimiento Libre", cat: "equipamiento", tipo: "Equipamiento", rareza: "legendario", icono: "👖", color: "#4c6fd6", slot: "piernas",
      desc: "Mejora la movilidad del personaje, desbloquea una habilidad de exploración y aporta puntos de estilo.",
      stats: { movilidad: 25, estilo: 15, exploracion: 10 },
      hab: { id: "zancada", nombre: "Zancada libre", tipo: "activa", desc: "Habilidad de exploración. Una vez por misión: encuentras 10 ANACARDOS caídos por el suelo." },
      broma: "Equipamiento adquirido. El sistema ha realizado un análisis de medidas y confirma que existe una probabilidad considerable de que necesites un pequeño ajuste de longitud. Las piernas del personaje siguen siendo las mismas." },
    { id: "kit", nombre: "Kit Legendario de Supervivencia Laboral", cat: "especial", tipo: "Objeto especial", rareza: "legendario", icono: "🧊", color: "#34b8c9",
      desc: "Equipamiento diseñado para sobrevivir a largas jornadas laborales y alimentar a una protagonista cuyo repertorio gastronómico presenta una preocupante dependencia de los macarrones.",
      stats: { resistencia: 25 },
      hab: { id: "macarrones", nombre: "Macarrones de emergencia", tipo: "activa", desc: "Recupera energía de forma extraordinaria, aunque el personaje no puede garantizar que el menú cambie algún día." },
      broma: "Aumenta la resistencia, permite transportar provisiones y desbloquea la recuperación de energía. El menú, por desgracia, sigue siendo el mismo." },
    { id: "groot1", nombre: "Groot Junior · Compañero de exploración", cat: "aliado", tipo: "Aliado", rareza: "epico", icono: "🌱", color: "#3fae6a",
      desc: "No habla mucho, pero siempre está ahí. Un compañero fiel que no necesita grandes discursos para demostrar su lealtad.",
      stats: { exploracion: 20, moral: 5 },
      hab: { id: "junior", nombre: "Bonificación de exploración", tipo: "pasiva", desc: "Mientras esté en tu equipo, cada misión completada te da 10 ANACARDOS extra." },
      anacExtra: 50, msgFisico: "Yo soy Groot.\n\nY no, no me he equivocado de casa.",
      broma: "Groot Junior se une al equipo. Vocabulario: tres palabras. Lealtad: ilimitada." },
    { id: "groot2", nombre: "Groot Guardián · Defensor legendario", cat: "aliado", tipo: "Aliado y defensor", rareza: "legendario", icono: "🌳", color: "#2f8f55",
      desc: "Cuando la situación se complica, Groot Guardián aparece para proteger a su equipo. No necesita hablar demasiado. Su tamaño ya es bastante convincente.",
      stats: { defensa: 25 },
      hab: { id: "muro", nombre: "Muro de raíces", tipo: "activa", desc: "Habilidad de protección. Una vez por misión: te protege y recuperas toda la energía (+10 puntos)." },
      anacExtra: 50, msgFisico: "Yo soy Groot.\n\n(Traducción: «Cuidado con la mesa baja, Chiqui».)",
      broma: "Groot Guardián se une al equipo. Defensa del grupo: notablemente mejorada. Margen de discusión: nulo." },
    { id: "arbol", nombre: "El Árbol del Apocalipsis Navideño", cat: "arma", tipo: "Arma legendaria", rareza: "legendario", icono: "🎄", color: "#e0504f", slot: "arma",
      desc: "Forjado en los meses más calurosos del año y reclamado por una auténtica fanática de la Navidad. Su poder aumenta considerablemente cuando se acerca diciembre.",
      stats: { poder: 35, moral: 10 },
      hab: { id: "espiritu", nombre: "Espíritu Navideño Devastador", tipo: "activa", desc: "Derrota a cualquier enemigo imaginario con una explosión de espíritu navideño, luces y villancicos. Una vez por misión." },
      broma: "Arma equipada. Daño: ficticio. Luces: reales. Se recomienda no usarla antes de diciembre. Se sabe que no se cumplirá." },
    { id: "camiseta", nombre: "Armadura Verdiblanca del Elche", cat: "armadura", tipo: "Armadura especial", rareza: "epico", icono: "👕", color: "#1f9d55", slot: "cuerpo",
      desc: "Mejora la defensa, aumenta la moral del personaje y desbloquea una habilidad relacionada con el fútbol.",
      stats: { defensa: 15, moral: 25 },
      hab: { id: "var", nombre: "Justicia del VAR", tipo: "activa", desc: "Revisa la jugada: una vez por misión, si has pedido ayudas, el VAR las anula y recuperas la opción del bonus «sin ayudas»." },
      broma: "El sistema recuerda a la protagonista que ser árbitra y ser aficionada del Elche simultáneamente constituye un conflicto de intereses. La armadura, sin embargo, ha sido aprobada por el comité." },
    { id: "rhaegal", nombre: "Rhaegal · Guardián Legendario de la Casa", cat: "aliado", tipo: "Compañero especial", rareza: "legendario", icono: "🐾", color: "#e8b64c",
      desc: "Misterioso, poderoso y un poco indiferente a los problemas de los humanos. Conoce todos los secretos de la casa; no está dispuesto a compartirlos gratis.",
      stats: { defensa: 20, moral: 10, exploracion: 10 },
      hab: { id: "mirada", nombre: "Mirada del dragón", tipo: "activa", desc: "Detecta secretos y oportunidades ocultas: una vez por misión encuentras 25 ANACARDOS que nadie vigilaba." },
      broma: "Rhaegal ha revisado tu progreso. No ha emitido ningún comentario. Pero se une al equipo." },
    { id: "accesorio", nombre: "Pulsera de la Guardiana", cat: "equipamiento", tipo: "Accesorio", rareza: "especial", icono: "📿", color: "#b58cff", slot: "accesorio",
      desc: "Un accesorio especial adquirido con ANACARDOS. Brilla lo justo para parecer importante.", stats: { estilo: 10, moral: 10 },
      broma: "Accesorio equipado. +10 de estilo. Nadie le ha preguntado a la talla del personaje." },
    { id: "aura", nombre: "Aura Dorada de Heroína", cat: "especial", tipo: "Mejora cosmética", rareza: "especial", icono: "✨", color: "#ffd86b", slot: "cosmetico",
      desc: "Un resplandor dorado alrededor del personaje. No sirve para nada. Queda espectacular.", stats: { estilo: 10 },
      broma: "Cosmético aplicado. Eficacia: cero. Elegancia: máxima." }
  ],

  /* ---------- TIENDA (opcional, nunca bloquea la aventura) ----------
     tipo: consumible | objeto | evento | vale                       */
  tienda: [
    { id: "pista",    nombre: "Pista adicional",           precio: 50,  icono: "💡", tipo: "consumible", desc: "Una pista extra para la misión que tengas abierta. Cuenta como ayuda." },
    { id: "pocion",   nombre: "Poción de paciencia",       precio: 100, icono: "🧪", tipo: "consumible", desc: "Recupera la energía y hace que el narrador no se burle de tus ayudas durante esa misión." },
    { id: "escudo",   nombre: "Escudo protector",          precio: 150, icono: "🛡️", tipo: "consumible", desc: "Protege el bonus «sin ayudas»: la próxima ayuda de la misión no cuenta." },
    { id: "accesorio", nombre: "Pulsera de la Guardiana",  precio: 200, icono: "📿", tipo: "objeto",     desc: "Accesorio especial: +10 estilo y +10 moral." },
    { id: "aura",     nombre: "Aura Dorada de Heroína",    precio: 250, icono: "✨", tipo: "objeto",     desc: "Mejora cosmética: tu personaje brilla en dorado." },
    { id: "evento",   nombre: "Evento especial con el narrador", precio: 300, icono: "🎙️", tipo: "evento", desc: "Una entrevista exclusiva con el narrador. Sin filtro (casi)." },
    { id: "v_abrazo", nombre: "Vale: derecho a exigir un abrazo",  precio: 80,  icono: "🫂", tipo: "vale", canje: "VALE CANJEADO: tienes derecho a exigir un abrazo. Es de obligado cumplimiento. Hazlo valer." },
    { id: "v_cena",   nombre: "Vale: elegir la cena",     precio: 120, icono: "🍽️", tipo: "vale", canje: "VALE CANJEADO: hoy eliges tú la cena. (Los macarrones quedan oficialmente vetados por decreto del narrador.)" },
    { id: "v_fregar", nombre: "Vale: no fregar hoy",      precio: 160, icono: "🧽", tipo: "vale", canje: "VALE CANJEADO: hoy no se friega. La organización se encarga." },
    { id: "v_cita",   nombre: "Vale: una cita elegida por ella", precio: 220, icono: "🎟️", tipo: "vale", canje: "VALE CANJEADO: una cita elegida por ti, en el plan, lugar y hora que quieras." },
    { id: "v_sorpresa", nombre: "Recompensa sorpresa de la organización", precio: 260, icono: "🎁", tipo: "vale", canje: "VALE CANJEADO: la organización te debe una sorpresa. Espera con paciencia (esa que tanto te caracteriza)." }
  ],

  eventoNarrador: [
    "Conexión establecida. Esto es una entrevista exclusiva con la protagonista. Las preguntas no se pueden esquivar.",
    "Pregunta 1: ¿Es cierto que has comido macarrones esta semana? No respondas. El sistema ya conoce la respuesta.",
    "Pregunta 2: como árbitra, ¿habrías pitado penalti en el último partido del Elche? Responde con honestidad. Tu cara ya lo ha hecho.",
    "Pregunta 3: llevas seis meses compartiendo casa. ¿Qué es lo que más agradeces? El sistema no puede registrar la respuesta, pero ha detectado una sonrisa.",
    "Fin de la entrevista. Se ha comprobado que la entrevistada es una heroína, una cabezota, una gran compañera y, sin duda, una persona difícil de ganar discutiendo. Gracias por participar."
  ],

  /* ---------- LOGROS ---------- */
  logros: [
    { id: "inicio", nombre: "Bienvenida, Lorena", desc: "Comenzar la aventura.", icono: "🚀" },
    { id: "primer", nombre: "Primer tesoro", desc: "Encontrar tu primer regalo.", icono: "🎁" },
    { id: "m0", nombre: "Una cuestión de centímetros", desc: "Completar la misión 1.", icono: "📏" },
    { id: "m1", nombre: "Superviviente laboral", desc: "Completar la misión 2.", icono: "🍝" },
    { id: "m2", nombre: "Dos guardianes, un destino", desc: "Completar la misión 3.", icono: "🌳" },
    { id: "m3", nombre: "La Navidad empieza en verano", desc: "Completar la misión 4.", icono: "🎄" },
    { id: "m4", nombre: "Juicio final del VAR", desc: "Completar la misión 5.", icono: "🟩" },
    { id: "sinayuda", nombre: "Mente brillante", desc: "Completar una misión sin pedir ayuda.", icono: "🧠" },
    { id: "paciencia", nombre: "Paciencia en descenso", desc: "Usar las tres ayudas en una misma parte.", icono: "😤" },
    { id: "anacardos", nombre: "Magnate del anacardo", desc: "Conseguir 500 ANACARDOS en total.", icono: "💰" },
    { id: "comprador", nombre: "Cliente VIP", desc: "Hacer tu primera compra en la tienda.", icono: "🛍️" },
    { id: "pruebas", nombre: "Mente de concurso", desc: "Superar 3 pruebas secundarias.", icono: "❓" },
    { id: "equipo", nombre: "Equipo legendario", desc: "Reunir a los dos Groot y a Rhaegal.", icono: "🛡️" },
    { id: "nivel5", nombre: "Heroína en ascenso", desc: "Alcanzar el nivel 5.", icono: "⭐" },
    { id: "dragon", nombre: "Aprobación del dragón", desc: "Logro secreto: ganarte el respeto de Rhaegal.", icono: "🐉", secreto: true },
    { id: "final", nombre: "6 meses compartiendo partida", desc: "Completar toda la aventura.", icono: "💚", secreto: true }
  ],

  /* ---------- MISIONES ----------
     IMPORTANTE: "escondite" y "palabras" son SOLO para ti (apuntes).
     Nunca se muestran en pantalla. "palabras" sirve para que el
     narrador reconozca intentos en el chat sin confirmar nada.    */
  misiones: [
    { nombre: "Una cuestión de centímetros", icono: "📏",
      intro: "Primera prueba del sistema. El objeto que buscas forma parte del equipamiento del héroe... y tiene una relación complicada con la altura de su portadora.",
      celebracion: "Primer objeto recuperado. La protagonista ya puede moverse libremente por el mapa. Con un pequeño ajuste de longitud, claro.",
      partes: [{
        regalo: "pantalon",
        escondite: "Armario, entre su ropa (SOLO PARA TI).",
        palabras: ["armario", "ropa", "cajon", "perchero", "vestidor"],
        acertijo: "En este mundo existen objetos que se adaptan a casi cualquier situación: una cena elegante, una tarde de paseo, un día laboral o una expedición improvisada.\n\nSin embargo, hay una característica que puede convertir una adquisición perfecta en un pequeño problema logístico.\n\nEl sistema no dispone de datos suficientes sobre tu altura, pero sospecha que el fabricante podría haber sobreestimado ligeramente tus dimensiones.\n\nEncuentra el objeto que podría necesitar un ajuste para equiparte.",
        pistas: [
          "Hay objetos que presumen de largo y otros que tienen que acortarse para llegar a su destino. Piensa en qué se remanga cuando algo sobra.",
          "Tu objeto vive donde cada mañana tomas una decisión épica que empieza por «¿qué me pongo?». Pero no te quedes en lo evidente.",
          "Busca entre aquello que conoces demasiado bien, en el lugar donde se cuelga y se dobla lo cotidiano. El tesoro quiere pasar desapercibido entre lo habitual."
        ],
        pistaExtra: "El objeto es de esos que se ponen de una pierna y de otra. Si lo encuentras, entenderás por qué el narrador no deja de mirarte los centímetros."
      }],
      prueba: { q: "¿Quién ha sido nombrado supervisor oficial de la operación?", o: ["El VAR", "Rhaegal", "Groot", "El vecino de arriba"], c: 1 } },

    { nombre: "Supervivencia laboral", icono: "🍝",
      intro: "Segunda prueba. El departamento de inteligencia ha abierto un expediente alimentario sobre la protagonista. Los resultados son... previsibles.",
      celebracion: "Logística de supervivencia asegurada. El repertorio gastronómico sigue pendiente de actualización.",
      partes: [{
        regalo: "kit",
        escondite: "Cocina (SOLO PARA TI).",
        palabras: ["cocina", "nevera", "frigo", "tupper", "despensa", "armarito"],
        acertijo: "Los datos nutricionales de nuestra protagonista han sido analizados por el departamento de inteligencia.\n\nTras meses de investigación se ha descubierto un patrón sospechoso: existe un alimento que aparece en demasiadas de sus expediciones laborales.\n\nSu preparación requiere habilidades culinarias extraordinarias: agua, calor y una cantidad de esfuerzo que roza lo heroico.\n\nEl sistema sospecha que este alimento podría constituir el 87 % de su repertorio gastronómico.\n\nTu siguiente objeto está relacionado con la logística necesaria para transportar semejantes banquetes.",
        pistas: [
          "Agua, calor, un colador y cero imaginación: resuelve la ecuación. ¿Qué necesita un banquete laboral para viajar sin derrames?",
          "Donde se cocinan las hazañas de cada día, aunque la receta sea siempre la misma.",
          "Revisa los lugares donde se guarda lo que debe mantenerse frío y también los que acogen envases con tapa. El tesoro presume de ambas cosas."
        ],
        pistaExtra: "Piensa en dónde empieza la expedición: el lugar donde se cocina el eterno menú... y donde se sella con tapa."
      }],
      prueba: { q: "¿Qué plato ocupa el 87 % del repertorio laboral de la protagonista?", o: ["Paella", "Macarrones", "Tortilla", "Ensalada"], c: 1 } },

    { nombre: "Dos guardianes, un destino", icono: "🌳",
      intro: "Tercera prueba. El sistema ha detectado una señal vegetal. Dos guardianes esperan en la casa. Primero uno, luego el otro. Y uno de ellos es pequeño.",
      celebracion: "Los dos guardianes se han unido al equipo. Entre los dos suman tres palabras de vocabulario. Suficiente.",
      partes: [
        { regalo: "groot1",
          escondite: "Cerca de una planta (SOLO PARA TI).",
          palabras: ["planta", "maceta", "terraza", "balcon", "ventana"],
          acertijo: "Señal detectada: una criatura pequeña, verde y con un vocabulario muy limitado. Son tres palabras, siempre las mismas.\n\nPresume de raíces y evita las conversaciones largas. Es leal, discreto y no ocupa mucho sitio.\n\nEncuentra al primer guardián.",
          pistas: [
            "Tres palabras. Siempre las mismas. Busca a quien presume de raíces.",
            "Prefiere la compañía de quienes beben agua con regularidad y sin quejarse.",
            "Mira a ras de hojas. Está más cerca de lo verde que de lo alto."
          ],
          pistaExtra: "Dicen que se siente muy a gusto rodeado de seres que hacen la fotosíntesis. Y que hay que agacharse un poco." },
        { regalo: "groot2",
          escondite: "Estantería o zona del salón (SOLO PARA TI).",
          palabras: ["salon", "estanteria", "balda", "libreria", "mueble", "tele"],
          acertijo: "El primer guardián ha dejado un mensaje: «Soy Groot». Traducción: «Mi hermano mayor te está esperando».\n\nSi el pequeño era el explorador, el grande es la muralla. No se esconde a ras de suelo: necesita vistas.\n\nEncuentra al segundo guardián.",
          pistas: [
            "Si el pequeño era el explorador, el grande es la muralla. Un muro necesita perspectiva, no sótanos.",
            "Le gusta observar la zona donde la gente se reúne y mira pantallas, y lo hace desde cierta altura.",
            "Revisa lo que está colocado en vertical, donde se alinean libros, adornos y recuerdos. Busca algo que no encaje del todo con la decoración."
          ],
          pistaExtra: "Un guardián de ese tamaño no se pierde entre los recuerdos... pero el narrador te anima a comprobarlo." }
      ],
      prueba: { q: "¿Cuántos meses lleváis viviendo juntas?", o: ["3", "6", "12", "27"], c: 1 } },

    { nombre: "La Navidad empieza en verano", icono: "🎄",
      intro: "Cuarta prueba. El departamento de fenómenos inexplicables ha emitido una alerta de temperatura emocional: alguien de esta casa lleva meses esperando diciembre.",
      celebracion: "Arma legendaria asegurada. A partir de ahora, la protagonista puede iluminar cualquier amenaza con espíritu navideño.",
      partes: [{
        regalo: "arbol",
        escondite: "Detrás de una puerta, cortina o armario (SOLO PARA TI).",
        palabras: ["puerta", "cortina", "detras", "armario", "rincon", "pasillo"],
        acertijo: "El departamento de fenómenos inexplicables ha detectado una anomalía climática.\n\nUna persona de esta casa lleva meses experimentando síntomas propios de diciembre en pleno verano.\n\nLos síntomas incluyen ilusión desproporcionada, anticipación festiva y una insistencia difícil de combatir.\n\nTras investigar el caso, se ha localizado un artefacto que podría poner fin a esta situación.\n\nSe sabe que es bastante más alto que un Groot, que todavía no ha sido desplegado y que su verdadera función no consiste en dar sombra.\n\nEncuentra el artefacto antes de que la protagonista empiece a cantar villancicos.",
        pistas: [
          "Mide más de un metro y no cabe en un bolsillo. Ahora ocupa poco, pero su talento llegará desplegado.",
          "Los objetos alargados y discretos adoran los rincones donde nadie mira: lugares que se abren, se cierran o se corren.",
          "Busca algo vertical y estrecho, apoyado detrás de aquello que se abre, se corre o se cuelga."
        ],
        pistaExtra: "Es discreto, alargado y lleva meses guardando un secreto navideño. Si lo tienes cerca, lo notarás por la caja, no por las luces."
      }],
      prueba: { q: "¿Cuándo empieza la Navidad según la protagonista de esta casa?", o: ["En diciembre", "En noviembre", "En verano", "Nunca"], c: 2 } },

    { nombre: "El juicio final del VAR", icono: "🟩",
      intro: "Última prueba. El sistema ha detectado un conflicto de intereses sin precedentes. Se requiere una árbitra que sepa pensar como aficionada.",
      celebracion: "Armadura verdiblanca asegurada. El comité certifica la imparcialidad de la protagonista... con reservas.",
      partes: [{
        regalo: "camiseta",
        escondite: "Sofá, cama o caja de regalo (SOLO PARA TI).",
        palabras: ["sofa", "cama", "caja", "almohada", "cojin", "dormitorio", "habitacion"],
        acertijo: "Has llegado a la última prueba.\n\nEl sistema ha recopilado información sobre tus actividades y ha descubierto una contradicción preocupante.\n\nPor un lado, eres una profesional encargada de impartir justicia dentro de un terreno de juego.\n\nPor otro, cuando aparecen once individuos vestidos de verde y blanco, tu capacidad para mantener la imparcialidad parece desaparecer misteriosamente.\n\nSe han registrado protestas, decisiones cuestionables y alguna que otra reacción desproporcionada.\n\nTu último objeto está relacionado con esa pasión que consigue que una persona perfectamente razonable se transforme en una comentarista deportiva de dudosa objetividad.\n\nPara encontrarlo tendrás que abandonar temporalmente tu papel de árbitra y pensar como una aficionada.",
        pistas: [
          "El VAR no sirve de nada sin pasión. Piensa con el corazón y no con el silbato: ¿qué colores te cambian el humor cuando juega tu equipo?",
          "No necesita estar en el campo. Lo que buscas pide descanso, abrigo o envoltorio.",
          "Pregúntate dónde pasas más tiempo viendo partidos, o dónde una caja con sorpresa podría esperarte sin que nadie sospechara."
        ],
        pistaExtra: "Un objeto de ese equipo puede esperar donde se descansa, se arropa o se abre un regalo. Y no pita penaltis."
      }],
      prueba: { q: "¿Cuál es el equipo de tus amores, árbitra imparcial?", o: ["Elche CF", "El equipo del vecino", "Ninguno, soy imparcial", "El Betis"], c: 0 } }
  ],

  /* ---------- NARRADOR ---------- */
  narradorHome: [
    "Sistema operativo. Paciencia de la jugadora: en revisión.",
    "El departamento felino sigue durmiendo. Supervisión: máxima.",
    "Recuerda: nadie le pide a un héroe que resuelva a la primera. Pero todo el mundo lo espera.",
    "Consejo del sistema: quien explora sin prisa, suele dormir mejor. Quien usa tres ayudas, suele dormir peor.",
    "Se detecta humor en la protagonista. El narrador toma nota.",
    "La casa lleva seis meses siendo vuestra. El sistema sospecha que todavía guarda secretos."
  ],
  ayudaTemprana: [
    "El sistema ha detectado un descenso alarmante de la paciencia de la jugadora. ¿Seguro que quieres rendirte tan pronto, {mote}?",
    "¿Ayuda ya? El narrador acaba de levantar una ceja. Pero se lo permite."
  ],
  ayudaNormal: [
    "El sistema registrará esta ayuda. ¿Continuamos?",
    "Pedir ayuda es de sabios. Pedirla pronto, de personas con poca paciencia. ¿Confirmas?",
    "Se solicita una pista oficial. Tu bonus «sin ayudas» podría resentirse. ¿Estás segura?"
  ],
  ayudaPocion: [
    "La poción de paciencia está activa: hoy el narrador no te juzga. ¿Pedimos la ayuda?"
  ],
  rhaegalEventos: [
    "ATENCIÓN: Rhaegal ha detectado movimiento sospechoso. La protagonista está buscando algo por la casa. El supervisor felino exige una explicación.",
    "Se ha solicitado colaboración al departamento felino. Rhaegal ha escuchado la petición, ha parpadeado lentamente y ha decidido seguir durmiendo.",
    "El sistema confirma que Rhaegal conoce la ubicación de todos los objetos de la casa. Lamentablemente, no está dispuesto a compartir esa información.",
    "Rhaegal ha revisado tu progreso. No ha emitido ningún comentario, pero su mirada indica que esperaba bastante más de ti."
  ],
  secretoRhaegal: {
    pulsaciones: 5,
    pista: "Rhaegal no se une a equipos que no han demostrado atención. Se dice que ha dejado una huella en algún rincón del centro de operaciones... y que hay que pulsarla con convicción: cinco veces."
  },

  /* Chat: el primer patrón que coincida decide la respuesta.
     Para editar: cambia o añade frases. Usa {mote} y {nombre}. */
  chat: [
    { re: /no pienso seguir|dejo de jugar|no sigo jugando|abandono/, r: [
      "Abandonar la partida a mitad de aventura... El sistema registra tu enfado, pero también registra que nunca lo has hecho de verdad. Respira, {mote}.",
      "Rhaegal te mira con indiferencia. Quizá pensaba lo mismo de los humanos. Vuelve cuando quieras: la partida se guarda sola." ] },
    { re: /me rindo|rendirme|imposible/, r: [
      "Imposible es una palabra que el sistema no reconoce. ¿Y si respiras, sueltas el móvil un minuto y miras alrededor?",
      "Rendirse no está permitido en este universo. Pedir ayuda sí: botón oficial de ayuda, en la pantalla de misión.",
      "Tranquila, {mote}. Las pistas oficiales existen para cuando el cerebro se pone en modo avión." ] },
    { re: /pesad[oa]|que lata|callate|no me hables/, r: [
      "El narrador toma nota. Lo del pesado, quiero decir. Lo de callarme, el sistema dice que no.",
      "¿Pesado yo? El sistema solo hace su trabajo: vigilar tu paciencia, {mote}.",
      "Registrado: «el narrador es pesado». Queja derivada al departamento felino. Rhaegal ya ha decidido ignorarla." ] },
    { re: /ya lo he encontrado|lo encontre|lo tengo|ya esta/, r: [
      "Si es verdad, pulsa el botón oficial «¡TESORO ENCONTRADO!» en la pantalla de misión. Aquí solo se charla: las recompensas las gestiona el sistema.",
      "Felicidades preventivas. Para que sea oficial, hay que pulsar el botón y confirmar. El chat no concede regalos." ] },
    { re: /creo que se donde|ya se donde|esta en|puede estar|sera en/, r: [
      "Muy bien, {mote}. Pero el narrador no confirma ubicaciones. Si crees que lo sabes, comprueba el lugar. Si hay tesoro, pulsa el botón oficial.",
      "Ni confirmo ni desmiento. Quien lo comprueba, lo sabe. Explora, árbitra de intuiciones." ] },
    { re: /dame una pista|una pista|ayuda|pista/, r: [
      "Las pistas oficiales están en la pantalla de misión: son tres, progresivas, y cuestan tu dignidad. Aquí solo hay conversación.",
      "El chat no da pistas. Para eso existe el botón de ayuda. El narrador lo ha diseñado así a propósito." ] },
    { re: /no tengo ni idea|ni idea|no se|estoy perdida|no entiendo/, r: [
      "Lee el acertijo de nuevo, despacio, como si pitaras un fuera de juego milimétrico. A veces la pista está en una sola palabra.",
      "Perderse es parte de la aventura. Prueba a mirar el acertijo como si fuera un expediente: ¿qué no encaja?",
      "Sin ideas, el sistema recomienda dar una vuelta por la casa. Rhaegal lleva meses haciéndolo, y mira dónde está." ] },
    { re: /rhaegal|gato|dragon/, dyn: "rhaegal" },
    { re: /elche|verdiblanc|futbol|partido/, r: [
      "El Elche merece todos los respetos. La protagonista, también. Aunque su imparcialidad cuando juega el Elche está en revisión.",
      "El sistema recuerda que perder el Elche hace salir un tono de voz muy particular. El narrador no dice más." ] },
    { re: /arbitra|arbitro|silbato|var\b|penalti/, r: [
      "Árbitra de profesión, juez de la casa. Decisiones inapelables... salvo que sea el Elche, que el VAR lo revisa dos veces.",
      "Impartir justicia es tu profesión. Dejar que el narrador te provoque es tu hobby." ] },
    { re: /macarron|tupper|comida|hambre/, r: [
      "El sistema calcula que el 87 % de tus expediciones laborales incluye macarrones. Es un dato. No un juicio.",
      "Macarrones: agua, calor y fuerza de voluntad. El sistema aplaude el esfuerzo. Y el menú." ] },
    { re: /bajita|altura|pequena|pantalon|camiseta|talla/, r: [
      "El sistema no opina sobre la altura de nadie. Solo constata que la media de los objetos no se ha hecho pensando en ti.",
      "Cariñosamente: eres de esas personas que no necesitan ocupar mucho sitio para llenar una casa." ] },
    { re: /festival|concierto|viaje|asturias|granada|guadix|huesca/, r: [
      "Archivo de recuerdos: festivales, conciertos, Asturias, Granada, Guadix, Huesca... El sistema guarda todo. Con cariño.",
      "Las mejores misiones se hacen acompañada. Vosotras lo sabéis por experiencia." ] },
    { re: /te quiero|te amo|gracias|eres un amor|me gustas/, r: [
      "El narrador no tiene sentimientos programados. Pero acaba de registrar una anomalía muy bonita.",
      "El sistema recibe el mensaje. Procesando... procesando... ha sido un placer, {mote}." ] },
    { re: /hola|buenas|que tal|hey/, r: [
      "Hola, {mote}. Estado de ánimo: aventurero. Paciencia: en carga.",
      "Bienvenida de nuevo. El sistema dice que hoy se te ve inspirada. Veremos cuánto dura." ] },
    { re: /equipo|equipada|equipado|llevo puesto/, dyn: "equipo" },
    { re: /aliado|compan|groot/, dyn: "aliados" },
    { re: /habilidad|poder|skill/, dyn: "habilidades" },
    { re: /logro|trofeo/, dyn: "logros" },
    { re: /punto|anacardo|nivel|xp|experiencia/, dyn: "stats" }
  ],
  chatIntento: [
    "Interesante hipótesis, {mote}. Pero el narrador ni confirma ni desmiente. Hay una manera de saberlo: ir y comprobarlo.",
    "El sistema detecta un intento de resolución. Resultado: sin comentarios. Si crees que has acertado, ve a comprobar.",
    "Buena corazonada. Lamentablemente el narrador no puede confirmar ubicaciones. La verdad, solo en la casa."
  ],
  chatDefecto: [
    "El narrador ha registrado tu mensaje. Si quieres pistas oficiales, el botón de ayuda está en la pantalla de misión.",
    "Sistema en espera. El departamento felino no ha emitido comentarios. Continúa, {mote}.",
    "Mensaje recibido. Ironía en proceso de carga.",
    "Eso suena a algo que diría una árbitra con poca paciencia. Y no lo digo con mala intención."
  ],

  /* ---------- PANTALLA FINAL ---------- */
  final: {
    titulo: "LOGRO LEGENDARIO DESBLOQUEADO: 6 MESES COMPARTIENDO PARTIDA",
    rhaegal: "Aparición especial: Rhaegal, el Guardián de la Casa, ha decidido presenciar este momento. No ha dicho nada. Ha parpadeado despacio. El sistema lo interpreta como máxima aprobación.",
    parrafos: [
      "Hace seis meses dimos un paso muy importante: empezar a vivir juntas. Desde entonces, la casa ha sido el escenario de risas, de bromas, de pequeños enfados y de reconciliaciones muy rápidas.",
      "Hemos compartido festivales, conciertos y viajes por España. Hemos compartido tuppers, el sofá y el mando. Y hemos descubierto que cualquier lugar es mejor si estamos juntas.",
      "Quedan aventuras por vivir: más festivales, más viajes, más partidos del Elche (y más enfados), y unas cuantas Navidades que prometen ser épicas."
    ],
    cierre: "No hay pantalla de Game Over cuando juegas con la persona adecuada.\n\nGracias por estos seis meses de aventuras.\n\nY recuerda: esta partida acaba de empezar."
  }
};
