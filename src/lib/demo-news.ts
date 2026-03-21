export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  rumorId: string;
  publishedAt: string;
  readingTime: number;
  author: string;
}

export const DEMO_NEWS: NewsArticle[] = [
  {
    id: "news-1",
    slug: "arda-guler-loan-return-analysis",
    title: "Arda Guler Loan Return: Why It Makes Sense for Everyone",
    excerpt:
      "Real Madrid's Turkish prodigy has barely featured since January. We break down why a loan return to Fenerbahce could be the best move for all parties involved this summer.",
    content: `The Arda Guler situation at Real Madrid has reached a critical inflection point. The 21-year-old Turkish international, once hailed as the next great talent to emerge from Fenerbahce's academy, has made just four La Liga appearances since January 2026 — totaling a mere 87 minutes of football. For a player of his caliber, this is simply unacceptable, and all parties know it.

Jose Mourinho's weekly phone calls to Guler are not mere courtesy. The Fenerbahce manager sees in Arda the kind of creative midfielder who can unlock defenses in the Super Lig and, crucially, in the Champions League qualifiers. Fenerbahce's current attacking midfield options have been inconsistent, and Guler's ability to operate between the lines would add a dimension the squad desperately lacks.

From Real Madrid's perspective, a loan makes strategic sense. Carlo Ancelotti — or whoever occupies the dugout next season — has Jude Bellingham, Brahim Diaz, and the emerging Endrick competing for similar positions. Rather than let Guler stagnate on the bench and risk damaging a significant asset, sending him to a club where he would be the undisputed star and playing in European competition offers the ideal development pathway.

The financial structure reportedly under discussion involves Fenerbahce covering Guler's full salary (approximately €3.5M net) with a €2M loan fee. There is no option-to-buy clause, which Madrid have insisted upon — they still view Guler as part of their long-term plans. For Fenerbahce's budget, this is manageable, especially if Dusan Tadic departs and frees up wage space.

Turkish football journalist Yagiz Sabuncuoglu, who first reported the intensifying talks, claims Guler himself is receptive to the idea. The player reportedly misses Istanbul, maintains close friendships within the Fenerbahce squad, and is frustrated by his lack of playing time. His family, still based in Ankara, would also benefit from the proximity.

Fan sentiment on FenerIndex tells a compelling story: over 92% of voters believe this rumor, making it one of the most widely supported transfer stories on the platform. The emotional pull of a homecoming narrative is powerful, but the tactical logic is equally strong. Fenerbahce need a creative spark, Guler needs minutes, and Madrid need their investment protected. Sometimes in football, the deal that makes too much sense is the one that actually happens.`,
    category: "transfer",
    rumorId: "demo-1",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    readingTime: 3,
    author: "FenerIndex Editorial",
  },
  {
    id: "news-2",
    slug: "osimhen-summer-deal-breakdown",
    title: "Osimhen to Fenerbahce: Breaking Down the Summer Deal",
    excerpt:
      "Victor Osimhen's Galatasaray loan ends in June. We analyze whether Fenerbahce can realistically land the Nigerian striker and what it would take financially.",
    content: `Victor Osimhen's name has become the most electrifying word in Turkish football this season. The Nigerian striker has been devastating for Galatasaray on loan from Napoli, scoring 22 goals in all competitions, and now Fenerbahce want to pull off what would be the most audacious cross-city transfer in Super Lig history.

The personal terms are reportedly not the issue. Osimhen's representatives have held multiple meetings with Fenerbahce's sporting director, and a contract framework of approximately €6M net per season over four years has been discussed. For a 27-year-old striker of Osimhen's quality — a player who was valued at €130M just two years ago — this represents a significant commitment but one the club views as transformative.

The real obstacle is Napoli. The Italian club still holds Osimhen's registration and wants to recoup as much of their investment as possible. Their asking price has fluctuated between €50M and €65M throughout the season, though market realities suggest a deal could be struck closer to €40M. Napoli's new coach has made it clear Osimhen does not feature in his plans, weakening their negotiating position considerably.

Fenerbahce's financial model for this deal reportedly involves a creative payment structure: an initial €15M payment with the remainder spread over four installments, plus performance-based bonuses tied to Champions League qualification. Ali Koc has personally been involved in discussions with Napoli president Aurelio De Laurentiis, leveraging their existing relationship from the Tadic negotiations.

The Galatasaray factor cannot be ignored. If Osimhen were to cross the Bosphorus divide, it would be one of the most controversial transfers in Turkish football history. However, precedent exists — players have moved between Istanbul's big three before, and Osimhen has no contractual obligation to Galatasaray beyond his loan period.

Tactically, Osimhen would give Mourinho the elite number nine he has been desperate for. The Portuguese manager's system thrives with a focal point in attack — a physical, mobile striker who can press from the front and finish with lethal efficiency. Fenerbahce's current strikers have combined for just 14 league goals this season; Osimhen alone could surpass that.

FenerIndex voting shows the fanbase is split: 67% believe the deal will happen, while 33% think it is unrealistic. The skeptics point to the transfer fee as an insurmountable barrier. The believers argue that Koc's ambition and Mourinho's pulling power could make the impossible possible. Either way, this saga will define Fenerbahce's summer window.`,
    category: "transfer",
    rumorId: "demo-2",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    readingTime: 4,
    author: "FenerIndex Editorial",
  },
  {
    id: "news-3",
    slug: "mourinho-transfer-war-chest-demand",
    title: "Mourinho's €50M Ultimatum: Power Play or Genuine Frustration?",
    excerpt:
      "Reports claim Mourinho has demanded a €50M war chest or he walks. We examine the tensions between the Special One and the Fenerbahce board.",
    content: `The relationship between Jose Mourinho and Fenerbahce's board has entered turbulent waters. Multiple Turkish media outlets report that the Portuguese manager has delivered a stark message to president Ali Koc: provide at least €50M in summer transfer funds, or he will consider his position. This is classic Mourinho — but is it a calculated power play or a genuine cry of frustration?

Context matters enormously here. Mourinho arrived at Fenerbahce with grand promises of a title challenge and Champions League progression. The squad he inherited was competitive but lacked the depth and quality he demanded for his tactical system. The January window brought only one signing — a backup goalkeeper — which left Mourinho visibly frustrated in post-match press conferences.

The €50M figure is not arbitrary. Mourinho reportedly presented the board with a detailed transfer shortlist of six players, complete with projected fees and salary demands. The total came to approximately €48M, which he rounded up to €50M to account for negotiation margins. Among the reported targets are a creative midfielder, a left-back, a center-back, and crucially, a marquee striker signing.

From the board's perspective, the demand is challenging but not impossible. Fenerbahce's revenue has grown significantly under Koc's presidency, with commercial deals and European competition prize money boosting the coffers. However, Financial Fair Play regulations in Turkey — administered by the TFF — impose strict spending limits relative to revenue. The club's current capacity, according to financial analysts who follow Turkish football, sits around €35-40M for net transfer spending.

The tension between Mourinho and Koc is not unusual for either party. Mourinho has historically clashed with club hierarchies at Chelsea, Manchester United, and Tottenham over transfer budgets. Koc, meanwhile, has navigated similar disputes with previous managers. The key difference is that both men are deeply invested in the project succeeding — Mourinho's reputation needs a resurgence, and Koc faces a presidential election in 2027.

Sources close to the dressing room describe the atmosphere as "focused but anxious." Players are aware of the reported tensions and uncertainty about summer plans affects squad morale. Senior figures like Dusan Tadic and Fred have reportedly urged both parties to find common ground.

FenerIndex data shows fans are broadly on Mourinho's side — 71% believe his demands are reasonable. The feeling among the fanbase is that years of underinvestment relative to rivals Galatasaray have left Fenerbahce structurally disadvantaged. Whether Koc can bridge the gap between financial reality and Mourinho's ambitions will likely determine the club's trajectory for years to come.`,
    category: "manager",
    rumorId: "demo-3",
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    readingTime: 3,
    author: "FenerIndex Editorial",
  },
  {
    id: "news-4",
    slug: "trossard-fenerbahce-arsenal-loan",
    title: "Trossard to Fenerbahce: Can Arsenal's Outcast Reignite His Career?",
    excerpt:
      "Leandro Trossard has fallen down Arsenal's pecking order. We assess whether Fenerbahce is the right destination for the Belgian international.",
    content: `Leandro Trossard's Arsenal career appears to be winding down. The Belgian international, who was so instrumental in the Gunners' 2023-24 title challenge, has started just three Premier League matches since October and was left out of Belgium's most recent squad entirely. For a player who turns 32 next summer, the clock is ticking — and Fenerbahce are paying attention.

The initial loan inquiry, first reported by Turkish outlet Fanatik and corroborated by Belgian journalist Sacha Tavolieri, suggests Fenerbahce are testing the waters rather than making a definitive move. This is typical of the club's transfer strategy under sporting director Mario Branco, who prefers to establish contact early and gauge a player's willingness before entering formal negotiations.

Tactically, Trossard would be an excellent fit for Mourinho's system. The Portuguese manager typically deploys a 4-2-3-1 or 3-4-2-1, and Trossard's versatility — he can play across the front three and even as a wing-back — gives Mourinho the kind of tactical flexibility he prizes. His pressing numbers at Arsenal were elite, which aligns with Mourinho's increasingly intense off-the-ball demands at Fenerbahce.

The financial picture is more complex. Trossard earns approximately £120,000 per week at Arsenal, which translates to roughly €7.3M annually. Even on loan with Arsenal subsidizing a portion of his wages, Fenerbahce would likely need to cover €4-5M in salary. Add a loan fee of €2-3M, and this becomes a significant investment for a player on the wrong side of thirty.

However, the argument for Trossard goes beyond pure footballing logic. Fenerbahce need experienced European performers for their Champions League ambitions. Trossard has 189 Premier League appearances, 54 Belgian caps, and has played in multiple Champions League campaigns. That experience is invaluable in a squad that can sometimes lack composure in high-stakes European encounters.

Arsenal's willingness to negotiate is reportedly high. Mikel Arteta has moved on to younger, more dynamic options in Gabriel Martinelli's resurgence and the emergence of Ethan Nwaneri. A loan with an option to buy — potentially around €8-10M — would suit all parties.

FenerIndex sentiment is cautiously positive: 65% of voters believe the move will happen, though many express concerns about Trossard's age and wage demands in the comments. The counter-argument is compelling: Trossard at 70% is still better than most Super Lig wingers at 100%. If the finances can be structured creatively, this could be a shrewd piece of business.`,
    category: "transfer",
    rumorId: "demo-4",
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    readingTime: 4,
    author: "FenerIndex Editorial",
  },
  {
    id: "news-5",
    slug: "dzeko-retirement-farewell-ceremony",
    title: "Edin Dzeko's Fenerbahce Farewell: End of an Era",
    excerpt:
      "At 40, Edin Dzeko is reportedly set to retire. We look back at his impact and what his departure means for Fenerbahce's squad planning.",
    content: `Every great story needs a fitting ending, and Edin Dzeko's Fenerbahce chapter appears to be approaching its final page. The 40-year-old Bosnian legend, who has defied age and expectations throughout his remarkable career, is reportedly set to announce his retirement at the end of the 2025-26 season. A farewell ceremony at the Sukru Saracoglu Stadium is already being planned.

Dzeko arrived at Fenerbahce in 2023 after a storied career that took him from Teplice to Wolfsburg, Manchester City, Roma, and Inter Milan. He has scored over 300 career goals and remains Bosnia's all-time leading scorer with 68 international goals. At Fenerbahce, he contributed 19 goals across two seasons — respectable numbers for a player who was already 37 when he arrived.

The retirement makes practical sense. Dzeko's body has shown increasing signs of wear this season: he has missed seven matches through various muscle complaints, and his minutes per goal ratio has risen from 142 last season to 213 this campaign. His influence remains significant in the dressing room, where younger players like Arda Guler (during his previous stint) and the current academy graduates speak reverently about his professionalism and mentorship.

For Fenerbahce's squad planning, Dzeko's departure creates both a challenge and an opportunity. His estimated €3.2M annual salary comes off the wage bill, and his squad slot opens up. More importantly, it intensifies the need for a replacement striker — which connects directly to the Osimhen rumors and other forward targets the club has been linked with.

The planned farewell ceremony reflects Dzeko's status within the Fenerbahce community. Despite being a relatively short-term signing compared to club legends like Alex de Souza, Dzeko has earned genuine affection from the fanbase. His willingness to reduce his salary twice to stay at the club, his consistent effort despite his age, and his gracious public demeanor have all contributed to his beloved status.

Mourinho has spoken warmly about Dzeko in private, describing him as "the ultimate professional" and someone who makes coaching easier simply by being in the squad. The two share a relationship dating back to their time in Italian football and have mutual respect that transcends the typical manager-player dynamic.

FenerIndex voting overwhelmingly supports the retirement narrative — 94% believe this rumor, making it the most consensus story on the platform. The remaining 6% who voted "cap" are likely hoping rather than doubting; nobody wants to see Dzeko go, but everyone understands the time has come. His legacy at Fenerbahce is secure, and the farewell he deserves is being prepared.`,
    category: "contract",
    rumorId: "demo-5",
    publishedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    readingTime: 4,
    author: "FenerIndex Editorial",
  },
  {
    id: "news-6",
    slug: "tadic-al-nassr-free-transfer-analysis",
    title: "Tadic to Al-Nassr: Should Fenerbahce Fight to Keep Him?",
    excerpt:
      "Dusan Tadic is being courted by Al-Nassr with a lucrative offer. We analyze whether Fenerbahce should match the Saudi money or let him go.",
    content: `Dusan Tadic faces the classic late-career dilemma: one final payday in Saudi Arabia or continued competitive football in Istanbul. Al-Nassr's reported two-year offer worth €8M per season dwarfs anything Fenerbahce can realistically offer, and with his contract expiring in June, the Serbian playmaker holds all the cards.

At 37, Tadic remains a remarkably effective footballer. His 11 assists in the Super Lig this season lead the club, and his ability to control the tempo of matches from the number ten position is something Fenerbahce would struggle to replace domestically. However, his goal output has declined sharply — just three league goals compared to eight last season — and his defensive pressing stats have dropped by nearly 30%.

The financial gap is the central issue. Fenerbahce's reported contract offer stands at approximately €3.5M per season, less than half of Al-Nassr's proposal. For a player at Tadic's age, the Saudi option represents potentially the last major contract of his career and financial security for his family that European football simply cannot match.

From Fenerbahce's tactical perspective, losing Tadic would necessitate a significant restructuring of the creative department. Mourinho has built much of his attacking play around Tadic's vision and set-piece delivery. The Serbian takes all corners and free-kicks, and his absence would leave a void in both open play and dead-ball situations that no current squad member can fill.

However, there is a pragmatic argument for letting Tadic leave gracefully. His departure would free up approximately €4M in wages — money that could be redirected toward a younger replacement with a longer shelf life. Players like Orkun Kokcu (should Benfica be willing to sell) or Hakan Calhanoglu (whose Inter Milan situation is complicated) have been mentioned as potential upgrades, though both would cost significant transfer fees.

The Al-Nassr connection adds an interesting dimension. The Saudi club, home to Cristiano Ronaldo, has the financial muscle to make offers that European clubs cannot compete with. For Tadic, the prospect of playing alongside Ronaldo and other high-profile names in a rapidly growing league may hold genuine sporting appeal beyond the financial incentive.

Fan opinion on FenerIndex is divided: 68% believe Tadic will leave, and the comment section reveals a split between those who want the club to match the offer and those who believe it is time to move on. The pragmatists outnumber the sentimentalists, but both camps acknowledge Tadic's enormous contribution to the club. However this plays out, Dusan Tadic will leave Fenerbahce with his reputation enhanced.`,
    category: "contract",
    rumorId: "demo-6",
    publishedAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    readingTime: 4,
    author: "FenerIndex Editorial",
  },
  {
    id: "news-7",
    slug: "ferdi-kadioglu-brighton-return-bid",
    title: "Ferdi Kadioglu Homecoming: Is a €25M Bid Enough?",
    excerpt:
      "Fenerbahce want Ferdi Kadioglu back from Brighton. We examine whether the reported €25M offer can get the deal done and why the player might say yes.",
    content: `The Ferdi Kadioglu story has all the ingredients of a great transfer saga: a homesick star, a club desperate for his return, and a price tag that sits right on the edge of feasibility. Fenerbahce's reported €25M bid for the Brighton full-back represents a serious statement of intent — but is it enough to convince the Premier League club to sell?

Kadioglu's time at Brighton has been mixed. After a €30M move in the summer of 2024, the Turkish international started brightly before a combination of tactical changes and a hamstring injury disrupted his momentum. Under Fabian Hurzeler's evolving system, Kadioglu has found himself competing with Pervis Estupinan and a converted Joel Veltman for the left-back position. His 18 Premier League starts this season represent a significant underutilization of his talents.

The "homesickness" narrative, while easy to dismiss as agent-driven, has substance. Kadioglu grew up in the Netherlands but built his professional identity at Fenerbahce, where he spent five formative years and became a fan favorite. His family relocated to Istanbul during that period, and close friends within the squad — particularly Fred and the Turkish contingent — have stayed in constant contact.

Brighton's valuation will be the sticking point. The club paid €30M and, as a selling club, typically looks to make a profit or at minimum recoup their investment. A €25M offer represents a loss, which Brighton's data-driven recruitment model is reluctant to accept. However, Kadioglu's declining market value — Transfermarkt now lists him at €22M, down from €28M at his peak — and his apparent desire to leave could force Brighton's hand.

Tactically, Kadioglu would solve one of Fenerbahce's most persistent problems. The left-back position has been a revolving door this season, with Mourinho trying three different players without finding a consistent solution. Kadioglu's combination of defensive reliability, attacking dynamism, and familiarity with Turkish football makes him an ideal target. He knows the league, knows the club, and would need zero adaptation time.

The financial structure could be creative. A €20M initial fee with €5M in add-ons tied to appearances and Champions League qualification might satisfy Brighton's accountants while keeping the deal within Fenerbahce's budget. Reports suggest Ali Koc is personally driving this transfer, viewing Kadioglu as a "statement signing" that signals the club's ambition.

FenerIndex sentiment is overwhelmingly positive: 88% of voters believe the return will happen. The emotional resonance of a homecoming narrative clearly influences this figure, but there are solid footballing reasons to be optimistic. Brighton need the funds, Kadioglu wants to come home, and Fenerbahce need a left-back. The pieces are aligning.`,
    category: "transfer",
    rumorId: "demo-7",
    publishedAt: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
    readingTime: 4,
    author: "FenerIndex Editorial",
  },
  {
    id: "news-8",
    slug: "cengiz-under-pre-contract-free-agent",
    title: "Cengiz Under to Fenerbahce: Low-Risk, High-Reward?",
    excerpt:
      "The former Roma winger has reportedly signed a pre-contract with Fenerbahce. We assess whether the free transfer gamble is worth taking.",
    content: `Cengiz Under's career has been a study in unfulfilled potential. The Turkish international burst onto the scene at Roma in 2017-18 with a series of spectacular goals that had Europe's elite clubs monitoring him closely. Seven years and multiple loan spells later, the 28-year-old finds himself a free agent after leaving Marseille — and Fenerbahce reportedly have a pre-contract agreement in place.

The case for Under starts with the price: free. In a market where even modest talents command eight-figure fees, signing a Turkish international with Serie A and Ligue 1 experience at zero transfer cost is inherently attractive. His reported salary of €2.5M net per season over three years is significant but manageable for Fenerbahce's wage structure.

Under's playing profile is well suited to the Super Lig. He is a traditional inverted winger — left-footed, operating primarily from the right flank, cutting inside to shoot or play through balls. His shooting technique remains exceptional; the issue has always been consistency and fitness rather than raw quality. At Marseille, when fit, he contributed seven goals and four assists in Ligue 1 — respectable numbers for a squad player.

The injury concern is the elephant in the room. Under has missed a combined 47 matches over the past three seasons through various muscle injuries, predominantly hamstring and calf problems. Fenerbahce's medical staff would need to implement a carefully managed fitness program, potentially limiting him to 25-30 appearances per season rather than expecting full availability.

From Mourinho's perspective, Under represents tactical depth rather than a starting-eleven solution. The Portuguese manager's preference for rotating his wide players to maintain intensity throughout a long season — domestic league, cup, and European competition — means having four quality options for two or three attacking positions is essential.

There is also the marketing dimension. Under remains one of Turkey's most recognizable footballing names, and his signing would generate significant commercial interest. Jersey sales, social media engagement, and sponsor activation around a Turkish international returning to the Super Lig all have tangible financial value that offsets the salary investment.

The FenerIndex community is cautiously optimistic: 73% believe the pre-contract is real, though comment sentiment is more mixed. Many fans remember Under's inconsistency and worry about another injury-prone addition. Others see the upside — at his best, Under is capable of moments of genuine brilliance that can decide tight matches. As a free transfer with modest wages, the risk-reward calculus favors taking the gamble. If Under stays fit and rediscovers his Roma form, this could be one of the signings of the summer.`,
    category: "transfer",
    rumorId: "demo-8",
    publishedAt: new Date(Date.now() - 46 * 60 * 60 * 1000).toISOString(),
    readingTime: 4,
    author: "FenerIndex Editorial",
  },
  {
    id: "news-9",
    slug: "fred-knee-injury-title-race-impact",
    title: "Fred's Knee Injury: How It Derails Fenerbahce's Title Push",
    excerpt:
      "Fred's six-week absence couldn't come at a worse time. We analyze the tactical void he leaves and Fenerbahce's options to cope without their midfield engine.",
    content: `The timing could not be worse. Fred's lateral knee ligament sprain, suffered during a routine Wednesday training session, rules the Brazilian midfielder out for at least six weeks — effectively eliminating him from the critical final stretch of the Super Lig title race. For a Fenerbahce team that has built its identity around Fred's midfield dominance, this is a body blow of the highest order.

Fred's importance to Fenerbahce cannot be overstated in pure statistical terms. He leads the squad in interceptions per match (2.4), progressive passes (8.7 per game), and distance covered (11.3km average). He is the connective tissue between defense and attack, the player who wins the ball and immediately transitions play forward. Without him, Fenerbahce lose not just a midfielder but their entire tempo-setting mechanism.

The injury itself — a Grade 2 lateral collateral ligament sprain — is serious but not catastrophic. The six-week timeline is considered optimistic by some medical professionals, who suggest eight weeks is more realistic for a full return to match fitness. This distinction matters: six weeks puts Fred's return around the penultimate matchday, while eight weeks means his season is effectively over.

Mourinho's tactical options are limited. Ismail Yuksek, the most natural replacement, offers defensive solidity but lacks Fred's progressive passing ability. A 4-3-3 with Yuksek and two more creative midfielders could work in theory but sacrifices the defensive balance Mourinho prizes. Alternatively, Mourinho could shift to a 3-5-2 to pack the midfield, though this would require dropping one of his preferred forwards.

The fixture list during Fred's absence includes three matches against top-six opposition and a potential Turkish Cup semifinal. These are exactly the kinds of high-intensity, tactically complex encounters where Fred's presence is most critical. Fenerbahce's midfield was already stretched thin after the January departure of loan player Marcel Sabitzer; losing Fred amplifies a pre-existing vulnerability.

There is a silver lining, albeit a thin one. Fred's absence could accelerate the development of 20-year-old academy product Omer Faruk Beyaz, who has impressed in limited cameos. Mourinho has historically been reluctant to trust young players in pressure situations, but necessity may force his hand — and Beyaz's technical quality is undeniable.

The FenerIndex community reacted with alarm: 87% believe the injury report, and the associated rumor thread has generated the most comments of any story this week. Fans are divided between cautious optimism ("we have the depth to cope") and outright panic ("title race is over"). The truth, as usual, lies somewhere in between. Fenerbahce can survive without Fred — but thriving without him in a title race is another matter entirely.`,
    category: "injury",
    rumorId: "demo-9",
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    readingTime: 4,
    author: "FenerIndex Editorial",
  },
  {
    id: "news-10",
    slug: "xavi-simons-scouting-report-reality-check",
    title: "Xavi Simons to Fenerbahce: Dream or Delusion?",
    excerpt:
      "Fenerbahce scouts have been watching Xavi Simons. We provide a reality check on what would be one of the most ambitious transfer pursuits in the club's history.",
    content: `Let us be honest from the outset: the chances of Xavi Simons wearing a Fenerbahce shirt next season are vanishingly small. The 23-year-old Dutch international, one of the most coveted young talents in European football, would cost upwards of €80M and commands a salary that sits comfortably beyond Fenerbahce's financial ceiling. But the scouting interest itself tells us something important about the club's ambitions and recruitment philosophy.

Fenerbahce scouts have attended Simons' last three Bundesliga matches with RB Leipzig, according to multiple reports. This is not unusual in itself — top clubs routinely send scouts to watch elite players, partly to assess their qualities and partly to monitor potential future targets should circumstances change. What makes this notable is the context: Fenerbahce rarely scout players in this price bracket, suggesting either a genuine exploratory interest or a strategic move to signal ambition.

Simons' profile is extraordinary. Since joining Leipzig on loan from Paris Saint-Germain (now a permanent deal), he has contributed 14 goals and 11 assists in the Bundesliga this season. His combination of dribbling ability, creative vision, and goal-scoring instinct from midfield positions makes him one of the most complete attacking midfielders in world football. His market value, according to most estimation models, sits between €80M and €100M.

The financial reality is stark. Even if PSG's sell-on clause and Leipzig's asking price could theoretically be negotiated down, a fee in excess of €60M would be required. Simons' salary expectations — reportedly around €10M net per season — would blow Fenerbahce's wage structure apart. This is a transfer that simply does not compute in conventional financial terms.

However, there are scenarios, however unlikely, where the impossible becomes merely improbable. If a major benefactor or corporate sponsor were to underwrite a portion of the deal — as has happened at clubs like Newcastle and PSG — the numbers could shift. Additionally, if the Super Lig's television deal improves significantly in the upcoming broadcast cycle, the financial landscape for Turkish clubs could change dramatically.

The more realistic interpretation is that Fenerbahce are building a database of elite talent, establishing scouting relationships, and positioning themselves for future opportunities. Today's €80M player might become available for €30M in two years following an injury or a club restructuring. Smart recruitment departments plan for multiple timelines simultaneously.

FenerIndex voting reflects reality: only 4% of voters believe this transfer will happen, making it the most skeptical reaction on the entire platform. The community appreciates the ambition but recognizes the gulf between aspiration and execution. Watching Xavi Simons is free. Signing him requires resources that Fenerbahce, for now, simply do not have. And that is perfectly fine — knowing what you cannot do is just as important as knowing what you can.`,
    category: "transfer",
    rumorId: "demo-10",
    publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 4,
    author: "FenerIndex Editorial",
  },
];
