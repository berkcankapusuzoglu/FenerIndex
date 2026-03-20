import type { Rumor } from "@/lib/supabase/types";

export const DEMO_RUMORS: Rumor[] = [
  {
    id: "demo-1",
    title: "Arda Guler Loan Return Talks Intensify",
    description:
      "Real Madrid are reportedly open to loaning Arda Guler back to Fenerbahce for the 2026-27 season. The Turkish prodigy has barely featured since January and Mourinho is personally calling him weekly.",
    player_name: "Arda Guler",
    source_url: null,
    image_url: null,
    category: "transfer",
    status: "active",
    believe_count: 2341,
    cap_count: 187,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-2",
    title: "Victor Osimhen Summer Deal Almost Done",
    description:
      "With Osimhen's Galatasaray loan ending in June, Fenerbahce have reportedly agreed personal terms with the Nigerian striker. Board sources say the Napoli transfer fee is the only remaining hurdle.",
    player_name: "Victor Osimhen",
    source_url: null,
    image_url: null,
    category: "transfer",
    status: "active",
    believe_count: 1876,
    cap_count: 923,
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-3",
    title: "Mourinho Demands \u20ac50M Transfer War Chest",
    description:
      "Jose Mourinho has reportedly told the board he needs at least \u20ac50M in summer transfer funds or he will consider his position. Tensions are rising between the Special One and club president Ali Koc.",
    player_name: null,
    source_url: null,
    image_url: null,
    category: "manager",
    status: "active",
    believe_count: 1102,
    cap_count: 445,
    created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-4",
    title: "Fenerbahce Targeting Leandro Trossard",
    description:
      "Arsenal winger Leandro Trossard has fallen out of Arteta's plans and Fenerbahce are circling. Turkish media claim an initial loan inquiry has been made for the Belgian international.",
    player_name: "Leandro Trossard",
    source_url: null,
    image_url: null,
    category: "transfer",
    status: "active",
    believe_count: 734,
    cap_count: 389,
    created_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-5",
    title: "Edin Dzeko Retirement Announcement Expected",
    description:
      "The 40-year-old Bosnian legend is reportedly set to announce his retirement at the end of the season. A farewell ceremony at Sukru Saracoglu is already being planned by the club.",
    player_name: "Edin Dzeko",
    source_url: null,
    image_url: null,
    category: "contract",
    status: "active",
    believe_count: 1567,
    cap_count: 98,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-6",
    title: "Dusan Tadic to Al-Nassr on Free Transfer",
    description:
      "Saudi Pro League club Al-Nassr have offered Dusan Tadic a two-year deal worth \u20ac8M per season. The Serbian playmaker's Fener contract expires in June and he hasn't signed an extension.",
    player_name: "Dusan Tadic",
    source_url: null,
    image_url: null,
    category: "contract",
    status: "active",
    believe_count: 654,
    cap_count: 312,
    created_at: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-7",
    title: "Fenerbahce Bid \u20ac25M for Ferdi Kadioglu Return",
    description:
      "Brighton full-back Ferdi Kadioglu could be heading back to Kadikoy. Fenerbahce have reportedly tabled a \u20ac25M offer and the Turkish international is said to be homesick after a difficult Premier League season.",
    player_name: "Ferdi Kadioglu",
    source_url: null,
    image_url: null,
    category: "transfer",
    status: "active",
    believe_count: 1923,
    cap_count: 267,
    created_at: new Date(Date.now() - 42 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-8",
    title: "Cengiz Under Signs Pre-Contract with Fener",
    description:
      "Former Roma and Leicester winger Cengiz Under has reportedly signed a pre-contract agreement with Fenerbahce. The 28-year-old Turkish international is a free agent after leaving Marseille.",
    player_name: "Cengiz Under",
    source_url: null,
    image_url: null,
    category: "transfer",
    status: "active",
    believe_count: 412,
    cap_count: 156,
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-9",
    title: "Fred Out 6 Weeks with Knee Injury",
    description:
      "Midfielder Fred suffered a lateral knee ligament sprain during Wednesday's training session. Medical staff confirm he will miss at least 6 weeks, ruling him out of the title run-in.",
    player_name: "Fred",
    source_url: null,
    image_url: null,
    category: "injury",
    status: "active",
    believe_count: 876,
    cap_count: 134,
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-10",
    title: "Fenerbahce Scouting RB Leipzig's Xavi Simons",
    description:
      "Fenerbahce scouts have reportedly watched Xavi Simons in his last three Bundesliga matches. A summer move would cost north of \u20ac80M, making this one a serious long shot.",
    player_name: "Xavi Simons",
    source_url: null,
    image_url: null,
    category: "transfer",
    status: "active",
    believe_count: 67,
    cap_count: 1845,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function isDemoMode(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return !url || url.includes("placeholder") || url.startsWith("<");
}
