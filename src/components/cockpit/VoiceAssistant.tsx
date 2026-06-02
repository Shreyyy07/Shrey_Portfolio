import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Mic, MicOff, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import robAvatar from "@/assets/robo.png";
import { useCockpit } from "@/contexts/CockpitContext";
import { PERSONAL_INFO } from "@/lib/constants";

// ─── Routes ──────────────────────────────────────────────────────────────────
const ROUTES: Array<{ keys: string[]; to: string; label: string }> = [
  { keys: ["home", "landing", "start", "main page"], to: "/", label: "Home" },
  { keys: ["about", "bio"], to: "/about", label: "About" },
  { keys: ["skill", "tech stack", "technologies"], to: "/about", label: "Skills" },
  { keys: ["experience", "work", "job", "internship"], to: "/experience", label: "Experience" },
  { keys: ["project", "portfolio"], to: "/projects", label: "Projects" },
  { keys: ["certificate", "certification", "award"], to: "/about", label: "Certifications" },
  { keys: ["brand", "personal brand", "learn with shrey"], to: "/brand", label: "Brand" },
  { keys: ["video", "youtube", "reel", "short"], to: "/videos", label: "Videos" },
  { keys: ["contact", "hire", "reach", "connect"], to: "/contact", label: "Contact" },
];

// ─── Q&A ─────────────────────────────────────────────────────────────────────
const QA: Array<{ keys: string[]; answer: string }> = [
  {
    keys: ["who is shrey", "tell me about shrey", "introduce", "who is he", "about shrey"],
    answer: "Shrey Joshi is a passionate full-stack developer from Chennai, India — building AI apps, crushing LeetCode, and shipping real products!",
  },
  {
    keys: ["cgpa", "grade", "marks", "gpa"],
    answer: "Shrey holds a 9.30 CGPA at SRM Institute of Science and Technology. Pretty impressive!",
  },
  {
    keys: ["college", "university", "study", "education", "srm"],
    answer: "Shrey is pursuing Computer Science Engineering at SRM Institute of Science and Technology, Chennai.",
  },
  {
    keys: ["location", "where", "city", "based", "from"],
    answer: "Shrey is based in Chennai, Tamil Nadu, India.",
  },
  {
    keys: ["email", "contact info", "reach out"],
    answer: `You can reach Shrey at ${PERSONAL_INFO.email}. Or head to the Contact page!`,
  },
  {
    keys: ["leetcode", "competitive", "dsa", "data structure", "algorithm"],
    answer: "Shrey has solved 400 plus problems on LeetCode under the handle shreyyy___07. Absolute grind mode!",
  },
  {
    keys: ["github", "open source", "repos"],
    answer: "Shrey has 53 plus public repos on GitHub at github.com/Shreyyy07.",
  },
  {
    keys: ["lines of code", "how much code", "experience level"],
    answer: "Shrey has written over 1.25 million lines of code across 3 plus years of experience!",
  },
  {
    keys: ["vocalyst", "career connect", "tayyari", "what projects"],
    answer: "Shrey built Vocalyst — an AI communication coach, Career Connect AI — a smart recruitment platform, and Tayyari.ai — an AI learning app!",
  },
  {
    keys: ["skill", "technology", "tech", "stack", "language", "framework"],
    answer: "Shrey works with React, Next.js, TypeScript, Node.js, FastAPI, Flask, Docker, AWS, and more!",
  },
  {
    keys: ["fozzil", "apollo", "internship", "work experience"],
    answer: "Shrey interned at FOZZIL as a Full Stack Developer and at Apollo Tyres Global R&D as an Automation Engineer.",
  },
  {
    keys: ["hobby", "interest", "free time", "when not coding"],
    answer: "When not coding, Shrey grinds LeetCode, contributes to open source, and explores AI trends.",
  },
  {
    keys: ["instagram", "learn with shrey", "content", "creator", "reels"],
    answer: "Shrey runs the learn.with.Shrey Instagram channel — short-form tech reels that make complex topics simple!",
  },
];

// ─── Soft voice picker ────────────────────────────────────────────────────────
function getSoftVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const preferred = [
    "Google UK English Female",
    "Microsoft Zira - English (United States)",
    "Samantha",
    "Karen",
    "Moira",
    "Tessa",
    "Victoria",
  ];
  for (const name of preferred) {
    const v = voices.find((v) => v.name.includes(name));
    if (v) return v;
  }
  return voices.find((v) => v.name.toLowerCase().includes("female")) ?? null;
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Message = { role: "user" | "rob"; text: string };

// ─── Component ────────────────────────────────────────────────────────────────
export function VoiceAssistant() {
  const navigate = useNavigate();
  const { togglePalette, recruiterMode, setRecruiterMode } = useCockpit();

  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: "rob", text: "Hey! I'm Rob 👋  Tap the mic button below and tell me what you need!" },
  ]);

  // Keep latest values in refs so the speech callbacks never go stale
  const navigateRef = useRef(navigate);
  const togglePaletteRef = useRef(togglePalette);
  const recruiterModeRef = useRef(recruiterMode);
  const setRecruiterModeRef = useRef(setRecruiterMode);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { navigateRef.current = navigate; }, [navigate]);
  useEffect(() => { togglePaletteRef.current = togglePalette; }, [togglePalette]);
  useEffect(() => { recruiterModeRef.current = recruiterMode; }, [recruiterMode]);
  useEffect(() => { setRecruiterModeRef.current = setRecruiterMode; }, [setRecruiterMode]);

  // Check browser support once
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) setSupported(false);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // ── Speak ─────────────────────────────────────────────────────────────────
  const addRobMessage = (text: string) => {
    setMessages((p) => [...p, { role: "rob", text }]);
  };

  const speak = (text: string) => {
    addRobMessage(text);
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB";
    u.rate = 0.92;
    u.pitch = 1.45;

    // Load soft voice — voices may load async
    const trySpeak = () => {
      const v = getSoftVoice();
      if (v) u.voice = v;
      setSpeaking(true);
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      trySpeak();
    } else {
      window.speechSynthesis.addEventListener("voiceschanged", trySpeak, { once: true });
    }
  };

  // ── Command processor ──────────────────────────────────────────────────────
  const handleCommand = (raw: string) => {
    // Add user transcript to chat
    setMessages((p) => [...p, { role: "user", text: raw }]);
    const t = raw.toLowerCase().trim();

    // Navigation
    for (const r of ROUTES) {
      if (r.keys.some((k) => t.includes(k))) {
        speak(`Yes! Taking you right there — to ${r.label}!`);
        setTimeout(() => navigateRef.current({ to: r.to }), 700);
        setOpen(false);
        return;
      }
    }

    // Resume / download
    if (t.includes("resume") || t.includes("cv") || t.includes("download")) {
      speak("Downloading that for you right now!");
      setTimeout(() => window.open(PERSONAL_INFO.resume, "_blank"), 400);
      return;
    }

    // Recruiter mode
    if (t.includes("recruiter")) {
      const next = !recruiterModeRef.current;
      setRecruiterModeRef.current(next);
      speak(next ? "Yes! Recruiter mode is now on — clean view activated!" : "Got it! Recruiter mode is off.");
      return;
    }

    // Command palette
    if (t.includes("command") || t.includes("palette") || t.includes("search")) {
      speak("On it! Opening the command palette!");
      setTimeout(() => togglePaletteRef.current(), 400);
      return;
    }

    // Scroll
    if (t.includes("top") && !t.includes("laptop")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      speak("Sure! Scrolling right back to the top!");
      return;
    }
    if (t.includes("bottom") || (t.includes("scroll") && t.includes("down"))) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      speak("Of course! Scrolling all the way down!");
      return;
    }

    // Social links
    if (t.includes("github")) {
      speak("Yes! Opening Shrey's GitHub right now!");
      setTimeout(() => window.open(PERSONAL_INFO.social.github, "_blank"), 400);
      return;
    }
    if (t.includes("linkedin")) {
      speak("Sure thing! Opening Shrey's LinkedIn profile!");
      setTimeout(() => window.open(PERSONAL_INFO.social.linkedin, "_blank"), 400);
      return;
    }
    if (t.includes("leetcode")) {
      speak("Opening Shrey's LeetCode — 400 plus problems solved!");
      setTimeout(() => window.open(PERSONAL_INFO.social.leetcode, "_blank"), 400);
      return;
    }

    // Q&A
    for (const qa of QA) {
      if (qa.keys.some((k) => t.includes(k))) {
        speak(qa.answer);
        return;
      }
    }

    // Help
    if (t.includes("help") || t.includes("what can you") || t.includes("what do you do")) {
      speak("I can navigate pages, open GitHub or LinkedIn, download the résumé, answer questions about Shrey, toggle recruiter mode, and more. Just ask!");
      return;
    }

    // Greetings
    if (t.includes("hello") || t.includes("hi") || t.includes("hey") || t.includes("sup")) {
      speak("Hey there! I'm Rob, Shrey's personal assistant. How can I help you today?");
      return;
    }

    // Fallback
    speak("Hmm, I didn't quite catch that! Try saying — go to projects, download résumé, or ask me about Shrey!");
  };

  // ── Mic button ─────────────────────────────────────────────────────────────
  // Creates a FRESH recognition instance each time — most reliable approach
  const startListening = () => {
    if (typeof window === "undefined") return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => setListening(true);

    rec.onresult = (e: any) => {
      const text: string = e.results[0][0].transcript;
      setListening(false);
      handleCommand(text);
    };

    rec.onerror = (e: any) => {
      setListening(false);
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        addRobMessage("Oops! Microphone access was denied. Please allow mic permissions and try again.");
      } else if (e.error === "no-speech") {
        addRobMessage("I didn't hear anything. Tap the mic and try again!");
      }
    };

    rec.onend = () => setListening(false);

    try {
      rec.start();
    } catch {
      setListening(false);
      addRobMessage("Couldn't start the microphone. Please try again!");
    }
  };

  const stopListening = (rec: any) => {
    try { rec?.stop(); } catch {}
    setListening(false);
  };

  // Store current rec instance to allow stopping
  const currentRecRef = useRef<any>(null);

  const toggleMic = () => {
    if (listening) {
      stopListening(currentRecRef.current);
    } else {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SR) return;

      const rec = new SR();
      rec.lang = "en-US";
      rec.continuous = false;
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      currentRecRef.current = rec;

      rec.onstart = () => setListening(true);

      rec.onresult = (e: any) => {
        const text: string = e.results[0][0].transcript;
        setListening(false);
        handleCommand(text);
      };

      rec.onerror = (e: any) => {
        setListening(false);
        if (e.error === "not-allowed" || e.error === "service-not-allowed") {
          addRobMessage("Mic access denied! Please allow microphone permissions in your browser and try again.");
        } else if (e.error === "no-speech") {
          addRobMessage("I didn't hear anything — tap the mic and speak clearly!");
        }
      };

      rec.onend = () => setListening(false);

      try {
        rec.start();
      } catch {
        setListening(false);
        addRobMessage("Couldn't start the mic. Please try again!");
      }
    }
  };

  // ─── UI ────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating Rob button ──────────────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Rob voice assistant"
        className="fixed bottom-6 right-6 z-[80] flex h-16 w-16 items-center justify-center rounded-full bg-background/80 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110"
        style={{
          border: "2px solid rgba(0,217,255,0.35)",
          boxShadow: open ? "0 0 32px rgba(0,217,255,0.35)" : "0 0 16px rgba(0,217,255,0.1)",
        }}
      >
        <img src={robAvatar} alt="Rob" className="h-12 w-12 rounded-full object-cover" />

        {listening && (
          <>
            <span className="absolute inset-0 animate-ping rounded-full"
              style={{ border: "2px solid rgba(0,217,255,0.55)" }} />
            <span className="absolute -inset-2 animate-pulse rounded-full"
              style={{ border: "1px solid rgba(0,217,255,0.25)" }} />
          </>
        )}
        {speaking && (
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-background animate-pulse" />
        )}
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-widest"
          style={{ color: "rgba(0,217,255,0.5)" }}>
          Rob
        </span>
      </button>

      {/* ── Panel ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed bottom-28 right-6 z-[80] flex w-[min(22rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border shadow-2xl"
            style={{
              borderColor: "rgba(0,217,255,0.18)",
              background: "rgba(6,6,10,0.97)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 0 80px rgba(0,217,255,0.07), 0 24px 60px rgba(0,0,0,0.7)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3"
              style={{ borderColor: "rgba(0,217,255,0.1)" }}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={robAvatar} alt="Rob" className="h-9 w-9 rounded-full object-cover"
                    style={{ border: "1.5px solid rgba(0,217,255,0.45)" }} />
                  {speaking && (
                    <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-background animate-pulse" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold tracking-wide text-white">Rob</div>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: listening ? "#00d9ff" : speaking ? "#4ade80" : "rgba(255,255,255,0.3)" }}>
                    <span className={`h-1.5 w-1.5 rounded-full ${listening ? "bg-cyan-400 animate-pulse" : speaking ? "bg-emerald-400 animate-pulse" : "bg-white/20"}`} />
                    {listening ? "Listening…" : speaking ? "Speaking…" : "Ready"}
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-white/10 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat */}
            <div ref={scrollRef}
              className="flex max-h-64 flex-col gap-3 overflow-y-auto p-4"
              style={{ scrollbarWidth: "none" }}>
              {messages.map((msg, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.role === "rob" && (
                    <img src={robAvatar} alt="" className="h-6 w-6 shrink-0 rounded-full object-cover mb-0.5" />
                  )}
                  <div
                    className="max-w-[78%] text-[13px] leading-snug px-3.5 py-2"
                    style={
                      msg.role === "rob"
                        ? { background: "rgba(0,217,255,0.09)", border: "1px solid rgba(0,217,255,0.2)", color: "rgba(255,255,255,0.88)", borderRadius: "4px 18px 18px 18px" }
                        : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)", borderRadius: "18px 4px 18px 18px" }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Controls */}
            <div className="border-t p-4 space-y-3" style={{ borderColor: "rgba(0,217,255,0.1)" }}>
              {!supported ? (
                <p className="text-xs text-white/40 text-center">Voice not supported. Use Chrome or Edge.</p>
              ) : (
                <button
                  onClick={toggleMic}
                  className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300"
                  style={
                    listening
                      ? { background: "rgba(0,217,255,0.13)", border: "1.5px solid rgba(0,217,255,0.65)", color: "#00d9ff", boxShadow: "0 0 24px rgba(0,217,255,0.25)" }
                      : { background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.13)", color: "rgba(255,255,255,0.7)" }
                  }
                >
                  {listening
                    ? <><MicOff className="h-4 w-4" /> Stop</>
                    : <><Mic className="h-4 w-4" /> Tap to Speak</>
                  }
                </button>
              )}

              {/* Quick chips */}
              <div className="flex flex-wrap gap-1.5">
                {["go to projects", "download résumé", "open GitHub", "who is Shrey?"].map((hint) => (
                  <button
                    key={hint}
                    onClick={() => handleCommand(hint)}
                    className="rounded-full px-2.5 py-1 text-[10px] font-medium transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.38)" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(0,217,255,0.45)";
                      el.style.color = "#00d9ff";
                      el.style.background = "rgba(0,217,255,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(255,255,255,0.1)";
                      el.style.color = "rgba(255,255,255,0.38)";
                      el.style.background = "rgba(255,255,255,0.04)";
                    }}
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
