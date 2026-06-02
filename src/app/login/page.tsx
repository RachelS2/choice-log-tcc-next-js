import LandingHeaderClient from '@/components/landing/landing-header-client';
import MotivationPage from '@/components/sign-in/motivation';
import LoginForm from '@/components/sign-in/form';
import Footer from '@/components/landing/footer';

export default function LoginPage() {
  return (
    <>
      <LandingHeaderClient />
      <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 pt-16">
        <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-8xl lg:grid-cols-2">
          
          <MotivationPage />

          <div className="flex items-center justify-center px-6 py-10">
            <LoginForm />
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}