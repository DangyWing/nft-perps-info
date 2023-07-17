import Link from "next/link";

import { cn } from "~/utils/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        placeholder="blur"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        🏠
      </Link>

      <Link
        href="/trades"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        👀
      </Link>
    </nav>
  );
}
