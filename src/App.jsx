import { useState, useEffect, useRef } from "react";

// TODO: Reemplazar con afirmaciones reales desde una API o base de datos
const AFIRMACIONES = {
  amor: [
    "Soy digna de recibir amor profundo e incondicional.",
    "El amor fluye hacia mí de manera natural y abundante.",
    "Me permito dar y recibir amor sin miedo.",
    "Soy amada, valorada y apreciada exactamente como soy.",
    "Atraigo relaciones que nutren mi alma y elevan mi espíritu.",
  ],
  abundancia: [
    "La prosperidad fluye hacia mí en todas sus formas.",
    "Merezco todo lo bueno que la vida tiene para ofrecerme.",
    "El dinero llega a mí de maneras inesperadas y maravillosas.",
    "Soy un imán para la abundancia y las oportunidades.",
    "Confío en que el universo provee todo lo que necesito.",
  ],
  salud: [
    "Mi cuerpo es un templo sagrado que cuido con amor.",
    "Cada día mi energía y vitalidad aumentan.",
    "Elijo alimentos y hábitos que nutren mi bienestar.",
    "Mi mente y cuerpo están en perfecta armonía.",
    "Irrадio salud, energía y bienestar en todo lo que hago.",
  ],
  exito: [
    "Soy capaz de alcanzar todo lo que me propongo.",
    "El éxito es mi estado natural de vida.",
    "Cada paso que doy me acerca a mis metas más grandes.",
    "Tengo el poder de crear la vida que deseo.",
    "Mis sueños se materializan con facilidad y gracia.",
  ],
  confianza: [
    "Confío plenamente en mi intuición y sabiduría interior.",
    "Soy segura, poderosa y capaz de superar cualquier desafío.",
    "Me expreso auténticamente y sin miedo al juicio.",
    "Creo en mí misma con una fe inquebrantable.",
    "Mi presencia transforma cada espacio en el que entro.",
  ],
  paz: [
    "La paz interior es mi estado natural.",
    "Libero todo lo que no me sirve y abrazo la serenidad.",
    "Elijo responder desde la calma en cada situación.",
    "Soy un refugio de tranquilidad para mí misma y los demás.",
    "La gratitud llena mi corazón de paz profunda.",
  ],
};

const CATEGORIAS = [
  { id: "amor", label: "Amor", emoji: "💗", color: "#e91e8c" },
  { id: "abundancia", label: "Abundancia", emoji: "✨", color: "#f5a623" },
  { id: "salud", label: "Salud", emoji: "🌿", color: "#4caf84" },
  { id: "exito", label: "Éxito", emoji: "🔥", color: "#9b59b6" },
  { id: "confianza", label: "Confianza", emoji: "⚡", color: "#3498db" },
  { id: "paz", label: "Paz", emoji: "🌙", color: "#8e44ad" },
];

// TODO: Reemplazar con frases de manifestación reales curadas por expertos
const RITUALES_MANANA = [
  "Respira profundo 3 veces y visualiza tu día ideal.",
  "Escribe 3 cosas por las que estás agradecida hoy.",
  "Repite tu afirmación del día 7 veces mirándote al espejo.",
  "Visualiza durante 5 minutos la vida que estás manifestando.",
  "Declara en voz alta: 'Hoy recibo todo lo que es para mí'.",
];

const FASES_LUNA = [
  { nombre: "Luna Nueva", simbolo: "🌑", descripcion: "Ideal para sembrar intenciones y comenzar nuevos proyectos." },
  { nombre: "Luna Creciente", simbolo: "🌒", descripcion: "Momento de acción y construcción hacia tus metas." },
  { nombre: "Luna Llena", simbolo: "🌕", descripcion: "Máxima energía de manifestación. Celebra tus logros." },
  { nombre: "Luna Menguante", simbolo: "🌘", descripcion: "Tiempo de soltar lo que ya no te sirve y agradecer." },
];

function obtenerFaseLunaActual() {
  // TODO: Calcular fase lunar real basada en fecha actual con algoritmo astronómico
  const fases = FASES_LUNA;
  const idx = Math.floor((new Date().getDate() / 30) * fases.length) % fases.length;
  return fases[idx];
}

function obtenerAfirmacionDelDia(categoria) {
  const lista = AFIRMACIONES[categoria] || AFIRMACIONES.amor;
  const idx = new Date().getDate() % lista.length;
  return lista[idx];
}

export default function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("amor");
  const [afirmacionVisible, setAfirmacionVisible] = useState(true);
  const [afirmacionIdx, setAfirmacionIdx] = useState(0);
  const [metasUsuario, setMetasUsuario] = useState(() => {
    // TODO: Persistir en backend con autenticación de usuario
    try {
      return JSON.parse(localStorage.getItem("astrya_metas") || "[]");
    } catch {
      return [];
    }
  });
  const [nuevaMeta, setNuevaMeta] = useState("");
  const [diarioTexto, setDiarioTexto] = useState("");
  const [entradasDiario, setEntradasDiario] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("astrya_diario") || "[]");
    } catch {
      return [];
    }
  });
  const [racha, setRacha] = useState(() => {
    return parseInt(localStorage.getItem("astrya_racha") || "1");
  });
  const [mostrarOnboarding, setMostrarOnboarding] = useState(() => {
    return !localStorage.getItem("astrya_onboarding_done");
  });
  const [onboardingPaso, setOnboardingPaso] = useState(0);
  const [nombreUsuaria, setNombreUsuaria] = useState(() => {
    return localStorage.getItem("astrya_nombre") || "";
  });
  const [nombreTemp, setNombreTemp] = useState("");
  const [categoriasElegidas, setCategoriasElegidas] = useState([]);
  const [animando, setAnimando] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const faseLuna = obtenerFaseLunaActual();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("astrya_metas", JSON.stringify(metasUsuario));
  }, [metasUsuario]);

  useEffect(() => {
    localStorage.setItem("astrya_diario", JSON.stringify(entradasDiario));
  }, [entradasDiario]);

  const cambiarAfirmacion = () => {
    setAnimando(true);
    setTimeout(() => {
      const lista = AFIRMACIONES[categoriaSeleccionada];
      setAfirmacionIdx((prev) => (prev + 1) % lista.length);
      setAnimando(false);
    }, 350);
  };

  const agregarMeta = () => {
    if (nuevaMeta.trim()) {
      setMetasUsuario((prev) => [
        ...prev,
        { id: Date.now(), texto: nuevaMeta.trim(), completada: false, fecha: new Date().toLocaleDateString("es-ES") },
      ]);
      setNuevaMeta("");
    }
  };

  const toggleMeta = (id) => {
    setMetasUsuario((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completada: !m.completada } : m))
    );
  };

  const eliminarMeta = (id) => {
    setMetasUsuario((prev) => prev.filter((m) => m.id !== id));
  };

  const guardarDiario = () => {
    if (diarioTexto.trim()) {
      setEntradasDiario((prev) => [
        {
          id: Date.now(),
          texto: diarioTexto.trim(),
          fecha: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
          hora: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        },
        ...prev,
      ]);
      setDiarioTexto("");
    }
  };

  const completarOnboarding = () => {
    localStorage.setItem("astrya_onboarding_done", "true");
    localStorage.setItem("astrya_nombre", nombreTemp || "Diosa");
    setNombreUsuaria(nombreTemp || "Diosa");
    if (categoriasElegidas.length > 0) {
      setCategoriaSeleccionada(categoriasElegidas[0]);
    }
    setMostrarOnboarding(false);
  };

  const toggleCategoriaOnboarding = (id) => {
    setCategoriasElegidas((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const coloresGradiente = {
    amor: "linear-gradient(135deg, #1a0533 0%, #3d0b6b 40%, #6b1a9e 100%)",
    abundancia: "linear-gradient(135deg, #1a0e00 0%, #3d2200 40%, #7a4800 100%)",
    salud: "linear-gradient(135deg, #001a0e 0%, #003d22 40%, #006644 100%)",
    exito: "linear-gradient(135deg, #1a0033 0%, #3d006b 40%, #6b0099 100%)",
    confianza: "linear-gradient(135deg, #00051a 0%, #00103d 40%, #001a6b 100%)",
    paz: "linear-gradient(135deg, #0d0020 0%, #1a0040 40%, #2d0060 100%)",
  };

  // ─────────────────────────────────────────────
  // SPLASH SCREEN
  // ─────────────────────────────────────────────
  if (showSplash) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0d0020 0%, #1e0050 50%, #2d006b 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', serif",
      }}>
        <div style={{ animation: "pulseStar 1.8s ease-in-out infinite", fontSize: 72 }}>✨</div>
        <h1 style={{
          color: "#f0d080",
          fontSize: 36,
          fontWeight: "bold",
          letterSpacing: 4,
          margin: "20px 0 8px",
          textShadow: "0 0 20px rgba(240,208,128,0.6)",
        }}>ASTRYA</h1>
        <p style={{ color: "#c9a0e8", fontSize: 14, letterSpacing: 2 }}>Materializando sueños</p>
        <style>{`
          @keyframes pulseStar {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.85; }
          }
        `}</style>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // ONBOARDING
  // ─────────────────────────────────────────────
  if (mostrarOnboarding) {
    const pasos = [
      {
        titulo: "Bienvenida a Astrya ✨",
        subtitulo: "Tu espacio personal de crecimiento y manifestación",
        contenido: (
          <div style={{ textAlign: "center", padding: "0 10px" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🌙</div>
            <p style={{ color: "#ddc0f5", fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
              Astrya está diseñada para convertirse en el primer hábito de tu mañana. Cada día recibirás afirmaciones poderosas seleccionadas según tus metas y emociones.
            </p>
            <button onClick={() => setOnboardingPaso(1)} style={btnPrimaryStyle}>
              Comenzar mi viaje ✨
            </button>
          </div>
        ),
      },
      {
        titulo: "¿Cómo te llamas? 💫",
        subtitulo: "Personalizaremos tu experiencia",
        contenido: (
          <div style={{ textAlign: "center", padding: "0 10px" }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>👑</div>
            <input
              value={nombreTemp}
              onChange={(e) => setNombreTemp(e.target.value)}
              placeholder="Tu nombre..."
              style={inputStyle}
            />
            <button
              onClick={() => setOnboardingPaso(2)}
              style={{ ...btnPrimaryStyle, marginTop: 20 }}
            >
              Continuar →
            </button>
          </div>
        ),
      },
      {
        titulo: "¿Qué deseas manifestar?",
        subtitulo: "Elige tus áreas de enfoque",
        contenido: (
          <div style={{ textAlign: "center" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 24,
              padding: "0 4px",
            }}>
              {CATEGORIAS.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategoriaOnboarding(cat.id)}
                  style={{
                    background: categoriasElegidas.includes(cat.id)
                      ? `linear-gradient(135deg, ${cat.color}88, ${cat.color}44)`
                      : "rgba(255,255,255,0.07)",
                    border: categoriasElegidas.includes(cat.id)
                      ? `2px solid ${cat.color}`
                      : "2px solid rgba(255,255,255,0.15)",
                    borderRadius: 14,
                    padding: "14px 10px",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: "600",
                    transition: "all 0.25s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
            <button
              onClick={completarOnboarding}
              style={btnPrimaryStyle}
              disabled={categoriasElegidas.length === 0}
            >
              Empezar a manifestar ✨
            </button>
          </div>
        ),
      },
    ];

    const paso = pasos[onboardingPaso];
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0d0020 0%, #1e0050 50%, #2d006b 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px",
        fontFamily: "'Georgia', serif",
        maxWidth: 430,
        margin: "0 auto",
      }}>
        {/* Indicadores */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
          {pasos.map((_, i) => (
            <div key={i} style={{
              width: i === onboardingPaso ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === onboardingPaso ? "#f0d080" : "rgba(255,255,255,0.25)",
              transition: "all 0.3s",
            }} />
          ))}
        </div>
        <h2 style={{ color: "#f0d080", fontSize: 24, fontWeight: "bold", textAlign: "center", margin: "0 0 8px" }}>
          {paso.titulo}
        </h2>
        <p style={{ color: "#b090d0", fontSize: 14, textAlign: "center", marginBottom: 28 }}>
          {paso.subtitulo}
        </p>
        {paso.contenido}
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // PANTALLAS PRINCIPALES
  // ─────────────────────────────────────────────
  const hora = new Date().getHours();
  const saludo = hora < 12 ? "Buenos días" : hora < 18 ? "Buenas tardes" : "Buenas noches";
  const afirmacionHoy = AFIRMACIONES[categoriaSeleccionada][afirmacionIdx];

  return (
    <div style={{
      minHeight: "100vh",
      background: coloresGradiente[categoriaSeleccionada],
      fontFamily: "'Georgia', serif",
      maxWidth: 430,
      margin: "0 auto",
      position: "relative",
      overflowX: "hidden",
      transition: "background 0.6s ease",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d0020; }
        ::-webkit-scrollbar { width: 0; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-15px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .tab-btn:active { transform: scale(0.92); }
        .card-hover:active { transform: scale(0.97); }
        textarea:focus, input:focus { outline: none; }
      `}</style>

      {/* ── ESTRELLAS DE FONDO ── */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, maxWidth: 430, margin: "0 auto", pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {[...Array(18)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            borderRadius: "50%",
            background: "#f0d080",
            left: `${(i * 17 + 7) % 100}%`,
            top: `${(i * 23 + 5) % 80}%`,
            animation: `starTwinkle ${2 + (i % 3)}s ${i * 0.3}s ease-in-out infinite`,
          }} />
        ))}
      </div>

      {/* ── CONTENIDO SCROLLEABLE ── */}
      <div style={{ position: "relative", zIndex: 1, paddingBottom: 90, minHeight: "100vh", overflowY: "auto" }}>

        {/* ──────── PANTALLA: INICIO ──────── */}
        {pantalla === "inicio" && (
          <div>
            {/* Header */}
            <div style={{
              padding: "52px 24px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}>
              <div>
                <p style={{ color: "#c9a0e8", fontSize: 13, letterSpacing: 1 }}>{saludo},</p>
                <h1 style={{ color: "#f0d080", fontSize: 26, fontWeight: "bold", letterSpacing: 1, textShadow: "0 0 15px rgba(240,208,128,0.4)" }}>
                  {nombreUsuaria || "Diosa"} 👑
                </h1>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20 }}>{faseLuna.simbolo}</div>
                <p style={{ color: "#c9a0e8", fontSize: 11, marginTop: 2 }}>{faseLuna.nombre}</p>
              </div>
            </div>

            {/* Racha */}
            <div style={{ padding: "0 24px 20px" }}>
              <div style={{
                background: "rgba(240,208,128,0.12)",
                border: "1px solid rgba(240,208,128,0.25)",
                borderRadius: 16,
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}>
                <span style={{ fontSize: 28 }}>🔥</span>
                <div>
                  <p style={{ color: "#f0d080", fontWeight: "bold", fontSize: 15 }}>Racha de {racha} {racha === 1 ? "día" : "días"}</p>
                  <p style={{ color: "#b090d0", fontSize: 12 }}>¡Sigue manifestando cada día!</p>
                </div>
              </div>
            </div>

            {/* Selector de categorías */}
            <div style={{ padding: "0 24px 16px" }}>
              <p style={{ color: "#c9a0e8", fontSize: 12, letterSpacing: 1.5, marginBottom: 12, textTransform: "uppercase" }}>
                Tu enfoque de hoy
              </p>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                {CATEGORIAS.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setCategoriaSeleccionada(cat.id); setAfirmacionIdx(0); }}
                    style={{
                      flexShrink: 0,
                      background: categoriaSeleccionada === cat.id
                        ? `linear-gradient(135deg, ${cat.color}, ${cat.color}aa)`
                        : "rgba(255,255,255,0.08)",
                      border: categoriaSeleccionada === cat.id
                        ? `1.5px solid ${cat.color}`
                        : "1.5px solid rgba(255,255,255,0.15)",
                      borderRadius: 20,
                      padding: "7px 14px",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: categoriaSeleccionada === cat.id ? "700" : "400",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      transition: "all 0.3s",
                      boxShadow: categoriaSeleccionada === cat.id ? `0 4px 15px ${cat.color}55` : "none",
                    }}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tarjeta de afirmación principal */}
            <div style={{ padding: "0 24px 20px" }}>
              <div
                className="card-hover"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(240,208,128,0.2)",
                  borderRadius: 24,
                  padding: "30px 24px",
                  textAlign: "center",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                  cursor: "pointer",
                }}
                onClick={cambiarAfirmacion}
              >
                <p style={{ color: "#c9a0e8", fontSize: 11, letterSpacing: 2, marginBottom: 18, textTransform: "uppercase" }}>
                  ✨ Afirmación del día
                </p>
                <div style={{
                  animation: animando ? "fadeOut 0.35s ease forwards" : "fadeInUp 0.5s ease forwards",
                }}>
                  <p style={{
                    color: "#f5f0ff",
                    fontSize: 20,
                    lineHeight: 1.65,
                    fontStyle: "italic",
                    fontWeight: "500",
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    minHeight: 90,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    "{afirmacionHoy}"
                  </p>
                </div>
                <p style={{ color: "#9070c0", fontSize: 11, marginTop: 18 }}>
                  Toca para nueva afirmación 🔄
                </p>
              </div>
            </div>

            {/* Ritual de la mañana */}
            <div style={{ padding: "0 24px 20px" }}>
              <p style={{ color: "#c9a0e8", fontSize: 12, letterSpacing: 1.5, marginBottom: 14, textTransform: "uppercase" }}>
                🌅 Ritual de la mañana
              </p>
              {RITUALES_MANANA.map((ritual, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 14,
                  padding: "12px 16px",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}>
                  <div style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #9b59b6, #6b1a9e)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f0d080",
                    fontSize: 11,
                    fontWeight: "bold",
                    flexShrink: 0,
                    marginTop: 1,
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ color: "#ddc0f5", fontSize: 13, lineHeight: 1.5 }}>{ritual}</p>
                </div>
              ))}
            </div>

            {/* Fase lunar info */}
            <div style={{ padding: "0 24px 20px" }}>
              <div style={{
                background: "linear-gradient(135deg, rgba(100,30,160,0.3), rgba(50,0,100,0.3))",
                border: "1px solid rgba(150,80,220,0.3)",
                borderRadius: 20,
                padding: "20px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 44, animation: "float 3s ease-in-out infinite" }}>
                  {faseLuna.simbolo}
                </div>
                <h3 style={{ color: "#f0d080", fontSize: 16, fontWeight: "bold", margin: "10px 0 6px" }}>
                  {faseLuna.nombre}
                </h3>
                <p style={{ color: "#c9a0e8", fontSize: 13, lineHeight: 1.6 }}>
                  {faseLuna.descripcion}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ──────── PANTALLA: AFIRMACIONES ──────── */}
        {pantalla === "afirmaciones" && (
          <div>
            <div style={{ padding: "52px 24px 24px" }}>
              <h2 style={{ color: "#f0d080", fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>
                ✨ Afirmaciones
              </h2>
              <p style={{ color: "#c9a0e8", fontSize: 13 }}>Reprograma tu mente con intención</p>
            </div>

            {/* Selector de categorías */}
            <div style={{ padding: "0 24px 20px" }}>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                {CATEGORIAS.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoriaSeleccionada(cat.id)}
                    style={{
                      flexShrink: 0,
                      background: categoriaSeleccionada === cat.id
                        ? `linear-gradient(135deg, ${cat.color}, ${cat.color}99)`
                        : "rgba(255,255,255,0.07)",
                      border: categoriaSeleccionada === cat.id
                        ? `1.5px solid ${cat.color}`
                        : "1.5px solid rgba(255,255,255,0.12)",
                      borderRadius: 20,
                      padding: "8px 16px",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: categoriaSeleccionada === cat.id ? "700" : "400",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      transition: "all 0.3s",
                    }}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista de afirmaciones */}
            <div style={{ padding: "0 24px" }}>
              {(AFIRMACIONES[categoriaSeleccionada] || []).map((afirmacion, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 18,
                    padding: "20px",
                    marginBottom: 12,
                    animation: `fadeInUp 0.4s ease ${i * 0.08}s both`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                    <p style={{ color: "#f5f0ff", fontSize: 16, lineHeight: 1.65, fontStyle: "italic", flex: 1 }}>
                      "{afirmacion}"
                    </p>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>
                      {CATEGORIAS.find(c => c.id === categoriaSeleccionada)?.emoji}
                    </span>
                  </div>
                  {/* TODO: Añadir botón de favoritos que persista la afirmación */}
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button style={{
                      background: "rgba(240,208,128,0.12)",
                      border: "1px solid rgba(240,208,128,0.2)",
                      borderRadius: 10,
                      padding: "6px 12px",
                      color: "#f0d080",
                      fontSize: 11,
                      cursor: "pointer",
                    }}>
                      💛 Guardar
                    </button>
                    <button style={{
                      background: "rgba(200,150,255,0.1)",
                      border: "1px solid rgba(200,150,255,0.2)",
                      borderRadius: 10,
                      padding: "6px 12px",
                      color: "#c9a0e8",
                      fontSize: 11,
                      cursor: "pointer",
                    }}>
                      🔁 Repetir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ──────── PANTALLA: METAS ──────── */}
        {pantalla === "metas" && (
          <div>
            <div style={{ padding: "52px 24px 24px" }}>
              <h2 style={{ color: "#f0d080", fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>
                🎯 Mis Metas
              </h2>
              <p style={{ color: "#c9a0e8", fontSize: 13 }}>Declara lo que deseas manifestar</p>
            </div>

            {/* Input nueva meta */}
            <div style={{ padding: "0 24px 20px" }}>
              <div style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(240,208,128,0.2)",
                borderRadius: 18,
                padding: "16px",
              }}>
                <p style={{ color: "#c9a0e8", fontSize: 12, marginBottom: 10, letterSpacing: 1 }}>NUEVA META</p>
                <input
                  value={nuevaMeta}
                  onChange={(e) => setNuevaMeta(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && agregarMeta()}
                  placeholder="Escribe tu intención aquí..."
                  style={{
                    ...inputStyle,
                    marginBottom: 12,
                  }}
                />
                <button onClick={agregarMeta} style={btnPrimaryStyle}>
                  + Agregar meta ✨
                </button>
              </div>
            </div>

            {/* Lista de metas */}
            <div style={{ padding: "0 24px" }}>
              {metasUsuario.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 52, marginBottom: 12 }}>🌟</div>
                  <p style={{ color: "#c9a0e8", fontSize: 15 }}>Aún no has declarado ninguna meta</p>
                  <p style={{ color: "#7050a0", fontSize: 13, marginTop: 6 }}>El universo espera tus intenciones</p>
                </div>
              ) : (
                metasUsuario.map((meta, i) => (
                  <div key={meta.id} style={{
                    background: meta.completada
                      ? "rgba(76,175,132,0.1)"
                      : "rgba(255,255,255,0.06)",
                    border: meta.completada
                      ? "1px solid rgba(76,175,132,0.3)"
                      : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16,
                    padding: "14px 16px",
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    animation: `fadeInUp 0.4s ease ${i * 0.07}s both`,
                  }}>
                    <button
                      onClick={() => toggleMeta(meta.id)}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        border: meta.completada ? "none" : "2px solid rgba(240,208,128,0.4)",
                        background: meta.completada
                          ? "linear-gradient(135deg, #4caf84, #2e7d57)"
                          : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                        color: "#fff",
                        fontSize: 14,
                      }}
                    >
                      {meta.completada ? "✓" : ""}
                    </button>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        color: meta.completada ? "#9070c0" : "#f5f0ff",
                        fontSize: 14,
                        textDecoration: meta.completada ? "line-through" : "none",
                        lineHeight: 1.4,
                      }}>
                        {meta.texto}
                      </p>
                      <p style={{ color: "#7050a0", fontSize: 11, marginTop: 3 }}>{meta.fecha}</p>
                    </div>
                    <button
                      onClick={() => eliminarMeta(meta.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#7050a0",
                        cursor: "pointer",
                        fontSize: 16,
                        padding: "4px",
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Estadísticas */}
            {metasUsuario.length > 0 && (
              <div style={{ padding: "20px 24px" }}>
                <div style={{
                  background: "rgba(240,208,128,0.08)",
                  border: "1px solid rgba(240,208,128,0.15)",
                  borderRadius: 16,
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-around",
                  textAlign: "center",
                }}>
                  <div>
                    <p style={{ color: "#f0d080", fontSize: 22, fontWeight: "bold" }}>{metasUsuario.length}</p>
                    <p style={{ color: "#c9a0e8", fontSize: 11 }}>Total</p>
                  </div>
                  <div>
                    <p style={{ color: "#4caf84", fontSize: 22, fontWeight: "bold" }}>
                      {metasUsuario.filter(m => m.completada).length}
                    </p>
                    <p style={{ color: "#c9a0e8", fontSize: 11 }}>Completadas</p>
                  </div>
                  <div>
                    <p style={{ color: "#e8a0d8", fontSize: 22, fontWeight: "bold" }}>
                      {metasUsuario.filter(m => !m.completada).length}
                    </p>
                    <p style={{ color: "#c9a0e8", fontSize: 11 }}>En progreso</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ──────── PANTALLA: DIARIO ──────── */}
        {pantalla === "diario" && (
          <div>
            <div style={{ padding: "52px 24px 24px" }}>
              <h2 style={{ color: "#f0d080", fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>
                📔 Mi Diario
              </h2>
              <p style={{ color: "#c9a0e8", fontSize: 13 }}>Escribe tus intenciones y gratitud</p>
            </div>

            {/* Input diario */}
            <div style={{ padding: "0 24px 20px" }}>
              <div style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(240,208,128,0.2)",
                borderRadius: 20,
                padding: "18px",
              }}>
                <p style={{ color: "#c9a0e8", fontSize: 12, marginBottom: 12, letterSpacing: 1 }}>
                  {new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" }).toUpperCase()}
                </p>
                <textarea
                  value={diarioTexto}
                  onChange={(e) => setDiarioTexto(e.target.value)}
                  placeholder="¿Qué deseas manifestar hoy? ¿Por qué estás agradecida? ¿Cómo te sientes?..."
                  rows={5}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    color: "#f5f0ff",
                    fontSize: 15,
                    lineHeight: 1.7,
                    resize: "none",
                    fontFamily: "'Georgia', serif",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                  <button onClick={guardarDiario} style={btnPrimaryStyle}>
                    Guardar entrada ✨
                  </button>
                </div>
              </div>
            </div>

            {/* Prompts de escritura */}
            <div style={{ padding: "0 24px 20px" }}>
              <p style={{ color: "#c9a0e8", fontSize: 12, letterSpacing: 1.5, marginBottom: 12, textTransform: "uppercase" }}>
                💫 Prompts para inspirarte
              </p>
              {[
                "¿Qué 3 cosas agradeces profundamente hoy?",
                "Describe la versión de ti que estás manifestando...",
                "¿Qué creencia limitante estás soltando hoy?",
                "¿Cómo te sentirás cuando tu deseo se haya manifestado?",
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setDiarioTexto((prev) => prev + (prev ? "\n\n" : "") + prompt + " ")}
                  style={{
                    display: "block",
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px dashed rgba(200,150,255,0.25)",
                    borderRadius: 12,
                    padding: "10px 14px",
                    color: "#c9a0e8",
                    fontSize: 13,
                    cursor: "pointer",
                    textAlign: "left",
                    marginBottom: 8,
                    lineHeight: 1.4,
                    transition: "all 0.2s",
                  }}
                >
                  ✍️ {prompt}
                </button>
              ))}
            </div>

            {/* Entradas anteriores */}
            {entradasDiario.length > 0 && (
              <div style={{ padding: "0 24px 20px" }}>
                <p style={{ color: "#c9a0e8", fontSize: 12, letterSpacing: 1.5, marginBottom: 14, textTransform: "uppercase" }}>
                  📚 Entradas anteriores
                </p>
                {entradasDiario.map((entrada, i) => (
                  <div key={entrada.id} style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    padding: "14px 16px",
                    marginBottom: 10,
                    animation: `fadeInUp 0.4s ease ${i * 0.06}s both`,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <p style={{ color: "#f0d080", fontSize: 12, fontWeight: "bold" }}>{entrada.fecha}</p>
                      <p style={{ color: "#7050a0", fontSize: 11 }}>{entrada.hora}</p>
                    </div>
                    <p style={{
                      color: "#ddc0f5",
                      fontSize: 13,
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {entrada.texto}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ──────── PANTALLA: PERFIL ──────── */}
        {pantalla === "perfil" && (
          <div>
            <div style={{ padding: "52px 24px 24px", textAlign: "center" }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #9b59b6, #f0d080)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                margin: "0 auto 14px",
                boxShadow: "0 0 25px rgba(155,89,182,0.5)",
              }}>
                👑
              </div>
              <h2 style={{ color: "#f0d080", fontSize: 22, fontWeight: "bold", marginBottom: 4 }}>
                {nombreUsuaria || "Diosa"}
              </h2>
              <p style={{ color: "#c9a0e8", fontSize: 13 }}>Manifestadora en proceso ✨</p>
            </div>

            {/* Estadísticas del perfil */}
            <div style={{ padding: "0 24px 24px" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
                marginBottom: 20,
              }}>
                {[
                  { num: racha, label: "Días de racha", icon: "🔥" },
                  { num: metasUsuario.length, label: "Metas", icon: "🎯" },
                  { num: entradasDiario.length, label: "Entradas", icon: "📔" },
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16,
                    padding: "16px 10px",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
                    <p style={{ color: "#f0d080", fontSize: 20, fontWeight: "bold" }}>{stat.num}</p>
                    <p style={{ color: "#9070c0", fontSize: 10, lineHeight: 1.3 }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mis categorías favoritas */}
            <div style={{ padding: "0 24px 20px" }}>
              <p style={{ color: "#c9a0e8", fontSize: 12, letterSpacing: 1.5, marginBottom: 14, textTransform: "uppercase" }}>
                Áreas de manifestación
              </p>
              {CATEGORIAS.map((cat) => (
                <div key={cat.id} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  padding: "12px 16px",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
                  onClick={() => { setCategoriaSeleccionada(cat.id); setPantalla("afirmaciones"); }}
                >
                  <span style={{ fontSize: 22 }}>{cat.emoji}</span>
                  <span style={{ color: "#ddc0f5", fontSize: 14, flex: 1 }}>{cat.label}</span>
                  <span style={{
                    background: `${cat.color}33`,
                    color: cat.color,
                    borderRadius: 10,
                    padding: "2px 10px",
                    fontSize: 11,
                    fontWeight: "bold",
                    border: `1px solid ${cat.color}55`,
                  }}>
                    {AFIRMACIONES[cat.id].length} afirm.
                  </span>
                </div>
              ))}
            </div>

            {/* Botón reset onboarding */}
            {/* TODO: Implementar edición de perfil completo con foto */}
            <div style={{ padding: "0 24px 30px" }}>
              <button
                onClick={() => {
                  localStorage.clear();
                  setMostrarOnboarding(true);
                  setOnboardingPaso(0);
                  setMetasUsuario([]);
                  setEntradasDiario([]);
                  setNombreUsuaria("");
                }}
                style={{
                  width: "100%",
                  background: "rgba(255,80,80,0.1)",
                  border: "1px solid rgba(255,80,80,0.25)",
                  borderRadius: 14,
                  padding: "12px",
                  color: "#ff8080",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                🔄 Reiniciar experiencia
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── BARRA DE NAVEGACIÓN INFERIOR ── */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        background: "rgba(10,0,25,0.92)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(240,208,128,0.15)",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 8px 24px",
        zIndex: 100,
      }}>
        {[
          { id: "inicio", label: "Inicio", emoji: "🌙" },
          { id: "afirmaciones", label: "Afirmar", emoji: "✨" },
          { id: "metas", label: "Metas", emoji: "🎯" },
          { id: "diario", label: "Diario", emoji: "📔" },
          { id: "perfil", label: "Perfil", emoji: "👑" },
        ].map((tab) => (
          <button
            key={tab.id}
            className="tab-btn"
            onClick={() => setPantalla(tab.id)}
            style={{
              background: "transparent",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: 10,
              transition: "all 0.2s",
            }}
          >
            <span style={{
              fontSize: 20,
              filter: pantalla === tab.id ? "brightness(1.2)" : "brightness(0.6)",
              transition: "filter 0.2s",
            }}>
              {tab.emoji}
            </span>
            <span style={{
              fontSize: 10,
              color: pantalla === tab.id ? "#f0d080" : "#604880",
              fontWeight: pantalla === tab.id ? "700" : "400",
              letterSpacing: 0.3,
              transition: "color 0.2s",
            }}>
              {tab.label}
            </span>
            {pantalla === tab.id && (
              <div style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#f0d080",
                marginTop: 1,
              }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Estilos reutilizables ──
const btnPrimaryStyle = {
  width: "100%",
  background: "linear-gradient(135deg, #7b2ff7, #9b59b6)",
  border: "none",
  borderRadius: 14,
  padding: "14px",
  color: "#fff",
  fontSize: 15,
  fontWeight: "bold",
  cursor: "pointer",
  letterSpacing: 0.5,
  boxShadow: "0 4px 20px rgba(123,47,247,0.4)",
  fontFamily: "'Georgia', serif",
};

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(240,208,128,0.2)",
  borderRadius: 12,
  padding: "12px 14px",
  color: "#f5f0ff",
  fontSize: 15,
  fontFamily: "'Georgia', serif",
};