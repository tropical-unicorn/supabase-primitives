import { createClient } from '../utils/supabase/server';

export const signUpWithEmail = async (email: string, password: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
};
