export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      capsules: {
        Row: {
          id: string
          creator_id: string
          title: string
          description: string | null
          seal_date: string | null
          release_date: string
          encryption_key_hash: string
          status: 'draft' | 'sealed' | 'released'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          title: string
          description?: string | null
          seal_date?: string | null
          release_date: string
          encryption_key_hash: string
          status?: 'draft' | 'sealed' | 'released'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          creator_id?: string
          title?: string
          description?: string | null
          seal_date?: string | null
          release_date?: string
          encryption_key_hash?: string
          status?: 'draft' | 'sealed' | 'released'
          created_at?: string
          updated_at?: string
        }
      }
      capsule_contents: {
        Row: {
          id: string
          capsule_id: string
          content_type: string
          title: string
          description: string | null
          encrypted_content: string
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          capsule_id: string
          content_type: string
          title: string
          description?: string | null
          encrypted_content: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          capsule_id?: string
          content_type?: string
          title?: string
          description?: string | null
          encrypted_content?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      rewards: {
        Row: {
          id: string
          user_id: string
          token_balance: number
          lifetime_tokens: number
          achievements: Json
          unlocked_features: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          token_balance?: number
          lifetime_tokens?: number
          achievements?: Json
          unlocked_features?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          token_balance?: number
          lifetime_tokens?: number
          achievements?: Json
          unlocked_features?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}