import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error(
		"Environment variables supabaseUrl and supabaseKey are not defined"
	);
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;