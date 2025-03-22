import Logout from '@/components/logout/logout';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
const SecurePage = async () => {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  console.log('user', user);

  if (!user) {
    redirect('/login');
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold'>Secure Page</h1>
        <Logout />
      </div>
    </div>
  );
};

export default SecurePage;
