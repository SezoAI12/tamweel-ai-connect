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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      investor_profiles: {
        Row: {
          accreditation_verified: boolean | null
          company_fund_name: string | null
          created_at: string
          geographic_focus: string[] | null
          id: string
          investor_type: Database["public"]["Enums"]["investor_type"] | null
          portfolio_website: string | null
          preferred_industries: string[] | null
          preferred_stages:
            | Database["public"]["Enums"]["startup_stage"][]
            | null
          ticket_size_max: number | null
          ticket_size_min: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          accreditation_verified?: boolean | null
          company_fund_name?: string | null
          created_at?: string
          geographic_focus?: string[] | null
          id?: string
          investor_type?: Database["public"]["Enums"]["investor_type"] | null
          portfolio_website?: string | null
          preferred_industries?: string[] | null
          preferred_stages?:
            | Database["public"]["Enums"]["startup_stage"][]
            | null
          ticket_size_max?: number | null
          ticket_size_min?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          accreditation_verified?: boolean | null
          company_fund_name?: string | null
          created_at?: string
          geographic_focus?: string[] | null
          id?: string
          investor_type?: Database["public"]["Enums"]["investor_type"] | null
          portfolio_website?: string | null
          preferred_industries?: string[] | null
          preferred_stages?:
            | Database["public"]["Enums"]["startup_stage"][]
            | null
          ticket_size_max?: number | null
          ticket_size_min?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          country: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          is_verified: boolean | null
          phone: string | null
          preferred_language: string | null
          profile_image_url: string | null
          trust_score: number | null
          updated_at: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          bio?: string | null
          country?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_verified?: boolean | null
          phone?: string | null
          preferred_language?: string | null
          profile_image_url?: string | null
          trust_score?: number | null
          updated_at?: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          bio?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_verified?: boolean | null
          phone?: string | null
          preferred_language?: string | null
          profile_image_url?: string | null
          trust_score?: number | null
          updated_at?: string
          user_id?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      service_provider_profiles: {
        Row: {
          business_license_verified: boolean | null
          company_name: string
          created_at: string
          id: string
          portfolio_website: string | null
          service_type: string | null
          target_clients: string[] | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          business_license_verified?: boolean | null
          company_name: string
          created_at?: string
          id?: string
          portfolio_website?: string | null
          service_type?: string | null
          target_clients?: string[] | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          business_license_verified?: boolean | null
          company_name?: string
          created_at?: string
          id?: string
          portfolio_website?: string | null
          service_type?: string | null
          target_clients?: string[] | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      startup_profiles: {
        Row: {
          country_incorporation: string | null
          created_at: string
          funding_needed: number | null
          funding_raised: number | null
          id: string
          industry: string | null
          pitch_deck_url: string | null
          stage: Database["public"]["Enums"]["startup_stage"] | null
          startup_name: string
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          country_incorporation?: string | null
          created_at?: string
          funding_needed?: number | null
          funding_raised?: number | null
          id?: string
          industry?: string | null
          pitch_deck_url?: string | null
          stage?: Database["public"]["Enums"]["startup_stage"] | null
          startup_name: string
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          country_incorporation?: string | null
          created_at?: string
          funding_needed?: number | null
          funding_raised?: number | null
          id?: string
          industry?: string | null
          pitch_deck_url?: string | null
          stage?: Database["public"]["Enums"]["startup_stage"] | null
          startup_name?: string
          updated_at?: string
          user_id?: string
          website?: string | null
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
      investor_type: "angel" | "vc" | "family-office" | "corporate-vc"
      startup_stage: "idea" | "seed" | "early" | "growth" | "expansion"
      user_type: "startup" | "investor" | "service-provider"
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
      investor_type: ["angel", "vc", "family-office", "corporate-vc"],
      startup_stage: ["idea", "seed", "early", "growth", "expansion"],
      user_type: ["startup", "investor", "service-provider"],
    },
  },
} as const
