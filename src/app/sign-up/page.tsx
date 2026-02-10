import LoginOrStartNow from "@/app/ui/login-or-sign-up/login-or-sign-up";
import { userSignUpService } from "@/services/auth/sign-up.service";
import {startNowSchema} from "@/validations/auth/sign-up.validation";

export default function StartNowPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-offWhite">
      <LoginOrStartNow isLoginForm={false} onClick={userSignUpService} />
    </div>
  );
}