import React from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  Heart,
  Shield,
  MapPin,
  Clock,
  Phone,
  Mail,
  Lock,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, openGivingModal, openWalletReport } = useChurch();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-cinzel font-bold text-lg">
                ✝
              </div>
              <span className="text-xl font-cinzel font-bold tracking-tight text-white">
                {t.nav.brand}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Comunidad cristiana comprometida con la proclamación del Evangelio de Jesucristo, la restauración integral de la familia y el servicio compasivo al prójimo.
            </p>

            <div className="pt-2 text-xs text-stone-400 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Transacciones seguras cifradas con E2EE</span>
            </div>
          </div>

          {/* Col 2: Cultos & Horarios */}
          <div className="space-y-3">
            <h4 className="text-sm font-cinzel font-bold text-white uppercase tracking-wider">
              Horarios de Culto
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200 block">Culto Dominical Principal:</strong>
                  <span>10:00 AM - 12:30 PM (Presencial & En Vivo)</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200 block">Culto de Avivamiento Familiar:</strong>
                  <span>06:00 PM - 08:00 PM</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200 block">Miércoles de Intercesión y Poder:</strong>
                  <span>07:30 PM - 09:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Enlaces Rápidos & Transparencia */}
          <div className="space-y-3">
            <h4 className="text-sm font-cinzel font-bold text-white uppercase tracking-wider">
              Comunidad & Recursos
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#en-vivo" className="hover:text-amber-300 transition-colors">
                  Transmisión en Vivo HD
                </a>
              </li>
              <li>
                <a href="#eventos" className="hover:text-amber-300 transition-colors">
                  Calendario de Actividades
                </a>
              </li>
              <li>
                <a href="#proyectos" className="hover:text-amber-300 transition-colors">
                  Proyectos de Ayuda Social
                </a>
              </li>
              <li>
                <a href="#voluntarios" className="hover:text-amber-300 transition-colors">
                  Registro para Nuevos Servidores
                </a>
              </li>
              <li>
                <button
                  onClick={openWalletReport}
                  className="hover:text-amber-300 transition-colors text-left flex items-center gap-1.5 text-amber-400"
                >
                  <Shield className="w-3 h-3" />
                  <span>Auditoría de Billetera Digital</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Sede & Contacto */}
          <div className="space-y-3">
            <h4 className="text-sm font-cinzel font-bold text-white uppercase tracking-wider">
              Ubicación & Contacto
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Avenida Esperanza #45-80, Santuario Central</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Línea Pastoral: +57 (1) 789-4020</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>contacto@iglesiadeldiosaltisimo.org</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => openGivingModal()}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-3.5 h-3.5 fill-stone-950" />
                <span>Ofrendar en Línea Ahora</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>
            © {new Date().getFullYear()} Iglesia del Dios Altísimo. Todos los derechos reservados para la gloria de Dios.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={openWalletReport}
              className="hover:text-stone-300 transition-colors"
            >
              Libro Contable Auditado
            </button>
            <span aria-hidden="true">·</span>
            <a href="#inicio" className="hover:text-stone-300 transition-colors">
              Términos de Mayordomía
            </a>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors flex items-center gap-1"
              title="Volver arriba"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
