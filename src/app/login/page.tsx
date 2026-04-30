import LandingHeader from '@/components/landing/header';
import MotivationPage from '@/components/login/motivation';
import LoginForm from '@/components/login/form';
import Footer from '@/components/landing/footer';

export default function LoginPage(){
  return (
    <>
      <LandingHeader />
      <main className="max-h-screen pt-15  grid lg:grid-cols-2">
        <div className="grid bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 items-center justify-center max-h-screen lg:grid-cols-2 lg:gap-16">
          <MotivationPage/>

          <LoginForm/>
        </div>
      </main>
      <Footer/>
    </>
  )
}