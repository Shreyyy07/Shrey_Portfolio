import { useState } from "react";
import { PERSONAL_INFO } from "@/lib/constants";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FadeIn } from "@/hooks/use-animations";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: PERSONAL_INFO.web3forms_access_key,
          name: form.name,
          email: form.email,
          subject: form.subject || "Portfolio Contact",
          message: form.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="pointer-events-none absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn onView>
          <div className="mb-16 text-center">
            <h2 className="font-heading text-4xl font-bold">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary" />
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              I&apos;m always open to new opportunities, collaborations, or just a chat about tech!
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn onView direction="left">
            <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm text-muted-foreground">Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-muted-foreground">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">Subject</label>
                <input
                  value={form.subject}
                  onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full resize-none rounded-lg bg-input px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting || submitted}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_20px_oklch(0.82_0.15_195/30%)] disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                <Send className="h-4 w-4" />
                {submitting ? "Sending..." : submitted ? "Sent Successfully!" : "Send Message"}
              </button>
            </form>
          </FadeIn>

          <FadeIn onView direction="right">
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
                { icon: Phone, label: "Phone", value: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}` },
                { icon: MapPin, label: "Location", value: PERSONAL_INFO.location, href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="glass-card flex items-center gap-4 rounded-xl p-4 transition-all hover:shadow-[0_0_20px_oklch(0.82_0.15_195/20%)]"
                >
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  </div>
                </a>
              ))}

              <div className="pt-4">
                <p className="mb-4 text-sm font-medium text-muted-foreground">Find me on</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    {
                      href: PERSONAL_INFO.social.linkedin,
                      label: "LinkedIn",
                      handle: "shrey-joshi-1b038a249",
                      icon: (
                        <svg className="h-5 w-5 fill-current text-primary" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      ),
                    },
                    {
                      href: PERSONAL_INFO.social.github,
                      label: "GitHub",
                      handle: "Shreyyy07",
                      icon: (
                        <svg className="h-5 w-5 fill-current text-primary" viewBox="0 0 24 24">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                      ),
                    },
                    {
                      href: PERSONAL_INFO.social.instagram,
                      label: "Instagram",
                      handle: "learn.with.shrey",
                      icon: (
                        <svg className="h-5 w-5 fill-current text-primary" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                      ),
                    },
                    {
                      href: PERSONAL_INFO.social.youtube,
                      label: "YouTube",
                      handle: "@learn_with_shrey07",
                      icon: (
                        <svg className="h-5 w-5 fill-current text-primary" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      ),
                    },
                    {
                      href: PERSONAL_INFO.social.medium,
                      label: "Medium",
                      handle: "@learnwithshrey",
                      icon: (
                        <svg className="h-5 w-5 fill-current text-primary" viewBox="0 0 24 24">
                          <path d="M6.924 16.59A6.924 6.924 0 10.001 9.667a6.924 6.924 0 006.923 6.923zM18.17 16.275c1.94 0 3.513-2.96 3.513-6.608 0-3.649-1.573-6.608-3.513-6.608-1.94 0-3.513 2.96-3.513 6.608 0 3.649 1.573 6.608 3.513 6.608zM23.013 15.539c.545 0 .987-2.63.987-5.872s-.442-5.872-.987-5.872c-.545 0-.987 2.63-.987 5.872s.442 5.872.987 5.872z"/>
                        </svg>
                      ),
                    },
                    {
                      href: PERSONAL_INFO.social.leetcode,
                      label: "LeetCode",
                      handle: "shreyyy___07",
                      icon: (
                        <svg className="h-5 w-5 fill-current text-primary" viewBox="0 0 24 24">
                          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.941-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                        </svg>
                      ),
                    },
                    {
                      href: PERSONAL_INFO.social.facebook,
                      label: "Facebook",
                      handle: "shrey joshi",
                      icon: (
                        <svg className="h-5 w-5 fill-current text-primary" viewBox="0 0 24 24">
                          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103v3.328h-2.328c-2.311 0-2.587.797-2.587 2.408v1.72h3.894l-.805 3.667h-3.089v7.98h-2.411z"/>
                        </svg>
                      ),
                    },
                    {
                      href: PERSONAL_INFO.social.codolio,
                      label: "Codolio",
                      handle: "kbygUcjT",
                      icon: (
                        <svg className="h-5 w-5 fill-current text-primary" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM8.5 10l-2.5 2.5 2.5 2.5 1.414-1.414L8.328 12l1.586-1.586L8.5 10zm7 0l-1.414 1.414L15.672 12l-1.586 1.586L15.5 15l2.5-2.5-2.5-2.5zm-4.707 6.36l1.414-5.657 1.886.471-1.414 5.657-1.886-.471z"/>
                        </svg>
                      ),
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card flex items-center gap-4 rounded-xl p-4 transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_oklch(0.82_0.15_195/20%)]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        {social.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{social.label}</span>
                        <span className="text-sm font-medium text-foreground">{social.handle}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
