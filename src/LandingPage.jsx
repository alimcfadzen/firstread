import { useState, useEffect, useRef, useCallback } from "react";

// ── Brand tokens ──────────────────────────────────────────────
const ACCENT = "#b10125";
const ACCENT_HOVER = "#8b0000";

// ── Wordmark ──────────────────────────────────────────────────
function Wordmark({ height = 28, theme = "light" }) {
  return (
    <img
      src={theme === "dark" ? "/firstread-wordmark-dark.png" : "/firstread-wordmark.png"}
      alt="firstread"
      style={{ height, width: "auto", display: "block" }}
    />
  );
}

// ── Buttons ───────────────────────────────────────────────────
function PrimaryButton({ children, onClick, style = {}, ...props }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? ACCENT_HOVER : ACCENT,
        color: "#ffffff",
        fontSize: 15,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        fontWeight: 500,
        border: `1.5px solid ${hovered ? ACCENT_HOVER : ACCENT}`,
        padding: "12px 28px",
        borderRadius: 8,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "background 0.15s, border-color 0.15s",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, style = {}, ...props }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--text)" : "transparent",
        color: hovered ? "var(--bg)" : "var(--text)",
        fontSize: 13,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        fontWeight: 500,
        border: "1.5px solid var(--text)",
        padding: "12px 28px",
        borderRadius: 8,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "background 0.15s, color 0.15s",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

// ── Carousel data ─────────────────────────────────────────────
const SLIDES = [
  {
    pill: "YA Fantasy · Balanced",
    excerpt: `The gate hadn't opened in three years, not since the night Sable watched her brother walk through it and not come back. She told herself it was the cold that made her hands shake as she pressed them flat against the iron — told herself the hum she felt wasn't the gate recognising her, wasn't it waking up after all this time. Behind her, the village was dark. Everyone who knew what the gate meant had learned to stop looking at it. Everyone except Sable, who had spent three years learning exactly the right way to be afraid of something and still not look away. She pressed harder. The iron groaned. And somewhere on the other side, something groaned back.`,
    highlight: "told herself the hum she felt wasn't the gate recognising her",
    whatWorks: `The repetition of “told herself” is doing real psychological work — it shows denial without stating it.`,
    issue: "The final two sentences accelerate too quickly. The groaning gate and the response from the other side land before the reader has fully settled into Sable's fear.",
    trythis: `Give the moment before she presses harder its own beat. A single sentence of stillness — her breath, the cold, the silence — would make the gate's response land harder.`,
  },
  {
    pill: "New Adult Contemporary · Light",
    excerpt: `The apartment was smaller than the photos. Jess stood in the doorway with two suitcases and a houseplant she'd had since sophomore year and tried to feel like this was the beginning of something rather than the end of something else. Her roommate — a girl named Priya she'd found on a Facebook group called NYC Housing No Brokers Pls — had left a Post-it on the kitchen counter that said welcome! milk is mine, everything else is fair game. Jess read it three times. She put the houseplant on the windowsill. She sat down on the floor and ate a granola bar and told herself she was fine, which was almost the same as being fine, which would have to be enough for now.`,
    highlight: "which was almost the same as being fine, which would have to be enough for now",
    whatWorks: "This closing line perfectly captures the new adult experience of performing okayness until it becomes real.",
    issue: `The Post-it note is a lovely detail but "fair game" is a slightly flat ending for it. A more specific or quirky note would tell us more about Priya.`,
    trythis: "Give Priya's note one more specific detail that hints at her personality — a small joke, an odd item listed, something that makes Jess and the reader want to know more.",
  },
  {
    pill: "Adult Thriller · Balanced",
    excerpt: `Detective Karen Reyes had interviewed over two hundred suspects in her career. She knew the tells — the micro-expressions, the careful pauses, the hands that moved too much or not enough. What she didn't know, sitting across from Daniel Marsh in interview room three, was why every instinct she had was telling her he was innocent while every piece of evidence in the file said otherwise. He hadn't asked for a lawyer. He hadn't cried. He'd simply folded his hands on the table and looked at her with the steady patience of a man who had already decided how this ended, and was waiting for her to catch up.`,
    highlight: "the steady patience of a man who had already decided how this ended, and was waiting for her to catch up",
    whatWorks: "This is an excellent closing image. It shifts power from the detective to the suspect in a single sentence and creates immediate forward momentum.",
    issue: "The list of tells in the opening sentence reads slightly textbook. It tells us Karen is experienced without showing us her expertise in action.",
    trythis: `Cut the list and open with Karen observing one specific unexpected thing about Marsh. e.g. "Daniel Marsh hadn't touched the water glass. Two hundred suspects and they all touched the water glass."`,
  },
  {
    pill: "Adult Literary Fiction · Rigorous",
    excerpt: `Martin had been sober for eleven months when he found the letter. It was tucked inside a copy of Middlemarch he hadn't opened since before the drinking got bad — since before a lot of things got bad — slipped between pages 340 and 341 as though someone had meant to mark their place and never came back to it. His own handwriting. He recognised it the way you recognise your face in an old photograph, with that slight delay, that moment of not quite claiming it. He sat down on the floor of the hallway, still in his coat, and read it twice. The person who had written it was not someone he particularly wanted to have been. The problem was he wasn't entirely sure he'd stopped being him.`,
    highlight: "He recognised it the way you recognise your face in an old photograph, with that slight delay, that moment of not quite claiming it",
    whatWorks: "This simile is precise and original — it captures dissociation from one's past self in a way that feels earned rather than clever.",
    issue: "The parenthetical asides interrupt the rhythm at a moment that should be gathering momentum. The doubling weakens rather than deepens.",
    trythis: `Cut the second parenthetical entirely. "Since before the drinking got bad" is sufficient and more resonant on its own. The reader will supply the rest.`,
  },
  {
    pill: "Adult Memoir · Rigorous",
    excerpt: `My mother kept everything. After she died we found forty years of birthday cards in a shoebox under her bed, rubber-banded by year, every one of them saved — including the ones from people she hadn't spoken to in decades, including the ones from my father, who left when I was seven and never sent another. I don't know what she was keeping them for. I don't know if she was keeping them for something or just unable to throw them away, which is a different thing entirely, though from the outside it can look exactly the same. I have the shoebox now. I haven't opened it since the day we found it. I tell myself I'm waiting for the right moment, which is what you say when you're afraid the moment will never feel right.`,
    highlight: "which is a different thing entirely, though from the outside it can look exactly the same",
    whatWorks: "This distinction — keeping things for something versus being unable to throw them away — is the intellectual and emotional core of the piece and it's placed exactly right.",
    issue: "The final two sentences risk being too on-the-nose. The reader has already understood the narrator's avoidance; stating it directly flattens what the image was doing.",
    trythis: `End on the physical fact instead. Cut "I tell myself I'm waiting for the right moment" and end with "I haven't opened it since the day we found it." Trust the image.`,
  },
];

// ── Carousel ──────────────────────────────────────────────────
// The card always uses a white/light background regardless of page theme.
// Colored labels (green, amber, burgundy) require light backgrounds for WCAG-compliant
// contrast — burgundy on dark is ~1.2:1, far below the 4.5:1 minimum.
function Carousel({ theme }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timerRef = useRef(null);
  const dark = theme === "dark";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (reduced || hovered) return;
    timerRef.current = setInterval(advance, 6000);
    return () => clearInterval(timerRef.current);
  }, [reduced, hovered, advance]);

  const slide = SLIDES[current];

  // Split excerpt around highlight
  const hi = slide.highlight;
  const idx = slide.excerpt.indexOf(hi);
  const before = idx !== -1 ? slide.excerpt.slice(0, idx) : slide.excerpt;
  const after = idx !== -1 ? slide.excerpt.slice(idx + hi.length) : "";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="region"
      aria-label="Editor demo carousel"
      style={{ width: "100%", maxWidth: 860, margin: "0 auto" }}
    >
      {/* card — always white/light for color-label legibility */}
      <div style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
        background: "#ffffff",
        boxShadow: dark ? "0 4px 32px rgba(0,0,0,0.5)" : "0 1px 4px rgba(0,0,0,0.06)",
      }}>

        {/* header row — genre label centred, dots on right */}
        <div style={{ display: "flex", alignItems: "center", padding: "10px 20px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: "#374151", textTransform: "uppercase" }}>
            {slide.pill}
          </span>
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: 6 }} role="tablist" aria-label="Carousel slides">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? 20 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: "none",
                  background: i === current ? ACCENT : "#d1d5db",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.2s, background 0.2s",
                }}
              />
            ))}
          </div>
        </div>

        {/* content panels */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {/* left — excerpt */}
          <div style={{ padding: "24px 20px", borderRight: "1px solid #e5e7eb", fontSize: 14, lineHeight: 1.8, color: "#111827" }}>
            <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280" }}>Excerpt</p>
            <p style={{ margin: 0, fontFamily: "'Inter', sans-serif" }}>
              {before}
              <mark style={{ background: "#dbeafe", borderBottom: "2px solid #93c5fd", borderRadius: 2, padding: "0 1px", color: "#111827" }}>{hi}</mark>
              {after}
            </p>
          </div>

          {/* right — feedback card */}
          <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
            {/* excerpt quote */}
            <div>
              <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280" }}>Excerpt</p>
              <p style={{ margin: 0, fontSize: 13, fontStyle: "italic", color: "#6b7280", borderLeft: "2px solid #93c5fd", paddingLeft: 8, lineHeight: 1.6 }}>
                "{hi.length > 80 ? hi.slice(0, 80) + "…" : hi}"
              </p>
            </div>
            {/* what works */}
            <div>
              <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#059669" }}>What works</p>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#111827" }}>{slide.whatWorks}</p>
            </div>
            {/* issue */}
            <div>
              <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b45309" }}>Issue</p>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#111827" }}>{slide.issue}</p>
            </div>
            {/* try this */}
            <div>
              <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1e40af" }}>Try this</p>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#374151", background: "#f9fafb", borderLeft: "2px solid #93c5fd", paddingLeft: 8, borderRadius: 2 }}>{slide.trythis}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main LandingPage ──────────────────────────────────────────
export default function LandingPage({ theme, setTheme, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const hasKey = !!localStorage.getItem("story_editor_api_key");

  // dark mode section backgrounds — lifted slightly above page black
  const darkAltBg = "#252525";  // for surface-tinted sections (How it works, Built for writers)
  const darkCardBg = "#1e1e1e"; // for card elements inside bg sections (What Firstread looks at)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleGetStarted() {
    if (hasKey) {
      navigate("app");
    } else {
      navigate("setup");
    }
  }

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  const ThemeToggle = () => (
    <button
      onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: "none",
        border: "1.5px solid var(--border)",
        borderRadius: 8,
        width: 38,
        height: 38,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "var(--text)",
        fontSize: 16,
        transition: "border-color 0.15s",
        flexShrink: 0,
      }}
    >
      {theme === "dark" ? "☀" : "☽"}
    </button>
  );

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      {/* ── Welcome back banner ── */}
      {hasKey && (
        <div role="banner" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16 }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "'Inter', sans-serif" }}>Welcome back!</span>
          <PrimaryButton onClick={() => navigate("app")} style={{ padding: "7px 18px", fontSize: 12 }}>
            Continue to editor →
          </PrimaryButton>
        </div>
      )}

      {/* ── Nav ── */}
      <nav
        aria-label="Main navigation"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: scrolled ? (theme === "dark" ? "rgba(15,15,15,0.92)" : "rgba(255,255,255,0.92)") : "var(--bg)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "1px solid var(--border)",
          transition: "background 0.2s, backdrop-filter 0.2s",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => scrollToSection("hero")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }} aria-label="Go to top">
            <Wordmark height={52} theme={theme} />
          </button>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
            <button onClick={() => scrollToSection("how-it-works")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 14, fontFamily: "inherit", padding: 0, transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = "var(--text)"} onMouseLeave={e => e.target.style.color = "var(--text-muted)"}>
              How it works
            </button>
            <button onClick={() => scrollToSection("genres")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 14, fontFamily: "inherit", padding: 0, transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = "var(--text)"} onMouseLeave={e => e.target.style.color = "var(--text-muted)"}>
              Genres
            </button>
            <ThemeToggle />
            <PrimaryButton onClick={handleGetStarted} style={{ padding: "9px 22px", fontSize: 13 }}>Get started</PrimaryButton>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="mobile-nav">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(m => !m)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{ background: "none", border: "1.5px solid var(--border)", borderRadius: 8, width: 38, height: 38, cursor: "pointer", color: "var(--text)", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {menuOpen ? "×" : "≡"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ borderTop: "1px solid var(--border)", background: "var(--bg)", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            <button onClick={() => scrollToSection("how-it-works")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", fontSize: 16, fontFamily: "inherit", textAlign: "left", padding: 0 }}>How it works</button>
            <button onClick={() => scrollToSection("genres")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", fontSize: 16, fontFamily: "inherit", textAlign: "left", padding: 0 }}>Genres</button>
            <PrimaryButton onClick={handleGetStarted} style={{ padding: "11px 0", fontSize: 14, width: "100%" }}>Get started</PrimaryButton>
          </div>
        )}
      </nav>

      {/* ── SECTION 2: Hero ── */}
      <section id="hero" aria-labelledby="hero-heading" style={{ maxWidth: 1120, margin: "0 auto", padding: "12px 24px 60px", textAlign: "center" }}>
        {/* Logo */}
        <div style={{ marginBottom: 8 }}>
          <div className="app-logo-wrap">
            <img src={theme === "dark" ? "/firstread-logo-dark.png" : "/firstread-logo.png"} alt="Firstread" className="app-logo" />
          </div>
        </div>

        {/* eyebrow label */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ margin: "0 0 14px", fontSize: 17, fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.25em", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif" }}>
            Editorial feedback for writers
          </p>
          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: 0 }} />
        </div>

        {/* headline */}
        <h1 id="hero-heading" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 400, lineHeight: 1.12, margin: "0 0 24px", color: "var(--text)", letterSpacing: "-0.02em" }}>
          Edit like an editor.<br />Write like yourself.
        </h1>

        {/* subheadline */}
        <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.65 }}>
          Firstread gives you honest, specific editorial feedback on your writing — tailored to your genre, your audience, and exactly how much you want to be challenged.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <PrimaryButton onClick={handleGetStarted}>Start your first read →</PrimaryButton>
          <SecondaryButton onClick={() => scrollToSection("how-it-works")}>How it works</SecondaryButton>
        </div>

        {/* trust line */}
        <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 56px" }}>
          Free to use · Powered by Anthropic · Your writing is never stored
        </p>

        {/* Carousel */}
        <Carousel theme={theme} />
      </section>

      {/* ── SECTION 3: How it works ── */}
      <section id="how-it-works" aria-labelledby="how-heading" style={{ background: theme === "dark" ? darkAltBg : "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px" }}>
          <h2 id="how-heading" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, textAlign: "center", margin: "0 0 56px", color: "var(--text)" }}>
            How it works
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40 }}>
            {[
              { n: "01", title: "Paste your excerpt", desc: "Paste up to a few hundred words of your story or chapter into the editor." },
              { n: "02", title: "Set your context", desc: "Choose your genre, audience, and how rigorous you want the feedback to be." },
              { n: "03", title: "Read your feedback", desc: "Get specific, actionable notes on prose, characters, and plot — with highlighted passages and suggested rewrites." },
            ].map(({ n, title, desc }) => (
              <div key={n} style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", textAlign: "center" }}>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: ACCENT, lineHeight: 1 }}>{n}</span>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "var(--text)" }}>{title}</h3>
                <p style={{ margin: 0, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Features ── */}
      <section id="features" aria-labelledby="features-heading" style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px" }}>
        <h2 id="features-heading" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, textAlign: "center", margin: "0 0 48px", color: "var(--text)" }}>
          What Firstread looks at
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {[
            { title: "Prose", desc: "Style, clarity, word choice, sentence variety, and the specific conventions of your genre." },
            { title: "Characters", desc: "Voice, consistency, motivation, and how well your characters' traits come through on the page." },
            { title: "Plot & Pacing", desc: "Structure, tension, scene rhythm, and any gaps in your worldbuilding or story logic." },
            { title: "Tailored feedback", desc: "Choose Light, Balanced, or Rigorous feedback depending on your draft stage and how much you want to be challenged." },
          ].map(({ title, desc }) => (
            <div key={title} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "28px 24px", background: theme === "dark" ? darkCardBg : "#ffffff", textAlign: "center" }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 600, color: "var(--text)" }}>{title}</h3>
              <p style={{ margin: 0, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: Genre support ── */}
      <section id="genres" aria-labelledby="genres-heading" style={{ background: theme === "dark" ? darkAltBg : "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px" }}>
          <h2 id="genres-heading" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, margin: "0 0 20px", color: "var(--text)", textAlign: "center" }}>
            Built for the way writers actually work
          </h2>
          <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 640, lineHeight: 1.65, margin: "0 auto 48px", textAlign: "center" }}>
            Firstread understands genre. Whether you're writing Epic Fantasy, Literary Fiction, True Crime, or Romantasy, the feedback is calibrated to the conventions and reader expectations of your specific genre — not generic writing advice.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 600, margin: "0 auto" }}>
            <div>
              <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", textAlign: "center" }}>Fiction</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                {["Fantasy", "Science Fiction", "Romantasy", "Dark Fantasy", "Dystopian", "Horror", "Thriller", "Mystery & Crime", "Romance", "Literary Fiction", "Historical Fiction", "Contemporary Fiction", "Magical Realism", "Solarpunk", "Biopunk"].map(g => (
                  <li key={g} style={{ fontSize: 14, color: "var(--text-muted)" }}>{g}</li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", textAlign: "center" }}>Non-Fiction</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                {["Memoir", "Personal Essay", "Literary Journalism", "Biography", "True Crime", "Investigative Journalism", "History", "Self-Help", "Popular Science", "Business & Leadership", "Health & Wellness", "Political & Social Commentary"].map(g => (
                  <li key={g} style={{ fontSize: 14, color: "var(--text-muted)" }}>{g}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Privacy ── */}
      <section id="privacy-section" aria-labelledby="privacy-heading" style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px" }}>
        <h2 id="privacy-heading" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, margin: "0 0 20px", color: "var(--text)", textAlign: "center" }}>
          Your writing stays yours
        </h2>
        <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 600, lineHeight: 1.65, margin: "0 auto 40px", textAlign: "center" }}>
          Firstread uses the Anthropic API to analyse your work. Your writing travels directly from your browser to Anthropic — we never see it, store it, or have access to it. Your API key is saved only in your own browser and is never transmitted to us.
        </p>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 24, justifyContent: "center" }}>
          {["We collect nothing", "We store nothing", "Your key never leaves your browser"].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span aria-hidden="true" style={{ color: ACCENT, fontWeight: 700, fontSize: 18 }}>✓</span>
              <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text)" }}>{item}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, textAlign: "center" }}>
          For information on how Anthropic handles data, see their{" "}
          <a href="https://www.anthropic.com/privacy" target="_blank" rel="noreferrer" style={{ color: ACCENT }}>privacy policy</a>.
        </p>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "start", gap: 24, marginBottom: 24 }}>
            <div><Wordmark height={24} theme={theme} /></div>
            <p style={{ margin: 0, fontSize: 14, color: "var(--text-muted)", textAlign: "center" }}>Built for writers who want to get better.</p>
            <div style={{ display: "flex", gap: 20, justifyContent: "flex-end", alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={() => navigate("privacy")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 13, fontFamily: "inherit", padding: 0, transition: "color 0.15s" }}
                onMouseEnter={e => e.target.style.color = "var(--text)"} onMouseLeave={e => e.target.style.color = "var(--text-muted)"}>Privacy</button>
              <button onClick={() => navigate("terms")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 13, fontFamily: "inherit", padding: 0, transition: "color 0.15s" }}
                onMouseEnter={e => e.target.style.color = "var(--text)"} onMouseLeave={e => e.target.style.color = "var(--text-muted)"}>Terms</button>
              <a href="https://www.anthropic.com" target="_blank" rel="noreferrer" style={{ color: "var(--text-muted)", fontSize: 13, textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => e.target.style.color = "var(--text)"} onMouseLeave={e => e.target.style.color = "var(--text-muted)"}>Powered by Anthropic</a>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)", textAlign: "center", borderTop: "1px solid var(--border)", paddingTop: 20 }}>
            Firstread is an independent tool and is not affiliated with Anthropic. API usage is subject to Anthropic's terms of service.
          </p>
        </div>
      </footer>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
        @media (min-width: 641px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav { display: none !important; }
        }
        footer [style*="grid-template-columns: 1fr auto 1fr"] {
          grid-template-columns: 1fr;
          text-align: left;
        }
      `}</style>
    </div>
  );
}
