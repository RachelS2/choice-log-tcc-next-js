import SidebarShell from "@/components/dashboard/sidebar-shell";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Kaisei_Tokumin } from "next/font/google";


const kaiseiTokumin = Kaisei_Tokumin({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-kaisei',
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return (
    <div className={`${kaiseiTokumin.variable} font-sans antialiased flex min-h-screen`}>
      <SidebarShell session={session} />
      <main className="relative min-h-screen flex-1 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-0">
          <div className="absolute -top-24 left-1/4 h-[280px] w-[300px] rounded-full bg-blue-300/20 blur-3xl" />
          <div className="absolute top-10 right-[-80px] h-[320px] w-[320px] rounded-full bg-blue-300/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 h-[200px] w-[200px] rounded-full bg-blue-200/10 blur-2xl" />
          <div className="absolute bottom-0 left-10 h-[280px] w-[260px] rounded-full bg-blue-200 blur-3xl" />
          <div className="absolute bottom-[-40px] right-10 h-[220px] w-[220px] rounded-full bg-blue-400/20 blur-3xl" />
        </div>

        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}