import { useState } from "react";
import logoCircle from "./assets/firstread logo circle small.png";

const ACCENT = "#b10125";
const ACCENT_HOVER = "#8b0000";

export default function ApiKeySetupPage({ navigate, theme, setTheme }) {
  const [key, setKey] = useState("");
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");

  async function testAndSave() {
    if (!key.trim()) return;
    setTesting(true);
    setError("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key.trim(),
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 10, messages: [{ role: "user", content: "hi" }] }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      localStorage.setItem("story_editor_api_key", key.trim());
      navigate("app");
    } catch (e) {
      setError(e.message?.includes("401") || e.message?.includes("auth") ? "Invalid API key — please check and try again." : `Could not verify key: ${e.message}`);
    }
    setTesting(false);
  }

  const canSubmit = !testing && key.trim().length > 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 680 }}>

        {/* Logo */}
        <div style={{ marginBottom: 36 }}>
          <div className="app-logo-wrap">
            <img src={logoCircle} alt="Firstread" className="app-logo" />
          </div>
        </div>

        {/* Label */}
        <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", textAlign: "center" }}>
          One-time setup
        </p>

        {/* Heading */}
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(24px, 5vw, 34px)", fontWeight: 400, margin: "0 0 16px", textAlign: "center", lineHeight: 1.2, color: "var(--text)" }}>
          Connect your Anthropic API key
        </h1>

        {/* Subheading */}
        <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.65, margin: "0 0 12px", textAlign: "center" }}>
          Firstread runs on the Anthropic API — your writing goes directly to Anthropic and is never stored by us.
        </p>
        <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.65, margin: "0 0 36px", textAlign: "center" }}>
          Already have a key? Enter it below. Need to sign up? Follow the steps to get one in about two minutes.
        </p>

        {/* Steps box */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 10, padding: "20px 24px", marginBottom: 12, background: "var(--surface)" }}>
          <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Don't have a key yet?</p>
          <ol style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 10 }}>
            <li style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.55 }}>
              Create a free account at{" "}
              <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{ color: ACCENT }}>console.anthropic.com</a>
            </li>
            <li style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.55 }}>Click <strong>API Keys</strong> in the left sidebar</li>
            <li style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.55 }}>Click <strong>Create Key</strong>, give it a name, and copy it</li>
            <li style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.55 }}>Paste it below</li>
          </ol>
        </div>

        {/* Cost note */}
        <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 28px", lineHeight: 1.5 }}>
          New accounts receive ~$5 in free trial credits. After that, Anthropic's API is pay-as-you-go — a typical Firstread session costs less than $0.01. You can set a spending limit in your Anthropic console.
        </p>

        {/* Input */}
        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          onKeyDown={e => e.key === "Enter" && canSubmit && testAndSave()}
          placeholder="sk-ant-..."
          aria-label="Anthropic API key"
          style={{
            width: "100%",
            boxSizing: "border-box",
            fontSize: 14,
            padding: "12px 14px",
            borderRadius: 8,
            border: "1.5px solid var(--border)",
            background: "var(--bg)",
            color: "var(--text)",
            fontFamily: "ui-monospace, 'Cascadia Code', Menlo, monospace",
            marginBottom: 10,
            outline: "none",
            transition: "border-color 0.15s",
          }}
          onFocus={e => e.target.style.borderColor = ACCENT}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />

        {/* Error */}
        {error && <p role="alert" style={{ fontSize: 13, color: "#dc2626", margin: "0 0 10px" }}>{error}</p>}

        {/* Submit button */}
        <button
          onClick={testAndSave}
          disabled={!canSubmit}
          style={{
            width: "100%",
            padding: "13px 0",
            fontSize: 15,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            borderRadius: 8,
            border: `1.5px solid ${canSubmit ? ACCENT : "var(--border)"}`,
            background: canSubmit ? ACCENT : "transparent",
            color: canSubmit ? "#ffffff" : "var(--text-muted)",
            cursor: canSubmit ? "pointer" : "not-allowed",
            fontFamily: "inherit",
            transition: "background 0.15s, color 0.15s, border-color 0.15s",
            marginBottom: 20,
          }}
          onMouseEnter={e => { if (canSubmit) e.target.style.background = ACCENT_HOVER; }}
          onMouseLeave={e => { if (canSubmit) e.target.style.background = ACCENT; }}
        >
          {testing ? "Verifying..." : "Verify & continue →"}
        </button>

        {/* Back link + theme toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <button onClick={() => navigate("landing")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 14, fontFamily: "inherit", padding: 0 }}
            onMouseEnter={e => e.target.style.color = "var(--text)"} onMouseLeave={e => e.target.style.color = "var(--text-muted)"}>
            ← Back to home
          </button>
          <button
            onClick={() => setTheme && setTheme(t => t === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{ border: "1.5px solid var(--border)", borderRadius: 8, width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "none", color: "var(--text)", fontSize: 15, flexShrink: 0 }}>
            {theme === "dark" ? "☀" : "☽"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <p style={{ marginTop: 48, fontSize: 12, color: "var(--text-muted)", textAlign: "center", lineHeight: 1.6, maxWidth: 420 }}>
        Your writing is never stored by Firstread · API usage governed by{" "}
        <a href="https://www.anthropic.com/legal/consumer-terms" target="_blank" rel="noreferrer" style={{ color: "var(--text-muted)" }}>Anthropic's terms of service</a>
      </p>
    </div>
  );
}
