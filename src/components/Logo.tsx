import { Home } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 mr-6">
      <div className="p-2 bg-primary rounded-lg">
        <Home className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold font-headline text-foreground hidden sm:inline-block whitespace-nowrap">
        FUD Housing Connect
      </span>
    </Link>
  );
}
