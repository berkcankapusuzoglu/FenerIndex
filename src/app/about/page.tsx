export const metadata = {
  title: "About",
  description:
    "About FenerIndex — the fan-powered transfer intelligence platform for Fenerbahce supporters",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">About FenerIndex</h1>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What is FenerIndex?</h2>
        <p className="text-muted-foreground leading-relaxed">
          FenerIndex is a fan-powered transfer intelligence platform built exclusively for
          Fenerbahce supporters. Every transfer window brings a flood of rumors — some
          credible, some wishful thinking, and some outright fabricated. FenerIndex gives
          the community a structured way to evaluate those rumors together, turning
          scattered opinions into clear, data-driven sentiment.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How It Works</h2>
        <p className="text-muted-foreground leading-relaxed">
          When a transfer rumor surfaces, it gets added to the <strong>Rumor Radar</strong>.
          Every fan can cast a vote — Believe, Doubt, or call it outright Cap. Once you
          vote, the community breakdown is revealed so you can see where the fanbase stands.
          Each rumor earns a credibility label ranging from LEGIT to CAP based on the
          collective vote, giving you an instant read on how seriously the community takes
          the link.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Beyond individual rumors, <strong>Hot Takes</strong> let the community weigh in on
          bigger-picture questions — should the club prioritize a striker this window? Is the
          manager making the right calls? Agree or disagree, and see whether your opinion is
          a consensus view or a hot outlier.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          Football fans are some of the most passionate, informed, and opinionated people on
          the planet — especially Fenerbahce fans. Yet fan sentiment is usually scattered
          across Twitter threads, WhatsApp groups, and forum posts that disappear within
          hours. FenerIndex exists to give that collective intelligence a permanent,
          structured home. We believe the fanbase, taken together, often has sharper
          instincts about transfers than any single journalist or pundit.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>
            <strong>Rumor Radar</strong> — Browse every active transfer link, vote on
            credibility, filter by position or status, and sort by trending or newest.
          </li>
          <li>
            <strong>Hot Takes</strong> — Weigh in on debate topics with agree/disagree
            voting and category filters.
          </li>
          <li>
            <strong>Real-time Results</strong> — Vote percentages update live so you always
            see the latest community sentiment.
          </li>
          <li>
            <strong>Share Cards</strong> — Every rumor generates a dynamic OG image you can
            share on X (Twitter) and WhatsApp to spark discussion.
          </li>
          <li>
            <strong>No Account Required</strong> — Just show up and vote. No sign-ups, no
            emails, no friction.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Disclaimer</h2>
        <p className="text-muted-foreground leading-relaxed">
          FenerIndex is an independent fan project. It is <strong>not</strong> affiliated
          with, endorsed by, or connected to Fenerbahce Spor Kulubu, the Turkish Football
          Federation, or any football governing body. The information displayed on this site
          reflects community opinion and fan sentiment — it is not transfer news, insider
          information, or official club communication. Rumor data is sourced from publicly
          available media reports and social media. Always refer to official club channels
          for confirmed transfer announcements.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Built With</h2>
        <p className="text-muted-foreground leading-relaxed">
          FenerIndex is built with Next.js, React, TypeScript, Tailwind CSS, and Supabase —
          deployed on Vercel. The project is crafted with care by fans, for fans.
        </p>
      </section>
    </main>
  );
}
