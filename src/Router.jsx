import { useState, useEffect } from "react";
import LandingPage from "./LandingPage.jsx";
import ApiKeySetupPage from "./ApiKeySetupPage.jsx";
import PrivacyPage from "./PrivacyPage.jsx";
import TermsPage from "./TermsPage.jsx";
import App from "./App.jsx";

export default function Router() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("firstread_theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const [page, setPage] = useState(() => {
    const hash = window.location.hash.slice(1);
    if (hash === "app") return localStorage.getItem("story_editor_api_key") ? "app" : "landing";
    if (hash === "setup") return "setup";
    if (hash === "privacy") return "privacy";
    if (hash === "terms") return "terms";
    return "landing";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("firstread_theme", theme);
  }, [theme]);

  useEffect(() => {
    // When editor is active, add class for the max-width constraint
    if (page === "app") {
      document.getElementById("root").classList.add("editor-active");
    } else {
      document.getElementById("root").classList.remove("editor-active");
    }
  }, [page]);

  const navigate = (target) => {
    setPage(target);
    window.location.hash = target === "landing" ? "" : target;
    window.scrollTo(0, 0);
  };

  const sharedProps = { theme, setTheme, navigate };

  if (page === "app") return <App theme={theme} setTheme={setTheme} />;
  if (page === "setup") return <ApiKeySetupPage {...sharedProps} />;
  if (page === "privacy") return <PrivacyPage {...sharedProps} />;
  if (page === "terms") return <TermsPage {...sharedProps} />;
  return <LandingPage {...sharedProps} />;
}
