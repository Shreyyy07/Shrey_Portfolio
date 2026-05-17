import { createServerFn } from "@tanstack/react-start";

export type MediumPost = {
  title: string;
  link: string;
  pubDate: string;
  snippet: string;
  thumbnail: string | null;
  categories: string[];
  readingMinutes: number;
};

function stripCdata(s: string) {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}
function pick(xml: string, tag: string) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? stripCdata(m[1]) : "";
}
function pickAll(xml: string, tag: string) {
  const out: string[] = [];
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) out.push(stripCdata(m[1]));
  return out;
}
function htmlToText(html: string) {
  return html
    .replace(/<figure[\s\S]*?<\/figure>/gi, " ")
    .replace(/<img[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}
function firstImage(html: string): string | null {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

export const fetchMediumPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<MediumPost[]> => {
    const res = await fetch("https://medium.com/feed/@learnwithshrey", {
      headers: { "User-Agent": "Mozilla/5.0 (PortfolioBot)" },
    });
    if (!res.ok) throw new Error(`Medium feed responded ${res.status}`);
    const xml = await res.text();

    const items = pickAll(xml, "item");
    return items.map((item) => {
      const title = pick(item, "title");
      const link = pick(item, "link");
      const pubDate = pick(item, "pubDate");
      const content = pick(item, "content:encoded") || pick(item, "description");
      const text = htmlToText(content);
      const snippet = text.slice(0, 220) + (text.length > 220 ? "…" : "");
      const words = text.split(/\s+/).length;
      const readingMinutes = Math.max(1, Math.round(words / 220));
      const categories = pickAll(item, "category").slice(0, 4);
      return {
        title,
        link,
        pubDate,
        snippet,
        thumbnail: firstImage(content),
        categories,
        readingMinutes,
      };
    });
  },
);
