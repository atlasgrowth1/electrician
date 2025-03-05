import { useState, useEffect } from "react";
import { type Business } from "@shared/schema";
import { Menu, Phone, X, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "wouter";

interface HeaderProps {
  business: Business;
}

export default function Header({ business }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { label: "Home", href: `/${business.site}` },
    { label: "Commercial", href: `/${business.site}/commercial` },
    { label: "Services", href: `/${business.site}#services` },
    { label: "Contact", href: `/${business.site}#contact` },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 shadow-md"
        : "bg-transparent"
    }`}>
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white">
            <Zap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none">{business.name}</span>
            <span className="text-xs text-slate-500">Licensed Electrical Contractor</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            item.href.includes('#') ? (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-blue-600 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-blue-600 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          ))}
          
          <div className="border-l border-slate-200 h-6 mx-2"></div>
          
          <Button asChild variant="ghost" className="rounded-full text-blue-700 hover:text-blue-800 hover:bg-blue-50">
            <Link href={`/${business.site}/login`}>
              <User className="h-4 w-4 mr-2" />
              Provider Login
            </Link>
          </Button>
          
          <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
            <a href={`tel:${business.phone}`}>
              <Phone className="mr-2 h-4 w-4" />
              {business.phone}
            </a>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex items-center gap-3 mb-8 mt-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white">
                <Zap className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none">{business.name}</span>
                <span className="text-xs text-slate-500">Licensed Electrical Contractor</span>
              </div>
            </div>
            <nav className="flex flex-col gap-5">
              {navItems.map((item) => (
                item.href.includes('#') ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium hover:text-blue-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium hover:text-blue-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              
              <div className="border-t border-slate-200 my-4 pt-4">
                <Button asChild variant="outline" className="w-full mb-3 justify-start h-12">
                  <Link href={`/${business.site}/login`} onClick={() => setIsOpen(false)}>
                    <User className="h-5 w-5 mr-3" />
                    Provider Login
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start h-12 bg-blue-600 hover:bg-blue-700">
                  <a href={`tel:${business.phone}`}>
                    <Phone className="mr-3 h-5 w-5" />
                    Call {business.phone}
                  </a>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}