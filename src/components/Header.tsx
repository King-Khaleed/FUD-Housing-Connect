
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Bot, Info, HelpCircle, Home, Menu } from "lucide-react";
import { Logo } from "@/components/Logo";
import { UserModeToggle } from "@/components/UserModeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";

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
      <div className="container flex h-16 items-center">
        <Logo />
        <div className="flex flex-1 items-center justify-end gap-2">
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
          <UserModeToggle />
           <div className="md:hidden">
              <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                          <Menu className="h-5 w-5" />
                          <span className="sr-only">Open menu</span>
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle className="sr-only">Main Menu</SheetTitle>
                        <SheetClose asChild>
                            <Logo />
                        </SheetClose>
                      </SheetHeader>
                      <nav className="grid gap-2 text-lg font-medium mt-4">
                          {navLinks.map((link) => (
                            <SheetClose asChild key={link.href}>
                              <Link
                                href={link.href}
                                className={cn(
                                  "flex items-center gap-4 px-2.5 py-2 rounded-lg",
                                   pathname === link.href ? "bg-muted text-primary" : "text-muted-foreground hover:text-foreground"
                                )}
                              >
                                <link.icon className="h-5 w-5" />
                                {link.label}
                              </Link>
                           </SheetClose>
                          ))}
                      </nav>
                  </SheetContent>
              </Sheet>
           </div>
        </div>
      </div>
    </header>
  );
}
