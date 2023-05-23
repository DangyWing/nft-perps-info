// "use client";
import { VT323 } from "next/font/google";
// import { inter } from "../styles/font";
import "../styles/globals.css";
import { cn } from "~/utils/utils";
import { SiteHeader } from "~/components/SiteHeader";
import { Providers } from "./providers";

const fontMono = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={cn(
            "flex flex-col items-center justify-center bg-zinc-900 align-middle text-lg text-zinc-200",
            fontMono.className
            // inter.className
          )}
        >
          <SiteHeader />
          {children}
        </body>
      </Providers>
    </html>
  );
}
