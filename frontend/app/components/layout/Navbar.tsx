"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Sprout,
  Menu,
  X,
  User,
  MessageSquare,
  Camera,
  BookOpen,
  Search,
  Users,
} from "lucide-react";

const navLinks = [
  { href: "/feed", label: "Akış", icon: Users },
  { href: "/analyze", label: "Bitki Analizi", icon: Camera },
  { href: "/chat", label: "AI Asistan", icon: MessageSquare },
  { href: "/forum", label: "Forum", icon: MessageSquare },
  { href: "/search", label: "Arama", icon: Search },
  { href: "/blog", label: "Blog", icon: BookOpen },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Sprout className="w-7 h-7" />
            <span>Tarımcık</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium bg-secondary text-foreground rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Kayıt Ol
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary-light"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menüyü aç"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-primary-light">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            <hr className="border-primary-light my-2" />
            <Link
              href="/login"
              className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary-light"
              onClick={() => setMobileOpen(false)}
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className="block px-3 py-2 text-sm font-medium bg-secondary text-foreground rounded-lg hover:bg-yellow-400"
              onClick={() => setMobileOpen(false)}
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
