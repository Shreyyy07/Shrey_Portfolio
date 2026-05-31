import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CockpitProvider } from "@/contexts/CockpitContext";
import { CursorSpotlight } from "@/components/cockpit/CursorSpotlight";
import { CommandPalette } from "@/components/cockpit/CommandPalette";
import { BootSequence } from "@/components/cockpit/BootSequence";
import { ThreeBackground } from "@/components/cockpit/ThreeBackground";
import { ClickBurst } from "@/components/cockpit/ClickBurst";
import { VoiceAssistant } from "@/components/cockpit/VoiceAssistant";
import { PageTransition } from "@/components/cockpit/PageTransition";
import { ScrollNavigator } from "@/components/layout/ScrollNavigator";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shrey Joshi — Full Stack Developer Portfolio" },
      { name: "description", content: "Portfolio of Shrey Joshi — Full Stack Developer, Competitive Programmer, and Open Source Contributor based in Chennai, India." },
      { name: "author", content: "Shrey Joshi" },
      { property: "og:title", content: "Shrey Joshi — Full Stack Developer Portfolio" },
      { property: "og:description", content: "Portfolio of Shrey Joshi — Full Stack Developer, Competitive Programmer, and Open Source Contributor based in Chennai, India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Shrey Joshi — Full Stack Developer Portfolio" },
      { name: "twitter:description", content: "Portfolio of Shrey Joshi — Full Stack Developer, Competitive Programmer, and Open Source Contributor based in Chennai, India." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5dda0415-1ae7-4d29-8034-17d595a3981e/id-preview-bfb120b5--ebf233ec-1ca2-4809-ac34-16356283d4f0.lovable.app-1779991829977.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5dda0415-1ae7-4d29-8034-17d595a3981e/id-preview-bfb120b5--ebf233ec-1ca2-4809-ac34-16356283d4f0.lovable.app-1779991829977.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <CockpitProvider>
      <div className="relative min-h-screen bg-background text-foreground">
        <BootSequence />
        <ThreeBackground />
        <CursorSpotlight />
        <CommandPalette />
        <ClickBurst />
        <VoiceAssistant />
        <ScrollNavigator />
        <Navbar />
        <main className="relative z-10">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </CockpitProvider>
  );
}
