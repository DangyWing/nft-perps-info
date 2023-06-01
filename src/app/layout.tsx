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
            "bg-primary text-primary-foreground",
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
