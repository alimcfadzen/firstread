import wordmarkBlack from "./assets/firstread wordmark black.png";
import wordmarkWhite from "./assets/firstread wordmark white.png";

const ACCENT = "#b10125";

function Wordmark({ height = 26, theme = "light" }) {
  return <img src={theme === "dark" ? wordmarkWhite : wordmarkBlack} alt="firstread" style={{ height, width: "auto", display: "block" }} />;
}

export default function TermsPage({ navigate, theme, setTheme }) {
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
          Terms of Service
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 56px" }}>
          Updated 7 May 2025
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          <section aria-labelledby="terms-what">
            <h2 id="terms-what" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, fontWeight: 400, margin: "0 0 12px", color: "var(--text)" }}>
              What Firstread is
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>
              Firstread is an independent editorial feedback tool powered by the Anthropic API. It is not affiliated with, endorsed by, or officially connected to Anthropic PBC in any way. By using Firstread, you are using a third-party application that makes requests to Anthropic's API on your behalf.
            </p>
          </section>

          <section aria-labelledby="terms-key">
            <h2 id="terms-key" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, fontWeight: 400, margin: "0 0 12px", color: "var(--text)" }}>
              Your API key and usage
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>
              You use your own Anthropic API key. All API usage — including associated costs — is your responsibility and is governed by{" "}
              <a href="https://www.anthropic.com/legal/consumer-terms" target="_blank" rel="noreferrer" style={{ color: ACCENT }}>Anthropic's terms of service</a>. Firstread has no visibility into or control over your API usage or billing. You are solely responsible for managing your API key, your spending limits, and your compliance with Anthropic's policies.
            </p>
          </section>

          <section aria-labelledby="terms-guarantees">
            <h2 id="terms-guarantees" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, fontWeight: 400, margin: "0 0 12px", color: "var(--text)" }}>
              No guarantees
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>
              Firstread is provided as-is with no guarantee of uptime, accuracy, or fitness for any particular purpose. Feedback is generated by an AI model and should be treated as editorial perspective, not authoritative judgement. We make no warranties, express or implied, about the quality, reliability, or suitability of the feedback provided.
            </p>
          </section>

          <section aria-labelledby="terms-content">
            <h2 id="terms-content" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, fontWeight: 400, margin: "0 0 12px", color: "var(--text)" }}>
              Your content
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>
              You retain full ownership of all writing you submit to Firstread. Firstread does not store, access, or use your writing in any way. Your writing is transmitted directly from your browser to Anthropic's API, and Firstread is not a party to that exchange.
            </p>
          </section>

          <section aria-labelledby="terms-changes">
            <h2 id="terms-changes" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, fontWeight: 400, margin: "0 0 12px", color: "var(--text)" }}>
              Changes
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>
              These terms may be updated from time to time. When they are, the date at the top of this page will change. Continued use of Firstread after any update constitutes acceptance of the revised terms.
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
