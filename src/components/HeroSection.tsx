import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { Play, Heart, Calendar, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t, openGivingModal, openWalletReport } = useChurch();

  return (
    <section id="inicio" className="relative overflow-hidden bg-stone-900 text-stone-100">
      {/* Background Hero Sanctuary Image with high-contrast cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_sanctuary_worship_1790550968006.jpg"
          alt="Santuario de la Iglesia del Dios Altísimo en adoración"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-stone-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
        {/* Editorial Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>{t.hero.kicker}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cinzel font-bold tracking-tight text-white max-w-4xl leading-[1.15] text-balance">
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-stone-300 max-w-2xl leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Verse of the day callout */}
        <div className="mt-8 p-4 sm:p-5 max-w-2xl rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <p className="text-sm sm:text-base italic text-amber-200/90 font-serif">
            {t.hero.verseOfDay}
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#en-vivo"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] shadow-lg shadow-amber-500/20 transition-all text-sm sm:text-base"
          >
            <Play className="w-4 h-4 fill-stone-900" />
            <span>{t.hero.watchLive}</span>
          </a>

          <a
            href="#eventos"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 active:scale-[0.98] border border-white/20 backdrop-blur-sm transition-all text-sm sm:text-base"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>{t.hero.joinSunday}</span>
          </a>

          <button
            type="button"
            onClick={() => openGivingModal()}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 active:scale-[0.98] border border-amber-500/30 transition-all text-sm sm:text-base"
          >
            <Heart className="w-4 h-4 fill-amber-400/20" />
            <span>{t.hero.donateNow}</span>
          </button>
        </div>

        {/* Operational Strip */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-stone-300 text-sm">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-white font-medium">Horarios de Reunión</p>
              <p className="text-stone-400 text-xs">Dom: 10am & 6pm · Mié: 7:30pm</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-white font-medium">Transparencia Financiera</p>
              <button
                onClick={openWalletReport}
                className="text-amber-400 hover:text-amber-300 text-xs flex items-center gap-1 underline"
              >
                <span>Ver Billetera Digital Auditada</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div>
              <p className="text-white font-medium">Comunidad Abierta</p>
              <p className="text-stone-400 text-xs">Todos son bienvenidos en la Casa de Dios</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
