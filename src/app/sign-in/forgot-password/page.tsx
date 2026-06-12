"use client";
import { ChangePasswordForm } from "@/components/sign-in/forgot-password/new-password";

export default function ForgotPasswordForm() {
    return (
        <div className="bg-red-500 mx-auto flex min-h-[calc(100vh-96px)] items-center justify-center px-6 py-10">
            <ChangePasswordForm layout={"vertical"} justifyButtons="center" />
        </div>
    );

}