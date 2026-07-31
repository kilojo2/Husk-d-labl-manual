export const metadata = {
  title: "Технические работы — Husk'd Labl Manuals",
  robots: "noindex, nofollow",
};

export default function MaintenancePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0a0f, #1a1a2e, #0a0a0f)",
        padding: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "480px" }}>
        {/* Большой грустный смайлик */}
        <div
          style={{
            fontSize: "clamp(80px, 20vw, 160px)",
            lineHeight: 1,
            marginBottom: "24px",
            filter: "drop-shadow(0 0 40px rgba(99, 102, 241, 0.3))",
          }}
        >
          😔
        </div>

        {/* Заголовок */}
        <h1
          style={{
            fontSize: "clamp(24px, 5vw, 36px)",
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 0 12px",
            letterSpacing: "-0.02em",
          }}
        >
          Технические работы
        </h1>

        {/* Описание */}
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.6,
            margin: "0 0 32px",
          }}
        >
          Сайт временно недоступен. Мы проводим технические работы.
          <br />
          Скоро всё заработает.
        </p>

        {/* Декоративная точка */}
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.3)",
            margin: "0 auto",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
          }
        `}</style>
      </div>
    </div>
  );
}