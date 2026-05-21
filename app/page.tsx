export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          className="fade-up"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: "var(--cream)",
            lineHeight: 1,
            margin: 0,
            animationDelay: "0ms",
          }}
        >
          NASHPLUS
        </h1>

        <div
          className="fade-up"
          style={{
            width: "72px",
            height: "1px",
            backgroundColor: "var(--amber)",
            margin: "2.25rem auto",
            animationDelay: "180ms",
          }}
        />

        <p
          className="fade-up"
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--muted)",
            margin: 0,
            animationDelay: "320ms",
          }}
        >
          Coming soon
        </p>

        <p
          className="fade-up"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--muted)",
            letterSpacing: "0.03em",
            marginTop: "2rem",
            animationDelay: "480ms",
          }}
        >
          Ontario family law made accessible.
        </p>
      </div>
    </main>
  );
}
