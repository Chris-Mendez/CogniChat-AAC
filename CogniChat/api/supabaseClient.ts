import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lytnzbnadjrgefzqaitr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dG56Ym5hZGpyZ2VmenFhaXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2OTMxNjMsImV4cCI6MjA3NTI2OTE2M30.bFhUcNvOtHyhc2GNn66XeLq5U3Wlabb8OB3dv6KiQkI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);