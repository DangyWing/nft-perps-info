import "../styles/globals.css";
import { cn } from "~/utils/utils";
import { SiteHeader } from "~/components/SiteHeader";
import { Providers } from "./providers";
import { fontMono } from "~/styles/fonts";
import { Toaster } from "~/components/ui/Toaster";
// import { VT323 } from "next/font/google";

// const fontMono = VT323({
//   subsets: ["latin"],
//   weight: ["400"],
//   variable: "--font-mono",
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <head />
        <body
          className={cn(
            "min-h-screen bg-primary font-sans text-primary-foreground antialiased",
            fontMono.className
          )}
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
          </div>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
