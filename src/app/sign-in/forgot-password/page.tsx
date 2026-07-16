"use client";
import { ResetPasswordForm } from "@/components/dashboard/settings/new-password-form";
import {ForgotPasswordPage} from "@/components/sign-in/forgot-password/forgot-password-request";
export default function ForgotPasswordForm() {
    return (
        <div className="flex items-center justify-center px-6">
            <ForgotPasswordPage/>
        </div>
    );

}