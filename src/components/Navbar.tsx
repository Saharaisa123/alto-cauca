import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  Bell,
  Globe,
  Heart,
  Shield,
  Menu,
  X,
  Radio,
  Calendar,
  Sparkles,
  BookOpen,
  Users
} from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  onOpenNotifications: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications, onOpenAdmin }) => {
  const { lang, setLang, t, unreadNotifsCount, openGivingModal, isBiometricVerified } = useChurch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' }
  ];

  const navLinks = [
    { href: '#inicio', label: t.nav.home },
    { href: '#en-vivo', label: t.nav.live, hasLiveDot: true },
    { href: '#eventos', label: t.nav.events },
    { href: '#proyectos', label: t.nav.projects },
    { href: '#testimonios', label: t.nav.testimonials },
    { href: '#voluntarios', label: t.nav.volunteers },
    { href: '#galeria', label: t.nav.gallery },
    { href: '#blog', label: t.nav.blog }
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#inicio"
            className="flex items-center gap-2.5 text-stone-900 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-600/10 border border-amber-600/20 flex items-center justify-center text-amber-700 font-cinzel font-bold text-xl group-hover:bg-amber-600/15 transition-colors">
              ✝
            </div>
            <span className="text-xl sm:text-2xl font-cinzel font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
              {t.nav.brand}
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 hover:text-amber-700 transition-colors flex items-center gap-1.5"
              >
                {link.hasLiveDot && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors"
                title="Cambiar idioma / Change language"
              >
                <Globe className="w-4 h-4 text-stone-500" />
                <span className="uppercase">{lang}</span>
              </button>

              {langMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setLangMenuOpen(false)}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center gap-2 hover:bg-amber-50 hover:text-amber-900 transition-colors ${
                        lang === l.code ? 'text-amber-700 font-bold bg-amber-50/60' : 'text-stone-700'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors"
              title="Notificaciones de la Iglesia"
              aria-label="Notificaciones"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Admin Portal Gateway */}
            <button
              type="button"
              onClick={onOpenAdmin}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium ${
                isBiometricVerified
                  ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
              title="Panel Administrativo & Auditoría Segura"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden md:inline">
                {isBiometricVerified ? 'Admin Activo' : t.nav.adminPortal}
              </span>
            </button>

            {/* Primary Action CTA: Donate */}
            <button
              type="button"
              onClick={() => openGivingModal()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-amber-700 hover:bg-amber-800 active:scale-[0.98] rounded-xl shadow-sm transition-all whitespace-nowrap"
            >
              <Heart className="w-4 h-4 fill-white/20 text-white" />
              <span>{t.nav.donateCta}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-stone-50 border-b border-stone-200 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
            >
              <span>{link.label}</span>
              {link.hasLiveDot && (
                <span className="inline-flex items-center gap-1.5 text-xs text-red-600 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                  EN VIVO
                </span>
              )}
            </a>
          ))}

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-3 rounded-lg text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>{t.nav.adminPortal}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
