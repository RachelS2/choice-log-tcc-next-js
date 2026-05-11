'use client';
import { Mail, User, Lock, EyeOff, Eye, Link } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import PasswordInput from "../sign-in/password-input";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
            <Card className="w-full max-w-md rounded-3xl border-neutral-200 shadow-2xl">
                <CardHeader className="space-y-3 text-center">
                    <CardTitle className="text-3xl">
                        Create Account
                    </CardTitle>

                    <CardDescription className="text-base">
                        Start tracking your shopping experiences
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">

                    {/* NAME */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="name"
                            className="flex items-center gap-2 text-base"
                        >
                            <User className="h-4 w-4 text-neutral-500" />
                            Name
                        </Label>

                        <Input
                            id="name"
                            placeholder="Your name"
                            className="h-11 text-base"
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="email"
                            className="flex items-center gap-2 text-base"
                        >
                            <Mail className="h-4 w-4 text-neutral-500" />
                            Email
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="h-11 text-base"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="password"
                            className="flex items-center gap-2 text-base"
                        >
                            <Lock className="h-4 w-4 text-neutral-500" />
                            Password
                        </Label>

                        <PasswordInput />
                    </div>

                    {/* BUTTON */}
                    <Button className="h-11 w-full text-base">
                        Create Account
                    </Button>

                    {/* GOOGLE */}
                    <Button
                        variant="outline"
                        className="h-11 w-full text-base"
                    >
                        Continue with Google
                    </Button>

                    {/* FOOTER */}
                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </section>
    );
}