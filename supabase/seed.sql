-- ============================================================
-- FenerIndex — Production Seed Data
-- Run this after 001_initial_schema.sql and 002_tighten_rls.sql
-- ============================================================

-- Rumors (realistic Fenerbahce transfer window content)
INSERT INTO rumors (title, description, player_name, category, status, believe_count, cap_count, created_at) VALUES
('Arda Guler Loan Return Talks Intensify', 'Real Madrid are reportedly open to loaning Arda Guler back to Fenerbahce for the 2026-27 season. The Turkish prodigy has barely featured since January and Mourinho is personally calling him weekly.', 'Arda Guler', 'transfer', 'active', 2341, 187, NOW() - INTERVAL '3 hours'),
('Victor Osimhen Summer Deal Almost Done', 'With Osimhen''s Galatasaray loan ending in June, Fenerbahce have reportedly agreed personal terms with the Nigerian striker. Board sources say the Napoli transfer fee is the only remaining hurdle.', 'Victor Osimhen', 'transfer', 'active', 1876, 923, NOW() - INTERVAL '6 hours'),
('Mourinho Demands €50M Transfer War Chest', 'Jose Mourinho has reportedly told the board he needs at least €50M in summer transfer funds or he will consider his position. Tensions are rising between the Special One and club president Ali Koc.', NULL, 'manager', 'active', 1102, 445, NOW() - INTERVAL '10 hours'),
('Fenerbahce Targeting Leandro Trossard', 'Arsenal winger Leandro Trossard has fallen out of Arteta''s plans and Fenerbahce are circling. Turkish media claim an initial loan inquiry has been made for the Belgian international.', 'Leandro Trossard', 'transfer', 'active', 734, 389, NOW() - INTERVAL '18 hours'),
('Edin Dzeko Retirement Announcement Expected', 'The 40-year-old Bosnian legend is reportedly set to announce his retirement at the end of the season. A farewell ceremony at Sukru Saracoglu is already being planned by the club.', 'Edin Dzeko', 'contract', 'active', 1567, 98, NOW() - INTERVAL '24 hours'),
('Dusan Tadic to Al-Nassr on Free Transfer', 'Saudi Pro League club Al-Nassr have offered Dusan Tadic a two-year deal worth €8M per season. The Serbian playmaker''s Fener contract expires in June and he hasn''t signed an extension.', 'Dusan Tadic', 'contract', 'active', 654, 312, NOW() - INTERVAL '30 hours'),
('Fenerbahce Bid €25M for Ferdi Kadioglu Return', 'Brighton full-back Ferdi Kadioglu could be heading back to Kadikoy. Fenerbahce have reportedly tabled a €25M offer and the Turkish international is said to be homesick after a difficult Premier League season.', 'Ferdi Kadioglu', 'transfer', 'active', 1923, 267, NOW() - INTERVAL '42 hours'),
('Cengiz Under Signs Pre-Contract with Fener', 'Former Roma and Leicester winger Cengiz Under has reportedly signed a pre-contract agreement with Fenerbahce. The 28-year-old Turkish international is a free agent after leaving Marseille.', 'Cengiz Under', 'transfer', 'active', 412, 156, NOW() - INTERVAL '48 hours'),
('Fred Out 6 Weeks with Knee Injury', 'Midfielder Fred suffered a lateral knee ligament sprain during Wednesday''s training session. Medical staff confirm he will miss at least 6 weeks, ruling him out of the title run-in.', 'Fred', 'injury', 'active', 876, 134, NOW() - INTERVAL '8 hours'),
('Fenerbahce Scouting RB Leipzig''s Xavi Simons', 'Fenerbahce scouts have reportedly watched Xavi Simons in his last three Bundesliga matches. A summer move would cost north of €80M, making this one a serious long shot.', 'Xavi Simons', 'transfer', 'active', 67, 1845, NOW() - INTERVAL '7 days');

-- Hot Takes
INSERT INTO hot_takes (statement, agree_count, disagree_count, category, created_at) VALUES
('Mourinho is the best manager Fenerbahce has had in 10 years', 3412, 2876, 'manager', NOW() - INTERVAL '2 hours'),
('Fenerbahce will win the Super Lig this season', 5621, 1204, 'other', NOW() - INTERVAL '5 hours'),
('Selling Ferdi Kadioglu was the biggest mistake of the decade', 4102, 876, 'transfer', NOW() - INTERVAL '8 hours'),
('Fred is the most important player in the squad', 2987, 1543, 'other', NOW() - INTERVAL '12 hours'),
('Fenerbahce should break the bank for a world-class striker this summer', 6234, 412, 'transfer', NOW() - INTERVAL '18 hours'),
('The squad depth is good enough for Champions League football', 1876, 3201, 'other', NOW() - INTERVAL '24 hours'),
('Ali Koc should step down as president', 2654, 3987, 'other', NOW() - INTERVAL '30 hours'),
('Fenerbahce''s youth academy is finally producing real talent', 3876, 654, 'other', NOW() - INTERVAL '36 hours'),
('VAR decisions have cost Fenerbahce at least 10 points this season', 5432, 1023, 'other', NOW() - INTERVAL '48 hours'),
('Edin Dzeko deserves a statue outside Sukru Saracoglu', 4321, 789, 'contract', NOW() - INTERVAL '72 hours');
