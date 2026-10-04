import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { Heart, Users, Target, ShieldCheck, ArrowUpRight, Wallet } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects, t, openGivingModal, openWalletReport } = useChurch();

  return (
    <section id="proyectos" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">
              <Heart className="w-3.5 h-3.5 fill-amber-700/20" />
              <span>Acción Social & Proyectos del Reino</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-stone-900 tracking-tight">
              {t.giving.title}
            </h2>
            <p className="mt-2 text-base text-stone-600 max-w-2xl">
              {t.giving.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openWalletReport}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 hover:border-amber-600 text-stone-800 text-xs sm:text-sm font-semibold transition-colors bg-stone-50"
            >
              <Wallet className="w-4 h-4 text-amber-700" />
              <span>{t.nav.wallet} & Transparencia</span>
            </button>

            <button
              onClick={() => openGivingModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>{t.nav.donateCta}</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => {
            const percent = Math.min(100, Math.round((proj.currentAmount / proj.goalAmount) * 100));

            return (
              <div
                key={proj.id}
                className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden hover:border-amber-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-stone-200">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-white/10">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-cinzel font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-xs text-stone-500">
                      <Users className="w-3.5 h-3.5 text-amber-700" />
                      <span>Impacto: <strong className="text-stone-800">{proj.beneficiaries}</strong></span>
                    </div>

                    {/* Progress Bar & Numerical Figures */}
                    <div className="mt-6 pt-4 border-t border-stone-200/80">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-stone-800">
                          ${proj.currentAmount.toLocaleString()} USD
                        </span>
                        <span className="text-stone-500">
                          Meta: ${proj.goalAmount.toLocaleString()} USD
                        </span>
                      </div>

                      <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-600 rounded-full transition-all duration-700"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 font-mono tabular-nums">
                        <span>{percent}% financiado</span>
                        <span>{proj.donorsCount} donantes comprometidos</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => openGivingModal(proj.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Heart className="w-4 h-4 fill-white/20" />
                    <span>Ofrendar a este Proyecto</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security and Transparency Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-600 text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">
                Pasarela de Donaciones Cifrada con E2EE y Billetera Digital Auditada
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Aceptamos tarjetas internacionales, criptomonedas (BTC, ETH, USDT) y métodos bancarios locales con libros contables verificables.
              </p>
            </div>
          </div>

          <button
            onClick={openWalletReport}
            className="px-4 py-2 text-xs font-semibold text-amber-900 bg-amber-200/80 hover:bg-amber-200 rounded-lg transition-colors whitespace-nowrap"
          >
            Consultar Auditoría Pública
          </button>
        </div>

      </div>
    </section>
  );
};
