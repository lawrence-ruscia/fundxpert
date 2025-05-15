import { useState, useEffect } from 'react';
import LoginForm from './components/login-form';
import Logo from '../components/logo';
import background from '../assets/login-background.png';
import backgroundSmall from '../assets/login-background-small.png';
export default function LoginPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set up the initial screen size check
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial render
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Clean up the event listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div
      className='flex min-h-svh w-full items-center justify-center p-6 md:p-10 
                bg-bottom bg-no-repeat bg-contain md:bg-contain lg:bg-autobg-center sm:bg-bottom'
      style={{
        backgroundImage: `url(${isMobile ? backgroundSmall : background})`,
      }}
    >
      <div className='w-full max-w-sm'>
        <Logo className='mb-4' />
        <LoginForm />
      </div>
    </div>
  );
}
