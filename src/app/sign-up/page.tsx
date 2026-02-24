import LoginOrStartNow from "@/components/ui/login-or-sign-up/login-or-sign-up";

export default function StartNowPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-offWhite">
      <LoginOrStartNow isLoginForm={false} />
    </div>
  );
}