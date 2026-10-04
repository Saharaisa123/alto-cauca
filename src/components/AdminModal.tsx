import React, { useState, useEffect } from 'react';
import { useChurch } from '../context/ChurchContext';
import { VolunteerApplication, Testimonial } from '../types';
import {
  X,
  Shield,
  KeyRound,
  Fingerprint,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Lock,
  LogOut,
  Users,
  Wallet,
  MessageSquare,
  Bell,
  Calendar,
  Plus,
  Send,
  FileSpreadsheet,
  Trash2,
  Check,
  Coins
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const {
    isAdminAuthenticated,
    is2FAVerified,
    isBiometricVerified,
    adminLogin,
    verify2FA,
    verifyBiometrics,
    adminLogout,
    transactions,
    testimonials,
    volunteers,
    projects,
    events,
    approveTestimonial,
    deleteTestimonial,
    updateVolunteerStatus,
    addNewEvent,
    sendBroadcastPush,
    t
  } = useChurch();

  // Auth steps
  const [password, setPassword] = useState('Altisimo2026');
  const [authError, setAuthError] = useState('');
  const [totpInput, setTotpInput] = useState('');
  const [totpCountdown, setTotpCountdown] = useState(30);
  const [isScanningBiometric, setIsScanningBiometric] = useState(false);

  // Admin active tab
  const [adminTab, setAdminTab] = useState<'overview' | 'transactions' | 'testimonials' | 'volunteers' | 'events' | 'broadcast'>('overview');

  // Push broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState('🔴 Transmisión en Vivo Iniciada');
  const [broadcastMessage, setBroadcastMessage] = useState('El culto de alabanza y adoración ha comenzado. Conéctate con nosotros.');
  const [broadcastCategory, setBroadcastCategory] = useState<'stream' | 'event' | 'giving' | 'pastoral'>('stream');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // New event form state
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCategory, setNewEventCategory] = useState<any>('Cultos');
  const [newEventDate, setNewEventDate] = useState('2026-10-15');
  const [newEventTime, setNewEventTime] = useState('10:00 AM');
  const [newEventLocation, setNewEventLocation] = useState('Santuario Principal');
  const [newEventSpeaker, setNewEventSpeaker] = useState('Pastor Samuel Morales');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [eventSuccess, setEventSuccess] = useState(false);

  // 2FA timer
  useEffect(() => {
    if (isAdminAuthenticated && !is2FAVerified) {
      const interval = setInterval(() => {
        setTotpCountdown(prev => (prev > 1 ? prev - 1 : 30));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isAdminAuthenticated, is2FAVerified]);

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const ok = adminLogin(password);
    if (!ok) {
      setAuthError('Contraseña incorrecta. Pista: Altisimo2026');
    }
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const ok = verify2FA(totpInput);
    if (!ok) {
      setAuthError('Código inválido. Ingresa 6 dígitos numéricos (ej. 777888).');
    }
  };

  const handleTriggerBiometric = async () => {
    setIsScanningBiometric(true);
    try {
      await verifyBiometrics();
    } finally {
      setIsScanningBiometric(false);
    }
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    sendBroadcastPush(broadcastTitle, broadcastMessage, broadcastCategory);
    setBroadcastSuccess(true);
    setTimeout(() => setBroadcastSuccess(false), 3000);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDesc) return;

    addNewEvent({
      title: newEventTitle,
      category: newEventCategory,
      date: newEventDate,
      time: newEventTime,
      location: newEventLocation,
      speaker: newEventSpeaker,
      description: newEventDesc,
      isVirtual: true
    });

    setEventSuccess(true);
    setNewEventTitle('');
    setNewEventDesc('');
    setTimeout(() => setEventSuccess(false), 3000);
  };

  const totalFunds = transactions.reduce((acc, t) => acc + t.convertedUSD, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Consola de Gestión y Seguridad E2EE</span>
          </div>

          <h3 className="text-2xl font-cinzel font-bold text-white">
            {t.admin.title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            {t.admin.securitySubtitle}
          </p>
        </div>

        {/* SECURITY CHECK 1: PASSWORD */}
        {!isAdminAuthenticated && (
          <div className="p-8 max-w-md mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>

            <h4 className="text-xl font-cinzel font-bold text-stone-900">
              Paso 1 de 3: Credencial Pastoral
            </h4>
            <p className="text-xs text-stone-600">
              {t.admin.authPrompt}
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.admin.passwordLabel}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña de acceso"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {authError && (
                <p className="text-xs text-red-600 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-sm transition-colors"
              >
                {t.admin.enterButton}
              </button>

              <p className="text-[11px] text-stone-400 text-center pt-2">
                Clave predeterminada autorizada: <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800">Altisimo2026</code>
              </p>
            </form>
          </div>
        )}

        {/* SECURITY CHECK 2: TWO-FACTOR AUTH (2FA) */}
        {isAdminAuthenticated && !is2FAVerified && (
          <div className="p-8 max-w-md mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
              <Smartphone className="w-6 h-6" />
            </div>

            <h4 className="text-xl font-cinzel font-bold text-stone-900">
              Paso 2 de 3: {t.admin.twoFactorTitle}
            </h4>
            <p className="text-xs text-stone-600">
              {t.admin.twoFactorSubtitle}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold">
              <span>Token dinámico válido por {totpCountdown}s</span>
            </div>

            <form onSubmit={handle2FASubmit} className="space-y-3">
              <input
                type="text"
                maxLength={6}
                autoFocus
                placeholder="777888"
                value={totpInput}
                onChange={(e) => setTotpInput(e.target.value)}
                className="w-48 mx-auto text-center text-2xl tracking-widest font-mono font-bold py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {authError && (
                <p className="text-xs text-red-600 font-semibold">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                {t.admin.verify2FA}
              </button>

              <button
                type="button"
                onClick={() => setTotpInput('777888')}
                className="text-xs text-stone-500 hover:text-stone-800 underline block mx-auto"
              >
                Autocompletar código de prueba (777888)
              </button>
            </form>
          </div>
        )}

        {/* SECURITY CHECK 3: BIOMETRICS */}
        {isAdminAuthenticated && is2FAVerified && !isBiometricVerified && (
          <div className="p-8 max-w-md mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Fingerprint className={`w-8 h-8 ${isScanningBiometric ? 'animate-pulse text-amber-600' : ''}`} />
            </div>

            <h4 className="text-xl font-cinzel font-bold text-stone-900">
              Paso 3 de 3: {t.admin.biometricTitle}
            </h4>
            <p className="text-xs text-stone-600">
              {t.admin.biometricSubtitle}
            </p>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
              <p className="font-semibold text-stone-900 mb-1">Hardware Seguro E2EE</p>
              <p>Autenticación criptográfica con WebAuthn / Sensor Biométrico del dispositivo.</p>
            </div>

            <button
              type="button"
              disabled={isScanningBiometric}
              onClick={handleTriggerBiometric}
              className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isScanningBiometric ? (
                <span>Escaneando huella / FaceID...</span>
              ) : (
                <>
                  <Fingerprint className="w-5 h-5" />
                  <span>{t.admin.scanBiometrics}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* LOGGED IN: FULL ADMIN DASHBOARD */}
        {isAdminAuthenticated && is2FAVerified && isBiometricVerified && (
          <div className="flex flex-col">
            
            {/* Admin Navigation Bar */}
            <div className="bg-stone-100 border-b border-stone-200 px-6 py-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1">
                {[
                  { id: 'overview', label: t.admin.tabOverview, icon: Shield },
                  { id: 'transactions', label: t.admin.tabTransactions, icon: Wallet },
                  { id: 'testimonials', label: t.admin.tabTestimonials, icon: MessageSquare },
                  { id: 'volunteers', label: t.admin.tabVolunteers, icon: Users },
                  { id: 'events', label: 'Crear Evento', icon: Calendar },
                  { id: 'broadcast', label: t.admin.tabBroadcast, icon: Bell }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setAdminTab(item.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        adminTab === item.id
                          ? 'bg-white text-stone-900 shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-amber-700" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={adminLogout}
                className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 py-1 px-2 rounded hover:bg-red-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              
              {/* TAB: OVERVIEW */}
              {adminTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                      <span className="text-xs text-amber-800 font-semibold">{t.admin.fundsCollected}</span>
                      <strong className="text-2xl font-bold font-mono text-stone-900 block mt-1">
                        ${totalFunds.toLocaleString()} USD
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                      <span className="text-xs text-stone-600 font-semibold">{t.admin.activeMembers}</span>
                      <strong className="text-2xl font-bold font-mono text-stone-900 block mt-1">
                        1,480+
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                      <span className="text-xs text-stone-600 font-semibold">Testimonios Aprobados</span>
                      <strong className="text-2xl font-bold font-mono text-stone-900 block mt-1">
                        {testimonials.filter(t => t.approved).length} / {testimonials.length}
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                      <span className="text-xs text-stone-600 font-semibold">Voluntarios</span>
                      <strong className="text-2xl font-bold font-mono text-stone-900 block mt-1">
                        {volunteers.length}
                      </strong>
                    </div>
                  </div>

                  {/* Quick status */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span><strong>Sesión Segura Activa:</strong> Cifrado de extremo a extremo, 2FA y validación biométrica verificadas.</span>
                    </div>
                    <span className="font-mono text-[11px] text-emerald-700">Token: 2FA-TOTP-OK</span>
                  </div>
                </div>
              )}

              {/* TAB: TRANSACTIONS & WALLET */}
              {adminTab === 'transactions' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-stone-900 text-sm">
                      Libro de Donaciones y Billetera Digital
                    </h4>
                    <span className="text-xs text-stone-500 font-mono">
                      {transactions.length} transacciones registradas
                    </span>
                  </div>

                  <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-stone-100 text-stone-600 font-semibold">
                        <tr>
                          <th className="p-2.5">Recibo</th>
                          <th className="p-2.5">Donante</th>
                          <th className="p-2.5">Proyecto</th>
                          <th className="p-2.5">Método</th>
                          <th className="p-2.5 text-right">Monto</th>
                          <th className="p-2.5 text-center">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 font-mono text-[11px]">
                        {transactions.map(t => (
                          <tr key={t.id} className="hover:bg-stone-50">
                            <td className="p-2.5 font-bold text-stone-900">{t.receiptNumber}</td>
                            <td className="p-2.5 font-sans">{t.donorName}</td>
                            <td className="p-2.5 font-sans truncate max-w-[120px]">{t.projectTitle}</td>
                            <td className="p-2.5 font-sans text-stone-600">{t.paymentDetail}</td>
                            <td className="p-2.5 text-right font-bold">${t.convertedUSD} USD</td>
                            <td className="p-2.5 text-center font-sans">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                                {t.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: TESTIMONIALS MODERATION */}
              {adminTab === 'testimonials' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-stone-900 text-sm">
                    Aprobación Pastoral de Testimonios
                  </h4>

                  <div className="space-y-3">
                    {testimonials.map((test) => (
                      <div
                        key={test.id}
                        className={`p-4 rounded-xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                          test.approved ? 'bg-stone-50 border-stone-200' : 'bg-amber-50/70 border-amber-300'
                        }`}
                      >
                        <div className="max-w-xl">
                          <div className="flex items-center gap-2 mb-1">
                            <strong className="text-stone-900 font-bold">{test.author} ({test.city})</strong>
                            <span className="text-[11px] text-stone-500">· {test.category}</span>
                            {!test.approved && (
                              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold">
                                Pendiente
                              </span>
                            )}
                          </div>
                          <p className="font-semibold text-stone-800 mb-0.5">"{test.title}"</p>
                          <p className="text-stone-600 italic line-clamp-2">{test.content}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          {!test.approved && (
                            <button
                              onClick={() => approveTestimonial(test.id)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Aprobar</span>
                            </button>
                          )}

                          <button
                            onClick={() => deleteTestimonial(test.id)}
                            className="p-1.5 rounded-lg bg-stone-200 hover:bg-red-100 text-stone-600 hover:text-red-700"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: VOLUNTEERS MANAGEMENT */}
              {adminTab === 'volunteers' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-stone-900 text-sm">
                    Solicitudes de Voluntariado para Revisión
                  </h4>

                  <div className="space-y-3">
                    {volunteers.map((vol) => (
                      <div key={vol.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-xs">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <strong className="text-stone-900 text-sm font-semibold">{vol.fullName}</strong>
                            <span className="font-mono text-stone-400 text-[11px] ml-2">({vol.code})</span>
                          </div>
                          <select
                            value={vol.status}
                            onChange={(e) => updateVolunteerStatus(vol.id, e.target.value as any)}
                            className="text-xs px-2 py-1 rounded-lg border border-stone-300 bg-white"
                          >
                            <option value="pending">Pendiente</option>
                            <option value="in_review">En Evaluación</option>
                            <option value="approved">Aprobado / Activo</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-stone-600 pt-2 border-t border-stone-200">
                          <div><strong>Ministerio:</strong> {vol.ministry}</div>
                          <div><strong>Contacto:</strong> {vol.phone} · {vol.email}</div>
                          <div><strong>Disponibilidad:</strong> {vol.availability}</div>
                        </div>

                        {vol.talents && (
                          <div className="mt-2 text-stone-700 italic">
                            <strong>Dones / Experiencia:</strong> {vol.talents}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: CREATE NEW EVENT */}
              {adminTab === 'events' && (
                <form onSubmit={handleCreateEvent} className="space-y-4 max-w-xl">
                  <h4 className="font-bold text-stone-900 text-sm">
                    Programar Nuevo Culto o Actividad Eclesial
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nombre del Evento
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Gran Vigilia de Avivamiento"
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Categoría
                      </label>
                      <select
                        value={newEventCategory}
                        onChange={(e) => setNewEventCategory(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300"
                      >
                        <option value="Cultos">Cultos</option>
                        <option value="Jóvenes">Jóvenes</option>
                        <option value="Oración">Oración</option>
                        <option value="Misiones">Misiones</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Fecha
                      </label>
                      <input
                        type="date"
                        value={newEventDate}
                        onChange={(e) => setNewEventDate(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Descripción del Evento
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Detalles bíblicos y propósito del evento..."
                      value={newEventDesc}
                      onChange={(e) => setNewEventDesc(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>

                  {eventSuccess && (
                    <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>¡Evento publicado y notificación push enviada a la comunidad!</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-sm"
                  >
                    Publicar Evento en Calendario
                  </button>
                </form>
              )}

              {/* TAB: PUSH BROADCAST */}
              {adminTab === 'broadcast' && (
                <form onSubmit={handleSendBroadcast} className="space-y-4 max-w-xl">
                  <h4 className="font-bold text-stone-900 text-sm">
                    Enviar Notificación Push a Todos los Feligreses
                  </h4>
                  <p className="text-xs text-stone-600">
                    Esta alerta se emitirá de manera instantánea a los dispositivos móviles y navegadores suscritos a la iglesia.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Título de la Alerta
                    </label>
                    <input
                      type="text"
                      required
                      value={broadcastTitle}
                      onChange={(e) => setBroadcastTitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mensaje / Contenido de la Alerta
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={broadcastMessage}
                      onChange={(e) => setBroadcastMessage(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Categoría
                    </label>
                    <select
                      value={broadcastCategory}
                      onChange={(e) => setBroadcastCategory(e.target.value as any)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300"
                    >
                      <option value="stream">Transmisión en Vivo</option>
                      <option value="giving">Ofrendas & Transparencia</option>
                      <option value="event">Recordatorio de Evento</option>
                      <option value="pastoral">Mensaje Pastoral</option>
                    </select>
                  </div>

                  {broadcastSuccess && (
                    <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>¡Notificación Push enviada exitosamente a la congregación!</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-sm flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Emitir Notificación Push Ahora</span>
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
