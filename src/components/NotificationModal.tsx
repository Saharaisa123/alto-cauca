import React from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  X,
  Bell,
  CheckCheck,
  Radio,
  Heart,
  Calendar,
  BookOpen,
  Volume2
} from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const {
    notifications,
    pushSubscribed,
    setPushSubscribed,
    markNotificationRead,
    markAllNotificationsRead
  } = useChurch();

  if (!isOpen) return null;

  const handleTogglePush = async () => {
    if (!pushSubscribed) {
      if ('Notification' in window) {
        try {
          const perm = await Notification.requestPermission();
          if (perm === 'granted') {
            setPushSubscribed(true);
            new Notification('🕊️ Notificaciones Activadas', {
              body: 'Recibirás avisos de cultos en vivo, eventos y movimientos de proyectos sociales.',
              icon: '/favicon.ico'
            });
          } else {
            setPushSubscribed(true); // App level simulation
          }
        } catch {
          setPushSubscribed(true);
        }
      } else {
        setPushSubscribed(true);
      }
    } else {
      setPushSubscribed(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'stream':
        return <Radio className="w-4 h-4 text-red-600" />;
      case 'giving':
        return <Heart className="w-4 h-4 text-amber-600" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'pastoral':
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-cinzel font-bold text-white">
                Centro de Notificaciones Push
              </h3>
              <p className="text-[11px] text-stone-300">
                Avisos en tiempo real para la congregación
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Push Subscription Toggle Banner */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-stone-900">
              Alertas Push en tu Dispositivo
            </p>
            <p className="text-[11px] text-stone-500">
              {pushSubscribed
                ? 'Suscripción activa para transmisiones y ofrendas'
                : 'Activa alertas automáticas en este navegador'}
            </p>
          </div>

          <button
            onClick={handleTogglePush}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              pushSubscribed
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            {pushSubscribed ? '✓ Activadas' : 'Activar Alertas'}
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-2.5">
          {notifications.length === 0 ? (
            <p className="text-center py-8 text-xs text-stone-500">
              No tienes notificaciones pendientes.
            </p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-white border-stone-200 text-stone-600'
                    : 'bg-amber-50/60 border-amber-200 text-stone-900 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-white border border-stone-200 shadow-xs">
                    {getCategoryIcon(notif.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-stone-900">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1 leading-snug">
                      {notif.message}
                    </p>
                    {notif.link && (
                      <a
                        href={notif.link}
                        onClick={onClose}
                        className="inline-block mt-1.5 text-[11px] font-semibold text-amber-700 hover:underline"
                      >
                        Ver detalles →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <button
            onClick={markAllNotificationsRead}
            className="text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Marcar todas como leídas</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 font-bold rounded-lg bg-stone-900 text-white"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
