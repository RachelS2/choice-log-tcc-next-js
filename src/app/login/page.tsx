import AppLogo from '@/app/ui/app-logo';
import LoginOrStartNow from "@/app/ui/login-or-start-now/login_or_start_now";
import { loginService } from '@/services/auth/login.service';


export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-offWhite">
      <LoginOrStartNow onClick={loginService} />
    </div>
  );
}