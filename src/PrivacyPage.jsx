const ACCENT = "#b10125";

function Wordmark({ height = 26, theme = "light" }) {
  return <img src={theme === "dark" ? "/firstread-wordmark-dark.png" : "/firstread-wordmark.png"} alt="firstread" style={{ height, width: "auto", display: "block" }} />;
}

export default function PrivacyPage({ navigate, theme, setTheme }) {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh", fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column" }}>

      {/* Nav bar */}
      <nav aria-label="Site navigation" style={{ borderBottom: "1px solid var(--border)", padding: "0 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => navigate("landing")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            aria-label="Go to home"
          >
            <Wordmark height={26} theme={theme} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={() => setTheme && setTheme(t => t === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              style={{ border: "1.5px solid var(--border)", borderRadius: 8, width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "none", color: "var(--text)", fontSize: 15, flexShrink: 0 }}>
              {theme === "dark" ? "☀" : "☽"}
            </button>
            <button
              onClick={() => navigate("landing")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 14, fontFamily: "inherit", padding: 0 }}
              onMouseEnter={e => e.target.style.color = "var(--text)"}
              onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
            >
              ← Back to home
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, maxWidth: 680, margin: "0 auto", padding: "64px 24px 80px", width: "100%" }}>
        <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
          Legal
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, margin: "0 0 12px", color: "var(--text)", lineHeight: 1.1 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 56px" }}>
          Updated 7 May 2025
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          <section aria-labelledby="privacy-collect">
            <h2 id="privacy-collect" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, fontWeight: 400, margin: "0 0 12px", color: "var(--text)" }}>
              What we collect
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>
              Nothing. Firstread has no database, no user accounts, and no server that receives your data. There is nothing to collect because there is no infrastructure through which your data would pass on its way to us.
            </p>
          </section>

          <section aria-labelledby="privacy-writing">
            <h2 id="privacy-writing" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, fontWeight: 400, margin: "0 0 12px", color: "var(--text)" }}>
              What happens to your writing
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>
              Your writing is sent directly from your browser to Anthropic's API. Firstread never receives, sees, or stores your writing at any point in this process. The request goes from your device to Anthropic — that is the complete chain.
            </p>
          </section>

          <section aria-labelledby="privacy-key">
            <h2 id="privacy-key" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, fontWeight: 400, margin: "0 0 12px", color: "var(--text)" }}>
              Your API key
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>
              Your Anthropic API key is stored in your browser's <code style={{ fontFamily: "var(--font-mono)", fontSize: 14, background: "var(--surface)", padding: "1px 5px", borderRadius: 4, border: "1px solid var(--border)" }}>localStorage</code> only. It is never transmitted to Firstread or any third party. The only destination for your API key is Anthropic directly, as part of the API request your browser makes on your behalf.
            </p>
          </section>

          <section aria-labelledby="privacy-third">
            <h2 id="privacy-third" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, fontWeight: 400, margin: "0 0 12px", color: "var(--text)" }}>
              Third parties
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>
              Your use of the Anthropic API is subject to Anthropic's own{" "}
              <a href="https://www.anthropic.com/privacy" target="_blank" rel="noreferrer" style={{ color: ACCENT }}>privacy policy</a>{" "}
              and terms of service. Firstread does not control or influence how Anthropic handles data. We encourage you to read Anthropic's privacy policy before using this service.
            </p>
          </section>

          <section aria-labelledby="privacy-contact">
            <h2 id="privacy-contact" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, fontWeight: 400, margin: "0 0 12px", color: "var(--text)" }}>
              Contact
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>
              If you have questions about this privacy policy, you can reach us at{" "}
              <a href="mailto:privacy@firstread.app" style={{ color: ACCENT }}>privacy@firstread.app</a>.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "start", gap: 24, marginBottom: 24 }}>
            <div>
              <button onClick={() => navigate("landing")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }} aria-label="Go to home">
                <Wordmark height={22} theme={theme} />
              </button>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "var(--text-muted)", textAlign: "center" }}>Built for writers who want to get better.</p>
            <div style={{ display: "flex", gap: 20, justifyContent: "flex-end", alignItems: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("privacy")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 13, fontFamily: "inherit", padding: 0, transition: "color 0.15s" }}
                onMouseEnter={e => e.target.style.color = "var(--text)"}
                onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
              >
                Privacy
              </button>
              <button
                onClick={() => navigate("terms")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 13, fontFamily: "inherit", padding: 0, transition: "color 0.15s" }}
                onMouseEnter={e => e.target.style.color = "var(--text)"}
                onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
              >
                Terms
              </button>
              <a
                href="https://www.anthropic.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--text-muted)", fontSize: 13, textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => e.target.style.color = "var(--text)"}
                onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
              >
                Powered by Anthropic
              </a>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)", textAlign: "center", borderTop: "1px solid var(--border)", paddingTop: 20 }}>
            Firstread is an independent tool and is not affiliated with Anthropic. API usage is subject to Anthropic's terms of service.
          </p>
        </div>
      </footer>

    </div>
  );
}
