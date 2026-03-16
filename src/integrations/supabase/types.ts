export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      bids: {
        Row: {
          amount: number
          asset_type: Database["public"]["Enums"]["asset_type"]
          created_at: string
          id: string
          player_id: string
          round: number
          session_id: string
          won: boolean | null
        }
        Insert: {
          amount: number
          asset_type: Database["public"]["Enums"]["asset_type"]
          created_at?: string
          id?: string
          player_id: string
          round: number
          session_id: string
          won?: boolean | null
        }
        Update: {
          amount?: number
          asset_type?: Database["public"]["Enums"]["asset_type"]
          created_at?: string
          id?: string
          player_id?: string
          round?: number
          session_id?: string
          won?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "bids_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bids_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      player_assets: {
        Row: {
          acquired_round: number
          asset_type: Database["public"]["Enums"]["asset_type"]
          id: string
          player_id: string
          price_paid: number
          quantity: number
          session_id: string
        }
        Insert: {
          acquired_round: number
          asset_type: Database["public"]["Enums"]["asset_type"]
          id?: string
          player_id: string
          price_paid: number
          quantity?: number
          session_id: string
        }
        Update: {
          acquired_round?: number
          asset_type?: Database["public"]["Enums"]["asset_type"]
          id?: string
          player_id?: string
          price_paid?: number
          quantity?: number
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_assets_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_assets_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          budget: number
          cost_score: number
          created_at: string
          display_name: string
          id: string
          is_connected: boolean
          reliability_score: number
          session_id: string
          total_score: number
        }
        Insert: {
          budget?: number
          cost_score?: number
          created_at?: string
          display_name: string
          id?: string
          is_connected?: boolean
          reliability_score?: number
          session_id: string
          total_score?: number
        }
        Update: {
          budget?: number
          cost_score?: number
          created_at?: string
          display_name?: string
          id?: string
          is_connected?: boolean
          reliability_score?: number
          session_id?: string
          total_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "players_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          achievements: string[] | null
          avatar_url: string | null
          completed_quizzes: number | null
          created_at: string
          display_name: string | null
          id: string
          interests: string[] | null
          invites_accepted: number | null
          invites_sent: number | null
          language: string | null
          last_active_date: string | null
          level: string | null
          questions_asked: number | null
          read_nuggets: string[] | null
          referral_code: string | null
          referred_by: string | null
          streak: number | null
          updated_at: string
          user_id: string
          xp: number | null
        }
        Insert: {
          achievements?: string[] | null
          avatar_url?: string | null
          completed_quizzes?: number | null
          created_at?: string
          display_name?: string | null
          id?: string
          interests?: string[] | null
          invites_accepted?: number | null
          invites_sent?: number | null
          language?: string | null
          last_active_date?: string | null
          level?: string | null
          questions_asked?: number | null
          read_nuggets?: string[] | null
          referral_code?: string | null
          referred_by?: string | null
          streak?: number | null
          updated_at?: string
          user_id: string
          xp?: number | null
        }
        Update: {
          achievements?: string[] | null
          avatar_url?: string | null
          completed_quizzes?: number | null
          created_at?: string
          display_name?: string | null
          id?: string
          interests?: string[] | null
          invites_accepted?: number | null
          invites_sent?: number | null
          language?: string | null
          last_active_date?: string | null
          level?: string | null
          questions_asked?: number | null
          read_nuggets?: string[] | null
          referral_code?: string | null
          referred_by?: string | null
          streak?: number | null
          updated_at?: string
          user_id?: string
          xp?: number | null
        }
        Relationships: []
      }
      round_results: {
        Row: {
          battery_charge: number
          cost_score: number
          coverage: number
          created_at: string
          demand: number
          id: string
          player_id: string
          reliability_score: number
          round: number
          session_id: string
          solar_output: number
          wind_output: number
        }
        Insert: {
          battery_charge?: number
          cost_score?: number
          coverage?: number
          created_at?: string
          demand?: number
          id?: string
          player_id: string
          reliability_score?: number
          round: number
          session_id: string
          solar_output?: number
          wind_output?: number
        }
        Update: {
          battery_charge?: number
          cost_score?: number
          coverage?: number
          created_at?: string
          demand?: number
          id?: string
          player_id?: string
          reliability_score?: number
          round?: number
          session_id?: string
          solar_output?: number
          wind_output?: number
        }
        Relationships: [
          {
            foreignKeyName: "round_results_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "round_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string
          current_round: number
          host_id: string
          id: string
          room_code: string
          status: Database["public"]["Enums"]["session_status"]
          updated_at: string
          weather_seed: number
        }
        Insert: {
          created_at?: string
          current_round?: number
          host_id: string
          id?: string
          room_code: string
          status?: Database["public"]["Enums"]["session_status"]
          updated_at?: string
          weather_seed?: number
        }
        Update: {
          created_at?: string
          current_round?: number
          host_id?: string
          id?: string
          room_code?: string
          status?: Database["public"]["Enums"]["session_status"]
          updated_at?: string
          weather_seed?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      asset_type: "solar" | "wind" | "gas" | "nuclear" | "battery"
      session_status: "lobby" | "briefing" | "bidding" | "resolving" | "scoring" | "finished"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      asset_type: ["solar", "wind", "gas", "nuclear", "battery"],
      session_status: ["lobby", "briefing", "bidding", "resolving", "scoring", "finished"],
    },
  },
} as const
