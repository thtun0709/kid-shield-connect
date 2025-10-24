import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gradient-calm px-6">
      <div className="animate-shield-float mb-8">
        <Shield className="h-32 w-32 text-white" strokeWidth={1.5} />
      </div>
      
      <h1 className="mb-4 text-center text-4xl font-bold text-white animate-fade-in">
        Parental Shield
      </h1>
      
      <p className="text-center text-xl text-white/90 max-w-md animate-fade-in">
        Safe Mode Activated
      </p>
      
      <p className="mt-4 text-center text-base text-white/75 max-w-md animate-fade-in">
        You're browsing safely under your parent's protection
      </p>
      
      <div className="mt-12 flex gap-2 animate-pulse-gentle">
        <div className="h-2 w-2 rounded-full bg-white/60"></div>
        <div className="h-2 w-2 rounded-full bg-white/60"></div>
        <div className="h-2 w-2 rounded-full bg-white/60"></div>
      </div>
    </div>
  );
};

export default Splash;
