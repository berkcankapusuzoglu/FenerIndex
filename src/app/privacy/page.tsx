export const metadata = {
  title: "Privacy Policy",
  description: "FenerIndex privacy policy — how we handle your data",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">Last updated: March 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What We Collect</h2>
        <p className="text-muted-foreground leading-relaxed">
          FenerIndex is designed to be used without creating an account. We do not collect
          personal information such as names, email addresses, or phone numbers. The only
          data we store is anonymous voting data — which rumors you voted on and how you
          voted — tied to a randomly generated anonymous identifier stored in a cookie.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Cookies</h2>
        <p className="text-muted-foreground leading-relaxed">
          We use the following cookies:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>
            <strong>fener_uid</strong> — A randomly generated anonymous identifier used to
            track your votes and prevent duplicate voting. This cookie contains no personal
            information.
          </li>
          <li>
            <strong>fener_admin_session</strong> — Used only for admin panel authentication.
            Regular users will never have this cookie.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Advertising &amp; Google AdSense</h2>
        <p className="text-muted-foreground leading-relaxed">
          We may display ads served by Google AdSense. Google uses cookies (including the
          DoubleClick cookie) to serve ads based on your prior visits to this and other
          websites. You can opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Google Ads Settings
          </a>
          . For more information on how Google uses data, see{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Google&apos;s Privacy &amp; Terms
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Third-Party Services</h2>
        <p className="text-muted-foreground leading-relaxed">
          FenerIndex uses the following third-party services:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>
            <strong>Supabase</strong> — Database hosting for rumors, votes, and hot takes.
            Data is stored securely with row-level security policies.
          </li>
          <li>
            <strong>Vercel</strong> — Hosting and analytics. Vercel may collect standard
            web analytics data such as page views and performance metrics.
          </li>
          <li>
            <strong>Google AdSense</strong> — Ad serving. See the Advertising section above.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">No Personal Data Collection</h2>
        <p className="text-muted-foreground leading-relaxed">
          We do not require registration or login. We do not collect your name, email,
          location, or any other personally identifiable information. All votes are
          anonymous.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Your Rights (GDPR &amp; CCPA)</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you are located in the European Union or California, you have the right to
          request information about what data we hold about you. Since we do not collect
          personal data, there is generally nothing to disclose. You can clear your
          anonymous voting identifier at any time by deleting the <code>fener_uid</code>{" "}
          cookie from your browser. If you have questions or requests regarding your data,
          please contact us at the address below.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Data Retention</h2>
        <p className="text-muted-foreground leading-relaxed">
          Anonymous vote data is retained indefinitely to maintain accurate community
          sentiment statistics. Since this data is not linked to any personal information,
          it cannot be used to identify individual users.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Changes to This Policy</h2>
        <p className="text-muted-foreground leading-relaxed">
          We may update this privacy policy from time to time. Changes will be reflected on
          this page with an updated &quot;Last updated&quot; date.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-muted-foreground leading-relaxed">
          For privacy-related questions or concerns, reach out via{" "}
          <a
            href="https://twitter.com/fenerindex"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @fenerindex on X
          </a>
          .
        </p>
      </section>
    </main>
  );
}
