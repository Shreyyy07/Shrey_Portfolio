import { createServerFn } from "@tanstack/react-start";

export type YouTubeVideo = {
  id: string;
  title: string;
  link: string;
  published: string;
  description: string;
  thumbnail: string;
  views: number | null;
  isShort: boolean;
};

const CHANNEL_ID = "UClVl1Kv1r0CKf04Ylrrs3-Q";

function pick(xml: string, tag: string) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? m[1].trim() : "";
}
function pickAttr(xml: string, tag: string, attr: string) {
  const re = new RegExp(`<${tag}[^>]*\\b${attr}=["']([^"']+)["']`, "i");
  const m = xml.match(re);
  return m ? m[1] : "";
}
function pickAll(xml: string, tag: string) {
  const out: string[] = [];
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) out.push(m[1]);
  return out;
}

export const fetchYouTubeVideos = createServerFn({ method: "GET" }).handler(
  async (): Promise<YouTubeVideo[]> => {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { headers: { "User-Agent": "Mozilla/5.0 (PortfolioBot)" } },
    );
    if (!res.ok) throw new Error(`YouTube feed responded ${res.status}`);
    const xml = await res.text();

    return pickAll(xml, "entry").map((entry) => {
      const id = pick(entry, "yt:videoId");
      const title = pick(entry, "title");
      const link = pickAttr(entry, "link", "href") || `https://www.youtube.com/watch?v=${id}`;
      const published = pick(entry, "published");
      const description = pick(entry, "media:description");
      const thumbnail =
        pickAttr(entry, "media:thumbnail", "url") ||
        `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      const viewsStr = pickAttr(entry, "media:statistics", "views");
      const views = viewsStr ? Number(viewsStr) : null;
      const isShort = /\/shorts\//.test(link);
      return { id, title, link, published, description, thumbnail, views, isShort };
    });
  },
);
