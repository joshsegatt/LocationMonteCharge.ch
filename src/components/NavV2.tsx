import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { MCLogo } from './MCLogo';
import { cn } from '../lib/utils';

interface NavProps {
  navigateTo: (page: string) => void;
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
    { label: 'Zones & Villes', href: '#zones' },
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

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[1000] transition-all duration-300",
      scrolled 
        ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_rgba(10,25,47,0.05)] py-3" 
        : "bg-white/60 backdrop-blur-xs border-b border-slate-200/40 py-3.5 sm:py-4"
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
            <span className="text-lg sm:text-xl font-bold tracking-tight uppercase font-display leading-none text-slate-950">
              Monte Charge
            </span>
            <span className="text-[10px] font-bold tracking-wider uppercase mt-0.5 leading-none text-[#0052A3]">
              Genève • BatiMove
            </span>
          </div>
        </div>

        {/* Desktop & Tablet Links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href || '#'}
              onClick={(e) => handleLinkClick(e, link)}
              className="text-xs lg:text-sm font-sans font-medium transition-colors text-slate-600 hover:text-slate-950 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center">
          <a 
            href="tel:0800825925" 
            className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg text-xs lg:text-sm font-sans font-bold text-white transition-all bg-[#E10600] hover:bg-[#C80500] shadow-[0_4px_16px_rgba(225,6,0,0.35)] hover:shadow-[0_6px_22px_rgba(225,6,0,0.5)] active:scale-95 cursor-pointer"
          >
            <Phone size={15} />
            <span>0800 825 925</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-md transition-colors text-slate-900 cursor-pointer"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-[#F1F5F8] shadow-xl border-t border-slate-200/80 md:hidden flex flex-col p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href || '#'}
              onClick={(e) => handleLinkClick(e, link)}
              className="text-base font-medium text-slate-800 px-4 py-2 hover:bg-slate-50 hover:text-[#0052A3] rounded-md cursor-pointer transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a 
            href="tel:0800825925" 
            className="flex items-center justify-center gap-2 px-6 py-3 mt-4 rounded-md text-base font-bold text-white bg-[#E10600] hover:bg-[#C80500] shadow-md transition-all cursor-pointer"
          >
            <Phone size={18} />
            <span>0800 825 925</span>
          </a>
        </div>
      )}
    </header>
  );
}
