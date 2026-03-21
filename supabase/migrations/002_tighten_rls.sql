-- ============================================================
-- FenerIndex — Tighten RLS Policies for Production
-- ============================================================
-- The initial migration had overly permissive INSERT/UPDATE/DELETE
-- on the rumors table. In production, only the service_role key
-- (used by server actions) should modify rumors.
-- The cast_vote function already uses SECURITY DEFINER to bypass RLS.

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Allow insert rumors" ON rumors;
DROP POLICY IF EXISTS "Allow update rumors" ON rumors;
DROP POLICY IF EXISTS "Allow delete rumors" ON rumors;

-- Rumors: only readable by public, writable via service_role (admin actions use server client)
-- Service role bypasses RLS, so no explicit write policy needed for admin operations.

-- Add index for vote analytics
CREATE INDEX IF NOT EXISTS idx_votes_created ON votes (created_at DESC);

-- Enable realtime for hot_takes table too
ALTER PUBLICATION supabase_realtime ADD TABLE hot_takes;
ALTER TABLE hot_takes REPLICA IDENTITY FULL;
