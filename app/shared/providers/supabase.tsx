import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = "https://wilrhxiajoxjpezcfyfx.supabase.co";
const SUPABASE_ANON_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpbHJoeGlham94anBlemNmeWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2Mjg4MDUsImV4cCI6MjAyMDIwNDgwNX0.7G_h1qMRPx8-dZMv-LpYbjNPk85f9D-r_u1snfdQXuo";


if (!SUPABASE_PROJECT_URL || !SUPABASE_ANON_KEY) {
	throw new Error(
		"Environment variables SUPABASE_PROJECT_URL and SUPABASE_ANON_KEY are not defined"
	);
}

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

export default supabase;