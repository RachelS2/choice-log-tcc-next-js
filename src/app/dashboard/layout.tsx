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
      <main className="ml-64 min-h-screen flex-1  "> 
        {/* bg-blue-50  */}
        {children}
      </main>
    </div>
  );
}