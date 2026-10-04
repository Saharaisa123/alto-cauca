import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { VolunteerApplication } from '../types';
import {
  Users,
  Mic2,
  Video,
  Smile,
  HeartHandshake,
  CheckCircle2,
  Send,
  HelpCircle,
  Sparkles,
  ClipboardList
} from 'lucide-react';

export const VolunteerSection: React.FC = () => {
  const { submitVolunteerApplication, t } = useChurch();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ministry, setMinistry] = useState<VolunteerApplication['ministry']>('Alabanza');
  const [availability, setAvailability] = useState('');
  const [talents, setTalents] = useState('');

  const [assignedCode, setAssignedCode] = useState<string | null>(null);

  const ministries = [
    {
      id: 'Alabanza',
      name: 'Alabanza & Adoración',
      icon: Mic2,
      desc: 'Músicos instrumentistas (piano, guitarra, bajo, batería) y voces consagradas para dirigir a la iglesia en la presencia de Dios.'
    },
    {
      id: 'Medios',
      name: 'Medios & Transmisión',
      icon: Video,
      desc: 'Operadores de cámaras HD, dirección de switcher, mezcla de audio en vivo, iluminación y diseño multimedia.'
    },
    {
      id: 'Infantil',
      name: 'Escuela Bíblica Infantil',
      icon: Smile,
      desc: 'Maestros y educadores apasionados por sembrar la Palabra de Dios en la infancia a través de pedagogía y amor.'
    },
    {
      id: 'AccionSocial',
      name: 'Acción Social & Comedor',
      icon: HeartHandshake,
      desc: 'Servicio en la preparación de almuerzos, brigadas de salud y entrega de mercados en sectores de extrema necesidad.'
    },
    {
      id: 'Ujieres',
      name: 'Bienvenida & Protocolo',
      icon: Users,
      desc: 'Primer rostro de amor y bienvenida a los asistentes, orden en el templo y asistencia en la Santa Cena.'
    },
    {
      id: 'Consejeria',
      name: 'Intercesión & Oración',
      icon: HelpCircle,
      desc: 'Guerreros de oración que sostienen espiritualmente a los enfermos, quebrantados de corazón y nuevas familias.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    const code = submitVolunteerApplication({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      ministry,
      availability: availability.trim() || 'Fines de semana',
      talents: talents.trim() || 'Deseo de servir de todo corazón.'
    });

    setAssignedCode(code);
  };

  return (
    <section id="voluntarios" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Servicio Sacrificial con Alegría</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-stone-900 tracking-tight">
            {t.volunteers.title}
          </h2>
          <p className="mt-2 text-base text-stone-600">
            {t.volunteers.subtitle}
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {ministries.map((m) => {
            const Icon = m.icon;
            const isSelected = ministry === m.id;

            return (
              <div
                key={m.id}
                onClick={() => setMinistry(m.id as any)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/50 ring-2 ring-amber-600/20 shadow-xs'
                    : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  isSelected ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-cinzel font-bold text-stone-900 mb-1.5">
                  {m.name}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {m.desc}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-amber-800">
                  <span>{isSelected ? '✓ Seleccionado para inscripción' : 'Clic para seleccionar'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-stone-50 rounded-3xl border border-stone-200 p-8 shadow-sm">
          {!assignedCode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-cinzel font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200">
                {t.volunteers.applyTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    {t.volunteers.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan David Castro"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    {t.volunteers.email} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    {t.volunteers.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+57 300 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    {t.volunteers.ministryLabel}
                  </label>
                  <select
                    value={ministry}
                    onChange={(e) => setMinistry(e.target.value as any)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {ministries.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  {t.volunteers.availabilityLabel}
                </label>
                <input
                  type="text"
                  placeholder="Ej: Domingos en la mañana y jueves en la noche para ensayos"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  {t.volunteers.talentsLabel}
                </label>
                <textarea
                  rows={3}
                  placeholder="Cuéntanos tus talentos, dones, experiencia en otras iglesias o formación..."
                  value={talents}
                  onChange={(e) => setTalents(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.volunteers.submitApplication}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-cinzel font-bold text-stone-900">
                ¡Inscripción Exitosa!
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                {t.volunteers.successModal}
              </p>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 inline-block text-left text-xs space-y-1">
                <p className="text-stone-500">Radicado de Solicitud:</p>
                <strong className="text-base font-mono text-amber-700">{assignedCode}</strong>
                <p className="text-stone-400 text-[10px]">Guarda este código para consultar el estado en secretaría.</p>
              </div>

              <div>
                <button
                  onClick={() => {
                    setAssignedCode(null);
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setAvailability('');
                    setTalents('');
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-stone-200 hover:bg-stone-300 text-stone-800"
                >
                  Inscribir a otra persona
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
