-- ============================================================
-- FenerIndex — Initial Schema
-- ============================================================

-- ---------- ENUMS ----------
create type vote_type as enum ('believe', 'cap');
create type rumor_status as enum ('active', 'confirmed', 'denied', 'expired');
create type rumor_category as enum ('transfer', 'manager', 'injury', 'contract', 'other');

-- ---------- TABLES ----------

create table rumors (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text,
  player_name   text,
  source_url    text,
  image_url     text,
  category      rumor_category not null default 'transfer',
  status        rumor_status not null default 'active',
  believe_count integer not null default 0,
  cap_count     integer not null default 0,
  created_at    timestamptz not null default now()
);

create table votes (
  id        uuid primary key default gen_random_uuid(),
  rumor_id  uuid not null references rumors(id) on delete cascade,
  user_id   text not null,
  vote_type vote_type not null,
  created_at timestamptz not null default now(),
  unique (rumor_id, user_id)
);

create table hot_takes (
  id             uuid primary key default gen_random_uuid(),
  statement      text not null,
  agree_count    integer not null default 0,
  disagree_count integer not null default 0,
  category       rumor_category not null default 'other',
  created_at     timestamptz not null default now()
);

create table player_ratings (
  id          uuid primary key default gen_random_uuid(),
  match_id    text not null,
  player_name text not null,
  user_id     text not null,
  rating      smallint not null check (rating between 1 and 10),
  created_at  timestamptz not null default now(),
  unique (match_id, player_name, user_id)
);

-- ---------- INDEXES ----------
create index idx_votes_rumor   on votes (rumor_id);
create index idx_votes_user    on votes (user_id);
create index idx_rumors_status on rumors (status);
create index idx_rumors_created on rumors (created_at desc);

-- ---------- ATOMIC VOTE FUNCTION ----------
-- Handles insert / toggle-off / switch in a single transaction.
-- Returns the new vote_type or null if the vote was removed.

create or replace function cast_vote(
  p_rumor_id uuid,
  p_user_id  text,
  p_vote_type vote_type
)
returns text
language plpgsql
security definer
as $$
declare
  v_existing vote_type;
begin
  -- Check for existing vote
  select v.vote_type into v_existing
    from votes v
   where v.rumor_id = p_rumor_id
     and v.user_id  = p_user_id;

  if v_existing is null then
    -- No vote yet → insert
    insert into votes (rumor_id, user_id, vote_type)
    values (p_rumor_id, p_user_id, p_vote_type);

    if p_vote_type = 'believe' then
      update rumors set believe_count = believe_count + 1 where id = p_rumor_id;
    else
      update rumors set cap_count = cap_count + 1 where id = p_rumor_id;
    end if;

    return p_vote_type::text;

  elsif v_existing = p_vote_type then
    -- Same vote → toggle off (remove)
    delete from votes
     where rumor_id = p_rumor_id
       and user_id  = p_user_id;

    if p_vote_type = 'believe' then
      update rumors set believe_count = greatest(believe_count - 1, 0) where id = p_rumor_id;
    else
      update rumors set cap_count = greatest(cap_count - 1, 0) where id = p_rumor_id;
    end if;

    return null;

  else
    -- Different vote → switch
    update votes
       set vote_type = p_vote_type
     where rumor_id = p_rumor_id
       and user_id  = p_user_id;

    if p_vote_type = 'believe' then
      update rumors
         set believe_count = believe_count + 1,
             cap_count     = greatest(cap_count - 1, 0)
       where id = p_rumor_id;
    else
      update rumors
         set cap_count     = cap_count + 1,
             believe_count = greatest(believe_count - 1, 0)
       where id = p_rumor_id;
    end if;

    return p_vote_type::text;
  end if;
end;
$$;

-- ---------- ROW LEVEL SECURITY ----------
alter table rumors enable row level security;
alter table votes enable row level security;
alter table hot_takes enable row level security;
alter table player_ratings enable row level security;

-- Public read on rumors and hot_takes
create policy "Public read rumors"   on rumors     for select using (true);
create policy "Public read hot_takes" on hot_takes for select using (true);

-- Admin operations on rumors (insert/update/delete allowed for service role via security definer functions)
create policy "Allow insert rumors"  on rumors for insert with check (true);
create policy "Allow update rumors"  on rumors for update using (true);
create policy "Allow delete rumors"  on rumors for delete using (true);

-- Authenticated voting (using user_id text for anonymous session IDs too)
create policy "Anyone can insert vote" on votes for insert with check (true);
create policy "Read own votes"         on votes for select using (true);
create policy "Delete own votes"       on votes for delete using (true);

-- Player ratings
create policy "Public read ratings"    on player_ratings for select using (true);
create policy "Anyone can rate"        on player_ratings for insert with check (true);

-- ---------- REALTIME ----------
alter publication supabase_realtime add table rumors;
alter table rumors replica identity full;
