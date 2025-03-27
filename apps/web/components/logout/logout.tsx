'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();

    router.push('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
