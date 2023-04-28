// import Link from "next/link";

// import { cn } from "~/utils/utils";
import { ConnectKitButton } from "connectkit";
import { Button } from "./ui/button";

import Link from "next/link";
// import { buttonVariants } from "@/components/ui/button";
// import { CommandMenu } from "@/components/command-menu";

// import { MainNav } from "@/components/main-nav";
// import { ModeToggle } from "@/components/mode-toggle";

export function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-40 w-full border-b border-yellow-100 bg-zinc-800 shadow-sm backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="flex justify-center ">
          <Button variant="link" className="text-2xl">
            <Link href="/">🏠</Link>
          </Button>
        </div>
        <Button variant="link" className="text-2xl">
          <Link href="/liq">👅</Link>
        </Button>
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <ConnectKitButton showAvatar={false} showBalance={false} />
        </div>
      </div>
    </header>
  );
}
