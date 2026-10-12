import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Poppins, DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css" assert { type: "css" };
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

// OBS: ugly fonts:
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

// const kaiseiTokumin = Kaisei_Tokumin({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
//   variable: '--font-kaisei',
// });

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ChoiceLog",
  description: "Plataforma de registro e análise de experiências de consumo.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          dmSans.className,
          dmSerif.variable,
          poppins.variable,
          inter.variable,
          cormorant.variable,
          "font-sans antialiased min-h-screen flex flex-col w-full"
        )}
      >
        <TooltipProvider>
          <div className="flex-1 w-full">{children}</div>
        </TooltipProvider>
        <Toaster
          // richColors
          theme="light"
          position="bottom-right"
          closeButton
        />
      </body>
    </html>
  );
}
