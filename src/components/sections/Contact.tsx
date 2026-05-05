import { useState } from "react";
import { PERSONAL_INFO } from "@/lib/constants";
import { Mail, Phone, MapPin, Send, GitBranch, ExternalLink } from "lucide-react";
import { FadeIn } from "@/hooks/use-animations";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Hi Shrey,\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
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
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_20px_oklch(0.82_0.15_195/30%)]"
              >
                <Send className="h-4 w-4" />
                {submitted ? "Sent!" : "Send Message"}
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
                <div className="flex gap-3">
                  {[
                    { href: PERSONAL_INFO.social.github, icon: GitBranch, label: "GitHub" },
                    { href: PERSONAL_INFO.social.linkedin, icon: ExternalLink, label: "LinkedIn" },
                    { href: PERSONAL_INFO.social.leetcode, icon: ExternalLink, label: "LeetCode" },
                    { href: PERSONAL_INFO.social.codolio, icon: ExternalLink, label: "Codolio" },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-muted p-3 text-muted-foreground transition-all hover:bg-primary/20 hover:text-primary hover:scale-110"
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5" />
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
