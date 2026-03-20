import type { Rumor } from "@/lib/supabase/types";

export const DEMO_RUMORS: Rumor[] = [
  {
    id: "demo-1",
    title: "Arda Guler Loan Return Being Discussed with Real Madrid",
    description:
      "Fenerbahce officials have reportedly opened discussions with Real Madrid about a loan move for Arda Guler. The young star has found playing time limited under Ancelotti and a return to Istanbul could reignite his career.",
    player_name: "Arda Guler",
    source_url: null,
    image_url: null,
    category: "transfer",
    status: "active",
    believe_count: 891,
    cap_count: 67,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-2",
    title: "Mourinho Eyes Reunion with Dybala at Fenerbahce",
    description:
      "Jose Mourinho reportedly wants to bring AS Roma forward Paulo Dybala to Istanbul. The Argentine's release clause of €12M is seen as a bargain by the Fenerbahce board.",
    player_name: "Paulo Dybala",
    source_url: null,
    image_url: null,
    category: "transfer",
    status: "active",
    believe_count: 567,
    cap_count: 234,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-3",
    title: "Fred Contract Extension with Improved Terms",
    description:
      "Fenerbahce is preparing a contract extension for midfielder Fred with improved salary terms, signaling long-term commitment to the former Manchester United player.",
    player_name: "Fred",
    source_url: null,
    image_url: null,
    category: "contract",
    status: "active",
    believe_count: 445,
    cap_count: 112,
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-4",
    title: "Dusan Tadic Expected to Leave at End of Season",
    description:
      "Serbian media reports that Dusan Tadic will not renew his contract and is expected to leave on a free transfer at the end of the current season.",
    player_name: "Dusan Tadic",
    source_url: null,
    image_url: null,
    category: "contract",
    status: "active",
    believe_count: 378,
    cap_count: 201,
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-5",
    title: "Victor Osimhen Set for Summer Move to Fenerbahce",
    description:
      "Multiple Italian sources claim Napoli striker Victor Osimhen has agreed personal terms with Fenerbahce. The deal reportedly worth €60M would make him the most expensive signing in Super Lig history.",
    player_name: "Victor Osimhen",
    source_url: null,
    image_url: null,
    category: "transfer",
    status: "active",
    believe_count: 342,
    cap_count: 128,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-6",
    title: "Ismail Kartal to Return as Interim Manager",
    description:
      "With mounting pressure on the coaching staff, sources within the club suggest Ismail Kartal could return as an interim solution until the end of the season.",
    player_name: null,
    source_url: null,
    image_url: null,
    category: "manager",
    status: "active",
    believe_count: 156,
    cap_count: 298,
    created_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-7",
    title: "Fenerbahce in Advanced Talks for Dominik Szoboszlai",
    description:
      "Hungarian international Dominik Szoboszlai could leave Liverpool this summer. Fenerbahce are said to be offering a loan with an obligation to buy.",
    player_name: "Dominik Szoboszlai",
    source_url: null,
    image_url: null,
    category: "transfer",
    status: "active",
    believe_count: 89,
    cap_count: 412,
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-8",
    title: "Galatasaray Reject Icardi-for-Dzeko Swap Proposal",
    description:
      "A wild rumor suggests Fenerbahce proposed a swap deal involving Edin Dzeko for Mauro Icardi. Galatasaray reportedly rejected the offer immediately.",
    player_name: "Edin Dzeko",
    source_url: null,
    image_url: null,
    category: "transfer",
    status: "active",
    believe_count: 34,
    cap_count: 567,
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
];

export function isDemoMode(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return !url || url.includes("placeholder") || url.startsWith("<");
}
