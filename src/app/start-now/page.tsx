import LoginOrStartNow from "@/app/ui/login-or-start-now/login_or_start_now";
import { userRegisterController } from "@/controllers/auth/start-now.controller";
import {startNowSchema} from "@/validations/auth/start-now.validation";

export default function StartNowPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-offWhite">
      <LoginOrStartNow isLoginForm={false} onClick={userRegisterController} />
    </div>
  );
}