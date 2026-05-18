import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ArrowUpRight, Play, RefreshCw, Film, Eye } from "lucide-react";
import { fetchYouTubeVideos, type YouTubeVideo } from "@/lib/youtube.functions";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — learn.with.Shrey" },
      { name: "description", content: "Short-form tech videos by Shrey Joshi on YouTube — APIs, Git, DevOps, system design explained in under a minute." },
      { property: "og:title", content: "Videos — learn.with.Shrey" },
      { property: "og:description", content: "Short-form tech videos by Shrey Joshi on YouTube." },
    ],
  }),
  component: VideosPage,
});

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return d;
  }
}
function formatViews(n: number | null) {
  if (n == null) return null;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

type Filter = "all" | "shorts" | "videos";

function VideosPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  const load = useCallback(async (initial = false) => {
    if (initial) setIsLoading(true);
    setIsFetching(true);
    setIsError(false);
    try {
      const data = await fetchYouTubeVideos();
      setVideos(data);
    } catch {
      setIsError(true);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load(true);
  }, [load]);

  const filtered = useMemo(() => {
    if (filter === "shorts") return videos.filter((v) => v.isShort);
    if (filter === "videos") return videos.filter((v) => !v.isShort);
    return videos;
  }, [videos, filter]);

  const counts = useMemo(
    () => ({
      all: videos.length,
      shorts: videos.filter((v) => v.isShort).length,
      videos: videos.filter((v) => !v.isShort).length,
    }),
    [videos],
  );

  return (
    <div className="pt-24">
      <section className="relative w-full bg-background py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-foreground/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-foreground/40">
                <Film className="h-3 w-3" /> The Channel · live from YouTube
              </div>
              <h1 className="font-serif-display mt-3 text-4xl md:text-5xl">
                learn<span className="text-foreground/40">.</span>with
                <span className="text-foreground/40">.</span>
                <span className="italic">Shrey</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm text-foreground/60">
                Tech, explained in under a minute. Pulled live from{" "}
                <a
                  href="https://www.youtube.com/@learn_with_shrey07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  @learn_with_shrey07 on YouTube
                </a>
                .
              </p>
            </div>
            <button
              onClick={() => load(false)}
              disabled={isFetching}
              className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/60 transition-all hover:border-foreground/40 hover:text-foreground disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${isFetching ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* Filter */}
          {!isLoading && !isError && videos.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {(["all", "shorts", "videos"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] transition-all ${
                    filter === f
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {f} <span className="ml-1 opacity-60">({counts[f]})</span>
                </button>
              ))}
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[9/16] animate-pulse border border-foreground/10 bg-foreground/[0.03]" />
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="border border-destructive/30 bg-destructive/5 p-6 text-sm text-foreground/70">
              Couldn't load the YouTube feed right now.{" "}
              <a
                href="https://www.youtube.com/@learn_with_shrey07"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline"
              >
                Watch directly on YouTube →
              </a>
            </div>
          )}

          {/* Grid */}
          {!isLoading && !isError && filtered.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((v) => (
                <a
                  key={v.id}
                  href={v.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col overflow-hidden border border-foreground/10 bg-foreground/[0.02] transition-colors hover:bg-foreground/[0.05]"
                >
                  <div className={`relative w-full overflow-hidden bg-foreground/5 ${v.isShort ? "aspect-[9/16]" : "aspect-video"}`}>
                    <img
                      src={v.thumbnail}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors group-hover:bg-background/30">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/30 bg-background/70 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                        <Play className="h-5 w-5 translate-x-[1px] text-foreground" fill="currentColor" />
                      </div>
                    </div>
                    {v.isShort && (
                      <span className="absolute left-2 top-2 border border-foreground/20 bg-background/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-foreground/70 backdrop-blur-sm">
                        Short
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-serif-display line-clamp-2 text-base leading-snug text-foreground">
                      {v.title}
                    </h3>
                    <div className="mt-3 flex items-center justify-between border-t border-foreground/10 pt-3 text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                      <span>{formatDate(v.published)}</span>
                      <div className="flex items-center gap-3">
                        {v.views != null && (
                          <span className="inline-flex items-center gap-1">
                            <Eye className="h-3 w-3" /> {formatViews(v.views)}
                          </span>
                        )}
                        <ArrowUpRight className="h-3.5 w-3.5 text-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && videos.length === 0 && (
            <div className="border border-foreground/10 bg-foreground/[0.02] p-8 text-center text-sm text-foreground/60">
              No videos yet. Check back soon.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
