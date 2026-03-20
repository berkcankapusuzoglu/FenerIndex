export type VoteType = "believe" | "cap";
export type RumorStatus = "active" | "confirmed" | "denied" | "expired";
export type RumorCategory = "transfer" | "manager" | "injury" | "contract" | "other";

export interface Rumor {
  id: string;
  title: string;
  description: string | null;
  player_name: string | null;
  source_url: string | null;
  image_url: string | null;
  category: RumorCategory;
  status: RumorStatus;
  believe_count: number;
  cap_count: number;
  created_at: string;
}

export interface Vote {
  id: string;
  rumor_id: string;
  user_id: string;
  vote_type: VoteType;
  created_at: string;
}

export interface HotTake {
  id: string;
  statement: string;
  agree_count: number;
  disagree_count: number;
  category: RumorCategory;
  created_at: string;
}

export interface PlayerRating {
  id: string;
  match_id: string;
  player_name: string;
  user_id: string;
  rating: number;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      rumors: {
        Row: Rumor;
        Insert: Omit<Rumor, "id" | "believe_count" | "cap_count" | "created_at"> & {
          id?: string;
          believe_count?: number;
          cap_count?: number;
          created_at?: string;
        };
        Update: Partial<Rumor>;
      };
      votes: {
        Row: Vote;
        Insert: Omit<Vote, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Vote>;
      };
      hot_takes: {
        Row: HotTake;
        Insert: Omit<HotTake, "id" | "agree_count" | "disagree_count" | "created_at"> & {
          id?: string;
          agree_count?: number;
          disagree_count?: number;
          created_at?: string;
        };
        Update: Partial<HotTake>;
      };
      player_ratings: {
        Row: PlayerRating;
        Insert: Omit<PlayerRating, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<PlayerRating>;
      };
    };
    Functions: {
      cast_vote: {
        Args: { p_rumor_id: string; p_user_id: string; p_vote_type: VoteType };
        Returns: string | null;
      };
    };
  };
}
