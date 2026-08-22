import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || "https://vadwebhzpzmflrzcdflo.supabase.co"
const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhZHdlYmh6cHptZmxyemNkZmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczOTcyMTYsImV4cCI6MjEwMjk3MzIxNn0.C1yDK5bMGSyTd3E9M--BROEAxayrVX2J4OEwvYzB0mY"

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

