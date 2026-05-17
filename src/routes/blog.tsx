import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { ArrowUpRight, BookOpen, Clock, RefreshCw } from "lucide-react";
import { fetchMediumPosts, type MediumPost } from "@/lib/medium.functions";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — learn.with.Shrey" },
      { name: "description", content: "Long-form articles by Shrey Joshi on Medium — APIs, system design, DevOps and the why behind the how." },
      { property: "og:title", content: "Blog — learn.with.Shrey" },
      { property: "og:description", content: "Long-form articles by Shrey Joshi on Medium." },
    ],
  }),
  component: BlogPage,
});

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

function BlogPage() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const load = useCallback(async (initial = false) => {
    if (initial) setIsLoading(true);
    setIsFetching(true);
    setIsError(false);
    try {
      const data = await fetchMediumPosts();
      setPosts(data);
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

  const refetch = () => load(false);
  const [featured, ...rest] = posts;

  return (
    <div className="pt-24">
      <section className="relative w-full bg-background py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-foreground/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-foreground/40">
                <BookOpen className="h-3 w-3" /> The Blog · live from Medium
              </div>
              <h1 className="font-serif-display mt-3 text-4xl md:text-5xl">
                learn<span className="text-foreground/40">.</span>with
                <span className="text-foreground/40">.</span>
                <span className="italic">Shrey</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm text-foreground/60">
                Long-form articles. Problem first, then mental model, then code.
                Pulled live from{" "}
                <a
                  href="https://medium.com/@learnwithshrey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  @learnwithshrey on Medium
                </a>
                .
              </p>
            </div>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/60 transition-all hover:border-foreground/40 hover:text-foreground disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${isFetching ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-72 animate-pulse border border-foreground/10 bg-foreground/[0.03]" />
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="border border-destructive/30 bg-destructive/5 p-6 text-sm text-foreground/70">
              Couldn't load the Medium feed right now.{" "}
              <a
                href="https://medium.com/@learnwithshrey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline"
              >
                Read articles directly on Medium →
              </a>
            </div>
          )}

          {/* Featured + grid */}
          {!isLoading && !isError && posts.length > 0 && (
            <>
              {featured && (
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mb-6 grid gap-0 overflow-hidden border border-foreground/10 bg-foreground/[0.02] transition-colors hover:bg-foreground/[0.05] md:grid-cols-2"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-foreground/5 md:aspect-auto">
                    {featured.thumbnail ? (
                      <img
                        src={featured.thumbnail}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-foreground/20">
                        <BookOpen className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between p-7">
                    <div>
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                        <span>Featured</span>
                        <span>·</span>
                        <span>{formatDate(featured.pubDate)}</span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {featured.readingMinutes} min
                        </span>
                      </div>
                      <h2 className="font-serif-display mt-4 text-2xl leading-tight text-foreground md:text-3xl">
                        {featured.title}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-foreground/65">
                        {featured.snippet}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {featured.categories.slice(0, 3).map((c) => (
                          <span
                            key={c}
                            className="border border-foreground/10 px-2 py-0.5 font-mono text-[10px] text-foreground/55"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-foreground/70 transition-all group-hover:text-foreground">
                        Read
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </a>
              )}

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <a
                    key={post.link}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col overflow-hidden border border-foreground/10 bg-foreground/[0.02] transition-colors hover:bg-foreground/[0.05]"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-foreground/5">
                      {post.thumbnail ? (
                        <img
                          src={post.thumbnail}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-foreground/20">
                          <BookOpen className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/40">
                        <span>{formatDate(post.pubDate)}</span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.readingMinutes} min
                        </span>
                      </div>
                      <h3 className="font-serif-display mt-3 text-lg leading-snug text-foreground">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/60">
                        {post.snippet}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-3">
                        <div className="flex flex-wrap gap-1">
                          {post.categories.slice(0, 2).map((c) => (
                            <span
                              key={c}
                              className="border border-foreground/10 px-2 py-0.5 font-mono text-[10px] text-foreground/55"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}

          {/* Empty */}
          {!isLoading && !isError && posts.length === 0 && (
            <div className="border border-foreground/10 bg-foreground/[0.02] p-8 text-center text-sm text-foreground/60">
              No posts yet. Check back soon.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
