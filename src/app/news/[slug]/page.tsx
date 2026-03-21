import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_NEWS } from "@/lib/demo-news";
import { DEMO_RUMORS } from "@/lib/demo-data";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = DEMO_NEWS.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = DEMO_NEWS.find((a) => a.slug === slug);
  if (!article) notFound();

  const relatedRumor = DEMO_RUMORS.find((r) => r.id === article.rumorId);
  const paragraphs = article.content.split("\n\n");

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/news"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        Back to news
      </Link>

      <article>
        <header className="mb-8">
          <Badge variant="secondary" className="mb-3 text-[10px] uppercase">
            {article.category}
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {article.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{article.author}</span>
            <span>·</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{article.readingTime} min read</span>
          </div>
        </header>

        <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      {relatedRumor && (
        <Card className="mt-10 border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Related Rumor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              {relatedRumor.title}
            </p>
            <Link
              href={`/rumors/${relatedRumor.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Vote on this rumor
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
