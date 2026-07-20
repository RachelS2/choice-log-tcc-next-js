import MotivationPage from '@/components/sign-in/motivation';
import LoginForm from '@/components/sign-in/page';

export default function LoginPage() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-8xl lg:grid-cols-2"> 
      <MotivationPage />

      <div className="flex items-center justify-center px-6 py-10">
        <LoginForm />
      </div>
    </div>
  );
}