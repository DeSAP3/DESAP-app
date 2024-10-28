import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = "https://dhzgvdoywugiaikstrht.supabase.co";
const SUPABASE_ANON_KEY =
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoemd2ZG95d3VnaWFpa3N0cmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNjE0MjQsImV4cCI6MjA0NDYzNzQyNH0.4aO_NzY-sJEQh59QiZsDR3yIuEopWem-nZaHO6zFBr4";

if (!SUPABASE_PROJECT_URL || !SUPABASE_ANON_KEY) {
	throw new Error(
		"Environment variables SUPABASE_PROJECT_URL and SUPABASE_ANON_KEY are not defined"
	);
}

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

export default supabase;