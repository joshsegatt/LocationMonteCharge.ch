import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { MCLogo } from './MCLogo';
import { cn } from '../lib/utils';

interface NavProps {
  navigateTo: (page: 'home' | 'contact') => void;
  currentPage: string;
}

export default function NavV2({ navigateTo, currentPage }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [currentPage]);

  const navLinks = [
    { label: 'Accueil', action: () => { navigateTo('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: 'À propos', href: '#about' },
    { label: 'Réalisations', href: '#realisations' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', action: () => navigateTo('contact') },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: { label: string; action?: () => void; href?: string }) => {
    e.preventDefault();
    setMobileOpen(false);
    if (link.action) {
      link.action();
      return;
    }
    if (link.href) {
      const id = link.href.replace('#', '');
      if (currentPage !== 'home') {
        navigateTo('home');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const isLightNav = scrolled || currentPage === 'contact';

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[1000] transition-all duration-300",
      isLightNav 
        ? "bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-3" 
        : "bg-transparent py-4 sm:py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0" 
          onClick={() => {
            if (currentPage === 'home') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigateTo('home');
            }
          }}
        >
          <MCLogo size={32} className="shrink-0" />
          <div className="flex flex-col">
            <span className={cn("text-lg sm:text-xl font-bold tracking-tight uppercase font-display leading-none transition-colors", isLightNav ? "text-[#053229]" : "text-white")}>
              Monte Charge
            </span>
            <span className={cn("text-[10px] font-semibold tracking-wide uppercase mt-0.5 leading-none transition-colors", isLightNav ? "text-[#053229]" : "text-[#38D9BA]")}>
              Genève
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href || '#'}
              onClick={(e) => handleLinkClick(e, link)}
              className={cn(
                "text-sm font-sans font-medium transition-colors hover:text-[#00A388] cursor-pointer",
                isLightNav ? "text-slate-800" : "text-white/90"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <a 
            href="tel:0800825925" 
            className="flex items-center gap-2 px-6 py-2.5 rounded-sm text-sm font-sans font-bold text-white transition-all bg-[#053229] hover:bg-[#084d3f] border border-white/10 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <Phone size={16} />
            <span>0800 825 925</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn("md:hidden p-2 rounded-md transition-colors cursor-pointer", isLightNav ? "text-slate-900" : "text-white")}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 lg:hidden flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href || '#'}
              onClick={(e) => handleLinkClick(e, link)}
              className="text-base font-medium text-slate-800 px-4 py-2 hover:bg-slate-50 rounded-md cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a 
            href="tel:0800825925" 
            className="flex items-center justify-center gap-2 px-6 py-3 mt-4 rounded-md text-base font-bold text-white bg-[#053229] hover:bg-[#084d3f] border border-white/10 cursor-pointer"
          >
            <Phone size={18} />
            <span>0800 825 925</span>
          </a>
        </div>
      )}
    </header>
  );
}
