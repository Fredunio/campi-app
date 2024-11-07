export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Condition: {
        Row: {
          created_at: string
          description: string | null
          icon: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string
          name?: string
        }
        Relationships: []
      }
      Country: {
        Row: {
          continent_code: string
          id: number
          iso: string
          iso3: string
          name: string
          phone_code: number
        }
        Insert: {
          continent_code: string
          id?: number
          iso: string
          iso3: string
          name: string
          phone_code: number
        }
        Update: {
          continent_code?: string
          id?: number
          iso?: string
          iso3?: string
          name?: string
          phone_code?: number
        }
        Relationships: []
      }
      EntityType: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      Equipment: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image: string | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name?: string
        }
        Relationships: []
      }
      EquipmentCategory: {
        Row: {
          created_at: string
          name: string
        }
        Insert: {
          created_at?: string
          name: string
        }
        Update: {
          created_at?: string
          name?: string
        }
        Relationships: []
      }
      EquipmentTag: {
        Row: {
          created_at: string
          name: string
        }
        Insert: {
          created_at?: string
          name: string
        }
        Update: {
          created_at?: string
          name?: string
        }
        Relationships: []
      }
      Event: {
        Row: {
          created_at: string
          date_from: string | null
          date_to: string | null
          description: string
          entity: string | null
          id: string
          location: string | null
          name: string
          private: boolean
          time_end: string | null
          time_start: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_from?: string | null
          date_to?: string | null
          description: string
          entity?: string | null
          id?: string
          location?: string | null
          name: string
          private?: boolean
          time_end?: string | null
          time_start?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_from?: string | null
          date_to?: string | null
          description?: string
          entity?: string | null
          id?: string
          location?: string | null
          name?: string
          private?: boolean
          time_end?: string | null
          time_start?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Event_entity_fkey"
            columns: ["entity"]
            isOneToOne: false
            referencedRelation: "EntityType"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "Event_location_fkey"
            columns: ["location"]
            isOneToOne: false
            referencedRelation: "Location"
            referencedColumns: ["id"]
          },
        ]
      }
      EventRecurrence: {
        Row: {
          day_of_month: number | null
          day_of_week: number | null
          event_id: string
          frequency: Database["public"]["Enums"]["RecurringFrequency"]
          id: number
          interval: number | null
          month: string | null
          recurring_end_date: string | null
          recurring_start_date: string
        }
        Insert: {
          day_of_month?: number | null
          day_of_week?: number | null
          event_id: string
          frequency: Database["public"]["Enums"]["RecurringFrequency"]
          id?: number
          interval?: number | null
          month?: string | null
          recurring_end_date?: string | null
          recurring_start_date?: string
        }
        Update: {
          day_of_month?: number | null
          day_of_week?: number | null
          event_id?: string
          frequency?: Database["public"]["Enums"]["RecurringFrequency"]
          id?: number
          interval?: number | null
          month?: string | null
          recurring_end_date?: string | null
          recurring_start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "EventRecurrence_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "EventRecurrence_month_fkey"
            columns: ["month"]
            isOneToOne: false
            referencedRelation: "Month"
            referencedColumns: ["name"]
          },
        ]
      }
      EventTag: {
        Row: {
          created_at: string
          name: string
        }
        Insert: {
          created_at?: string
          name?: string
        }
        Update: {
          created_at?: string
          name?: string
        }
        Relationships: []
      }
      Feature: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          name?: string
        }
        Relationships: []
      }
      Guide: {
        Row: {
          body: string
          category: number
          created_at: string
          id: string
          info: string | null
          title: string
        }
        Insert: {
          body: string
          category: number
          created_at?: string
          id?: string
          info?: string | null
          title: string
        }
        Update: {
          body?: string
          category?: number
          created_at?: string
          id?: string
          info?: string | null
          title?: string
        }
        Relationships: []
      }
      GuideCategory: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      Location: {
        Row: {
          best_visit_from_month: string | null
          best_visit_to_month: string | null
          created_at: string
          enity_name: string | null
          id: string
          image: string | null
          location_area: unknown | null
          location_point: unknown | null
          name: string
          private: boolean
          user_id: string
        }
        Insert: {
          best_visit_from_month?: string | null
          best_visit_to_month?: string | null
          created_at?: string
          enity_name?: string | null
          id?: string
          image?: string | null
          location_area?: unknown | null
          location_point?: unknown | null
          name: string
          private?: boolean
          user_id: string
        }
        Update: {
          best_visit_from_month?: string | null
          best_visit_to_month?: string | null
          created_at?: string
          enity_name?: string | null
          id?: string
          image?: string | null
          location_area?: unknown | null
          location_point?: unknown | null
          name?: string
          private?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Location_best_visit_from_month_fkey"
            columns: ["best_visit_from_month"]
            isOneToOne: false
            referencedRelation: "Month"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "Location_best_visit_to_month_fkey"
            columns: ["best_visit_to_month"]
            isOneToOne: false
            referencedRelation: "Month"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "Location_enity_name_fkey"
            columns: ["enity_name"]
            isOneToOne: false
            referencedRelation: "EntityType"
            referencedColumns: ["name"]
          },
        ]
      }
      LocationCategory: {
        Row: {
          created_at: string
          name: string
        }
        Insert: {
          created_at?: string
          name: string
        }
        Update: {
          created_at?: string
          name?: string
        }
        Relationships: []
      }
      LocationSeason: {
        Row: {
          location_id: string
          season_name: string
        }
        Insert: {
          location_id: string
          season_name: string
        }
        Update: {
          location_id?: string
          season_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "LocationSeason_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "Location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "LocationSeason_season_name_fkey"
            columns: ["season_name"]
            isOneToOne: false
            referencedRelation: "Season"
            referencedColumns: ["name"]
          },
        ]
      }
      LocationSize: {
        Row: {
          description: string | null
          display_order: number
          name: string
          number_of_people_info: string | null
        }
        Insert: {
          description?: string | null
          display_order?: number
          name: string
          number_of_people_info?: string | null
        }
        Update: {
          description?: string | null
          display_order?: number
          name?: string
          number_of_people_info?: string | null
        }
        Relationships: []
      }
      LocationTag: {
        Row: {
          created_at: string
          name: string
        }
        Insert: {
          created_at?: string
          name: string
        }
        Update: {
          created_at?: string
          name?: string
        }
        Relationships: []
      }
      LocationType: {
        Row: {
          description: string | null
          name: string
        }
        Insert: {
          description?: string | null
          name: string
        }
        Update: {
          description?: string | null
          name?: string
        }
        Relationships: []
      }
      Month: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      Post: {
        Row: {
          body: string
          created_at: string
          id: string
          title: string
          user_id: string | null
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          title: string
          user_id?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      Season: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      Tag: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      Tagging: {
        Row: {
          id: number
          tag_id: number
          taggable_id: string
          taggable_type: string
        }
        Insert: {
          id?: number
          tag_id: number
          taggable_id: string
          taggable_type: string
        }
        Update: {
          id?: number
          tag_id?: number
          taggable_id?: string
          taggable_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "Tagging_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          },
        ]
      }
      Trip: {
        Row: {
          created_at: string
          description: string | null
          id: string
          locations: string[] | null
          name: string
          private: boolean
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          locations?: string[] | null
          name: string
          private?: boolean
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          locations?: string[] | null
          name?: string
          private?: boolean
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      UserProfile: {
        Row: {
          birthday: string | null
          country_id: number | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          location: Json | null
          updated_at: string
          username: string | null
        }
        Insert: {
          birthday?: string | null
          country_id?: number | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          location?: Json | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          birthday?: string | null
          country_id?: number | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: Json | null
          updated_at?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "UserProfile_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "Country"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      addTagToEntity: {
        Args: {
          p_tag_name: string
          p_taggable_entity_id: string
          p_taggable_entity_type: string
        }
        Returns: undefined
      }
      get_tags_for_entity: {
        Args: {
          p_taggable_id: string
          p_taggable_type: string
        }
        Returns: string[]
      }
    }
    Enums: {
      RecurringFrequency: "daily" | "weekly" | "monthly" | "yearly"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
