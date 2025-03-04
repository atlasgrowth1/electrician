import { useState } from "react";
import { type Business } from "@shared/schema";
import { Menu, Phone, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "wouter";

interface HeaderProps {
  business: Business;
}

export default function Header({ business }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: `/${business.site}` },
    { label: "Commercial", href: `/${business.site}/commercial` },
    { label: "Services", href: `/${business.site}#services` },
    { label: "Contact", href: `/${business.site}#contact` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={business.logo} alt={business.name} className="h-8 w-8 rounded-full" />
          <span className="font-semibold">{business.name}</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            item.href.includes('#') ? (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            )
          ))}
          <Button asChild variant="outline">
            <Link href={`/${business.site}/login`}>
              <User className="h-4 w-4 mr-2" />
              Provider Login
            </Link>
          </Button>
          <Button asChild>
            <a href={`tel:${business.phone}`}>
              <Phone className="mr-2 h-4 w-4" />
              {business.phone}
            </a>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                item.href.includes('#') ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <Button asChild variant="outline" className="w-full">
                <Link href={`/${business.site}/login`} onClick={() => setIsOpen(false)}>
                  <User className="h-4 w-4 mr-2" />
                  Provider Login
                </Link>
              </Button>
              <Button asChild className="w-full">
                <a href={`tel:${business.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}