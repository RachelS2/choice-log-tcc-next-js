import LandingHeader from '@/components/landing/header';
import MotivationPage from '@/components/sign-in/motivation';
import LoginForm from '@/components/sign-in/form';
import Footer from '@/components/landing/footer';

export default function LoginPage() {
  return (
    <>
      <LandingHeader />
      <main className="max-h-screen  bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 pt-15 grid lg:grid-cols-2">
        <div className="grid items-center justify-center max-h-screen lg:grid-cols-2 lg:gap-16">
          <MotivationPage />

          <LoginForm />
        </div>
      </main>
      <Footer />
    </>
  )
}