
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Bot, Info, HelpCircle, Home } from "lucide-react";
import { Logo } from "@/components/Logo";
import { UserModeToggle } from "@/components/UserModeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/saved", label: "Saved", icon: Heart },
  { href: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { href: "/about", label: "About", icon: Info },
  { href: "/help", label: "Help", icon: HelpCircle },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                asChild
                className={cn(
                  "transition-colors",
                  pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Link href={link.href}>
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="hidden md:flex items-center">
            <UserModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
