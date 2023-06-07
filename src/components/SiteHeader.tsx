import { ConnectButton } from "./ConnectButton";
import { MainNav } from "./MainNav";

export function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0  z-40 w-full border-b border-yellow-100 bg-background/95 bg-zinc-800 backdrop-blur">
      <div className="container flex h-16 items-center">
        <MainNav />
        <div className="flex flex-1 justify-between space-x-2 md:justify-end">
          <ConnectButton showAvatar={false} />
        </div>
      </div>
    </header>
  );
}
