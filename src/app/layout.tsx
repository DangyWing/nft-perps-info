import "../styles/globals.css";
import { cn } from "~/utils/utils";
import { SiteHeader } from "~/components/SiteHeader";
import { Providers } from "./providers";
import { fontMono } from "~/styles/fonts";

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
          )}
        >
          <SiteHeader />
          {children}
        </body>
      </Providers>
    </html>
  );
}
