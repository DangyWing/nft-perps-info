import { VT323 } from "next/font/google";
import "../styles/globals.css";
import { cn } from "~/utils/utils";

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
      <body
        className={cn(
          "flex min-h-screen flex-col items-center justify-center bg-zinc-900 align-middle text-lg text-zinc-200",
          fontMono.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
