import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Mic, MicOff, X } from "lucide-react";
import avatarUrl from "@/assets/voice-assistant-avatar.png";
import { useCockpit } from "@/contexts/CockpitContext";
import { PERSONAL_INFO } from "@/lib/constants";

// Minimal typings for the Web Speech API (not in lib.dom by default)
type SRType = {
  new (): {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    onresult: ((e: any) => void) | null;
    onerror: ((e: any) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
  };
};

const ROUTE_KEYWORDS: Array<{ keys: string[]; to: string; label: string }> = [
  { keys: ["home", "landing", "start", "main"], to: "/", label: "Home" },
  { keys: ["about", "bio"], to: "/about", label: "About" },
  { keys: ["skill"], to: "/skills", label: "Skills" },
  { keys: ["experience", "work", "job"], to: "/experience", label: "Experience" },
  { keys: ["project", "portfolio"], to: "/projects", label: "Projects" },
  { keys: ["achievement", "award"], to: "/achievements", label: "Achievements" },
  { keys: ["brand", "personal brand"], to: "/brand", label: "Brand" },
  { keys: ["blog", "article", "medium"], to: "/blog", label: "Blog" },
  { keys: ["video", "youtube", "reel", "short"], to: "/videos", label: "Videos" },
  { keys: ["contact", "email", "reach"], to: "/contact", label: "Contact" },
];

export function VoiceAssistant() {
  const navigate = useNavigate();
  const { togglePalette, recruiterMode, setRecruiterMode } = useCockpit();
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("Hi — tap the mic and tell me where to go.");
  const [supported, setSupported] = useState(true);
  const recRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR: SRType | undefined =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript as string;
      setTranscript(text);
      handleCommand(text);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec;
  }, []);

  const speak = useCallback((text: string) => {
    setReply(text);
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05;
    u.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }, []);

  const handleCommand = useCallback(
    (raw: string) => {
      const t = raw.toLowerCase().trim();

      // Navigation
      for (const r of ROUTE_KEYWORDS) {
        if (r.keys.some((k) => t.includes(k))) {
          speak(`Opening ${r.label}.`);
          navigate({ to: r.to });
          return;
        }
      }

      // Command palette
      if (t.includes("command") || t.includes("palette") || t.includes("search")) {
        speak("Opening command palette.");
        togglePalette();
        return;
      }

      // Resume
      if (t.includes("resume") || t.includes("cv") || t.includes("download")) {
        speak("Opening résumé.");
        window.open(PERSONAL_INFO.resume, "_blank");
        return;
      }

      // Recruiter mode
      if (t.includes("recruiter")) {
        const next = !recruiterMode;
        setRecruiterMode(next);
        speak(next ? "Recruiter mode on." : "Recruiter mode off.");
        return;
      }

      // Scroll
      if (t.includes("top")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        speak("Scrolling to top.");
        return;
      }
      if (t.includes("bottom") || t.includes("down")) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        speak("Scrolling to bottom.");
        return;
      }

      // Social
      if (t.includes("github")) {
        speak("Opening GitHub.");
        window.open(PERSONAL_INFO.social.github, "_blank");
        return;
      }
      if (t.includes("linkedin")) {
        speak("Opening LinkedIn.");
        window.open(PERSONAL_INFO.social.linkedin, "_blank");
        return;
      }

      // Help
      if (t.includes("help") || t.includes("what can you")) {
        speak(
          "I can navigate pages like about, projects, videos, or contact. I can open the command palette, download the résumé, or toggle recruiter mode.",
        );
        return;
      }

      speak("Sorry, I didn't catch a known command. Try saying 'go to projects'.");
    },
    [navigate, togglePalette, recruiterMode, setRecruiterMode, speak],
  );

  const toggleListen = () => {
    if (!recRef.current) return;
    if (listening) {
      recRef.current.stop();
      setListening(false);
    } else {
      setTranscript("");
      try {
        recRef.current.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    }
  };

  return (
    <>
      {/* Floating Avatar Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Voice assistant"
        className="fixed bottom-6 right-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 bg-background/90 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:border-foreground/40"
      >
        <img
          src={avatarUrl}
          alt="Voice assistant avatar"
          width={56}
          height={56}
          loading="lazy"
          className="h-10 w-10 object-contain"
        />
        {listening && (
          <span className="absolute inset-0 animate-ping rounded-full border border-foreground/40" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[80] w-[min(22rem,calc(100vw-3rem))] border border-foreground/15 bg-[#0d0d0d] p-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
            <div className="flex items-center gap-2.5">
              <img src={avatarUrl} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              <div>
                <div className="text-sm font-medium text-foreground">Voice Assistant</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                  {listening ? "Listening…" : "Idle"}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-foreground/50 hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            {transcript && (
              <div className="border-l-2 border-foreground/30 pl-3 text-foreground/70">
                <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">You</div>
                <div>{transcript}</div>
              </div>
            )}
            <div className="border-l-2 border-foreground/60 pl-3 text-foreground">
              <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">Assistant</div>
              <div>{reply}</div>
            </div>
          </div>

          {!supported ? (
            <p className="mt-4 text-xs text-foreground/50">
              Voice recognition isn't supported in this browser. Try Chrome or Edge.
            </p>
          ) : (
            <button
              onClick={toggleListen}
              className={`mt-4 flex w-full items-center justify-center gap-2 border px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-all ${
                listening
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/25 text-foreground hover:border-foreground/60"
              }`}
            >
              {listening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
              {listening ? "Stop" : "Tap to Speak"}
            </button>
          )}

          <div className="mt-3 text-[10px] leading-relaxed text-foreground/40">
            Try: "go to projects", "open videos", "download résumé", "scroll to top", "open command palette".
          </div>
        </div>
      )}
    </>
  );
}
