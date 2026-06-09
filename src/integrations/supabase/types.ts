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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      cart_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          payload: Json
          session_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          payload?: Json
          session_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          payload?: Json
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chat_logs: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          session_id: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          session_id: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          customer_city: string | null
          customer_name: string
          customer_phone: string
          delivery_method: string
          id: string
          items: Json
          items_total: number
          notes: string | null
          shipping_fee: number
          status: string
          total: number
          total_qty: number
          updated_at: string
          user_id: string | null
          whatsapp_clicked: boolean
        }
        Insert: {
          created_at?: string
          customer_city?: string | null
          customer_name: string
          customer_phone: string
          delivery_method?: string
          id?: string
          items?: Json
          items_total?: number
          notes?: string | null
          shipping_fee?: number
          status?: string
          total?: number
          total_qty?: number
          updated_at?: string
          user_id?: string | null
          whatsapp_clicked?: boolean
        }
        Update: {
          created_at?: string
          customer_city?: string | null
          customer_name?: string
          customer_phone?: string
          delivery_method?: string
          id?: string
          items?: Json
          items_total?: number
          notes?: string | null
          shipping_fee?: number
          status?: string
          total?: number
          total_qty?: number
          updated_at?: string
          user_id?: string | null
          whatsapp_clicked?: boolean
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          colors: string[]
          created_at: string
          description: string | null
          fabric: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_bestseller: boolean
          is_hit: boolean
          is_new: boolean
          name: string
          price: number
          sort_order: number
          updated_at: string
        }
        Insert: {
          category?: string
          colors?: string[]
          created_at?: string
          description?: string | null
          fabric?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_bestseller?: boolean
          is_hit?: boolean
          is_new?: boolean
          name: string
          price?: number
          sort_order?: number
          updated_at?: string
        }
        Update: {
          category?: string
          colors?: string[]
          created_at?: string
          description?: string | null
          fabric?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_bestseller?: boolean
          is_hit?: boolean
          is_new?: boolean
          name?: string
          price?: number
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          city: string | null
          comment: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          sort_order: number
          stars: number
        }
        Insert: {
          city?: string | null
          comment: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number
          stars?: number
        }
        Update: {
          city?: string | null
          comment?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
          stars?: number
        }
        Relationships: []
      }
      settings: {
        Row: {
          color_choice_min: number
          email: string
          hero_subtitle: string
          hero_title: string
          id: number
          instagram: string
          location: string
          maintenance_mode: boolean
          min_pieces: number
          nubank_link: string
          pix_code: string
          pix_key: string
          shipping_fee: number
          store_name: string
          unit_price: number
          updated_at: string
          whatsapp: string
        }
        Insert: {
          color_choice_min?: number
          email?: string
          hero_subtitle?: string
          hero_title?: string
          id?: number
          instagram?: string
          location?: string
          maintenance_mode?: boolean
          min_pieces?: number
          nubank_link?: string
          pix_code?: string
          pix_key?: string
          shipping_fee?: number
          store_name?: string
          unit_price?: number
          updated_at?: string
          whatsapp?: string
        }
        Update: {
          color_choice_min?: number
          email?: string
          hero_subtitle?: string
          hero_title?: string
          id?: number
          instagram?: string
          location?: string
          maintenance_mode?: boolean
          min_pieces?: number
          nubank_link?: string
          pix_code?: string
          pix_key?: string
          shipping_fee?: number
          store_name?: string
          unit_price?: number
          updated_at?: string
          whatsapp?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "customer"
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
      app_role: ["admin", "customer"],
    },
  },
} as const
