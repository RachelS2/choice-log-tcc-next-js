import MotivationPage from '@/components/sign-in/motivation';
import LoginForm from '@/components/sign-in/page';

export default function LoginPage() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl lg:grid-cols-2 px-4 sm:px-6">
      <MotivationPage />

      <div className="flex items-center justify-center px-4 py-8">
        <LoginForm />
      </div>
    </div>
  );
}