import { ConnectButton } from "./ConnectButton";
import { Button } from "./ui/button";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 h-16 w-full border-b border-yellow-100  bg-background/95 bg-zinc-800 shadow-sm backdrop-blur">
      <div className="container flex items-center ">
        <div className="flex justify-center ">
          <Button variant="link" className="text-2xl">
            <Link href="/" placeholder="blur" prefetch={false}>
              🏠
            </Link>
          </Button>
        </div>
        <Button variant="link" className="text-2xl">
          <Link href="/liq" prefetch={false}>
            👅
          </Link>
        </Button>
        <Button variant="link" className="text-2xl">
          <Link href="/trades" prefetch={false}>
            👀
          </Link>
        </Button>
        <div className="flex flex-1 justify-between space-x-2 p-2 md:justify-end">
          <ConnectButton showAvatar={false} />
        </div>
      </div>
    </header>
  );
}
