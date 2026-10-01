"use client";
import { Card } from "@/components/ui/card";
import { AlertTriangle, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import DecorativeBackground from "./choicelog-decorative-background";
import { Button } from "./button";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  iconClassName?: string;
  mainDivClassName?: string;
}

export function NotificationContent({
  icon: Icon,
  title,
  description,
  children,
  footer,
  iconClassName,
  mainDivClassName
}: AuthCardProps) {
  return (
    <div
      className="flex w-full flex-col items-center justify-center px-4"
    >
      <Card
        className={cn("w-full max-w-md rounded-2xl bg-blue-100 shadow-lg transition-all",
           "duration-300 hover:-translate-y-0.5 hover:shadow-blue-500 animate-in fade-in",
           "slide-in-from-bottom-2 sm:p-10", mainDivClassName)}
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <DecorativeBackground />

        <div className="mb-6 flex flex-col items-center text-center">
          <div className={cn("mb-5 grid size-14 place-items-center rounded-full bg-blue-900", iconClassName)}>
            <Icon className="size-7 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            {title}
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        {children && (
          <div className="space-y-1 flex flex-col items-center justify-center">{children}</div>
        )}
        {footer ? (
          <div className="mt-6 text-center text-xs text-muted-foreground">
            {footer}
          </div>
        ) : null}
      </Card>
    </div>
  );
}


interface ErrorState {

  title: string;
  description: string,
  redirectTo?: string,
  buttonText?: string,
}
export function ErrorNotification({ title, description, redirectTo, buttonText }: ErrorState) {
  let btnTxt: string = "Tentar novamente";
  if (buttonText != undefined) btnTxt = buttonText;
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
    >

      <NotificationContent
        icon={AlertTriangle}
        title={title}
        description={description}
        children={
          redirectTo &&
          <Button className="bg-blue-900 text-white hover:bg-blue-800" onClick={() => {
            redirect(redirectTo)
          }}>
            {btnTxt}
          </Button>
        }
      />
    </main>
  )
}