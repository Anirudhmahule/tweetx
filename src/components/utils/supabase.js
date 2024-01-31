import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ryyxhpzqjqzdwkubnfpm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5eXhocHpxanF6ZHdrdWJuZnBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzNTMwODUsImV4cCI6MjAyMTkyOTA4NX0.vNDLvrwHaBixgHzvKYlRGpEBeFscL54jo4MHdkL7A7Q";

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
