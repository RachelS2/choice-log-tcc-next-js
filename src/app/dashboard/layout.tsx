import Sidebar from "@/components/dashboard/sidebar";
import { Kaisei_Tokumin } from "next/font/google";


const kaiseiTokumin = Kaisei_Tokumin({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-kaisei',
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${kaiseiTokumin.variable} font-sans antialiased flex min-h-screen `}>
      <Sidebar />
      <main className="ml-64 min-h-screen flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">

        {/* Background */}
        <div className="pointer-events-none absolute inset-0 z-0">

          {/* Top left */}
          <div className="absolute -top-24 left-1/4 h-[280px] w-[280px] rounded-full bg-blue-400/20 blur-3xl" />

          {/* Top right */}
          <div className="absolute top-10 right-[-80px] h-[320px] w-[320px] rounded-full bg-blue-400/20 blur-3xl" />

          {/* Center */}
          <div className="absolute top-1/2 left-1/3 h-[200px] w-[200px] rounded-full bg-blue-300/15 blur-2xl" />

          {/* Bottom left */}
          <div className="absolute bottom-0 left-[300px] h-[260px] w-[260px] rounded-full bg-blue-200 blur-3xl" />

          {/* Bottom right */}
          <div className="absolute bottom-[-80px] right-10 h-[220px] w-[220px] rounded-full bg-blue-400/20 blur-3xl" />

        </div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}