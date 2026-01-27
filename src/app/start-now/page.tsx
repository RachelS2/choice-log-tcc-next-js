import LoginOrStartNow from "@/app/ui/login_or_start_now/login_or_start_now";
import { userRegisterService } from "@/services/auth/start-now.service";
import {startNowSchema} from "@/validations/auth/start-now.validation";

export default function StartNowPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-offWhite">
      <LoginOrStartNow isLoginForm={false} onClick={userRegisterService} />
    </div>
  );
}