import Link from 'next/link';

const HomePage = () => {
  return (
    <main className='flex flex-col items-center justify-center h-screen'>
      <Link href='/login'>Login</Link>
    </main>
  );
};

export default HomePage;
