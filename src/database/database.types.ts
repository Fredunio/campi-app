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
          description: string
          entity: string | null
          id: string
          location: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          entity?: string | null
          id?: string
          location?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          entity?: string | null
          id?: string
          location?: string | null
          name?: string
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
          created_at: string
          enity_name: string | null
          id: string
          image: string | null
          location_area: unknown | null
          location_point: unknown | null
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          enity_name?: string | null
          id?: string
          image?: string | null
          location_area?: unknown | null
          location_point?: unknown | null
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          enity_name?: string | null
          id?: string
          image?: string | null
          location_area?: unknown | null
          location_point?: unknown | null
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Location_enity_name_fkey"
            columns: ["enity_name"]
            isOneToOne: false
            referencedRelation: "EntityType"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "Location_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
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
      LocationSize: {
        Row: {
          description: string | null
          name: string
          order: number
        }
        Insert: {
          description?: string | null
          name: string
          order?: number
        }
        Update: {
          description?: string | null
          name?: string
          order?: number
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
        Relationships: [
          {
            foreignKeyName: "Post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "Trip_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      UserProfile: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          location: Json | null
          updated_at: string
          username: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          location?: Json | null
          updated_at?: string
          username?: string | null
        }
        Update: {
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
            foreignKeyName: "UserProfile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
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
      [_ in never]: never
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
