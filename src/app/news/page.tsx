import Link from "next/link";
import { DEMO_NEWS } from "@/lib/demo-news";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "News & Analysis",
  description:
    "In-depth Fenerbahce transfer analysis, tactical breakdowns, and rumor verdicts from the FenerIndex editorial team.",
};

export default function NewsPage() {
  const articles = DEMO_NEWS;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          News &amp; <span className="text-primary">Analysis</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          In-depth breakdowns of every Fenerbahce rumor. Real journalism, not
          clickbait.
        </p>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <Link key={article.id} href={`/news/${article.slug}`}>
            <Card className="transition-colors hover:border-primary/40">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-[10px] uppercase">
                    {article.category}
                  </Badge>
                  <span>{article.readingTime} min read</span>
                  <span>·</span>
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <CardTitle className="text-lg leading-snug">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.excerpt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
