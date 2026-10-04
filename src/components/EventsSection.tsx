import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { ChurchEvent, EventCategory } from '../types';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  Download,
  Share2,
  Video,
  Filter
} from 'lucide-react';

export const EventsSection: React.FC = () => {
  const { events, t, addRSVP } = useChurch();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [rsvpSuccessId, setRsvpSuccessId] = useState<string | null>(null);

  const categories: { label: string; value: string }[] = [
    { label: t.events.filterAll, value: 'all' },
    { label: 'Cultos Solemnes', value: 'Cultos' },
    { label: 'Jóvenes & Universitarios', value: 'Jóvenes' },
    { label: 'Oración & Clamor', value: 'Oración' },
    { label: 'Misiones & Acción Social', value: 'Misiones' }
  ];

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter(e => e.category === selectedCategory);

  const handleRSVP = (eventId: string) => {
    addRSVP(eventId);
    setRsvpSuccessId(eventId);
    setTimeout(() => {
      setRsvpSuccessId(null);
    }, 3500);
  };

  const downloadICS = (event: ChurchEvent) => {
    // Generate clean .ics format
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Iglesia del Dios Altisimo//Eventos//ES
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description} - Expositor: ${event.speaker}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="eventos" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-stone-900 tracking-tight">
              {t.events.title}
            </h2>
            <p className="mt-2 text-base text-stone-600">
              {t.events.subtitle}
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons with click handlers as per frontend-design) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.value
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const isConfirmed = rsvpSuccessId === event.id;

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <div>
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-amber-800">{event.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{event.date}</span>
                    </div>

                    {event.isVirtual && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-red-600 font-semibold">
                        <Video className="w-3 h-3" />
                        <span>En Línea</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-cinzel font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Details List */}
                  <div className="mt-5 space-y-2 text-xs text-stone-600 pt-4 border-t border-stone-100">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <User className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate">{t.events.speakerLabel}: {event.speaker}</span>
                    </div>
                  </div>
                </div>

                {/* Actions Bottom Bar */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div className="text-xs text-stone-500">
                    <strong className="text-stone-900">{event.rsvpCount}</strong> asistencias confirmadas
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadICS(event)}
                      className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                      title={t.events.addToCalendar}
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleRSVP(event.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isConfirmed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 hover:bg-amber-700 text-white'
                      }`}
                    >
                      {isConfirmed ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>¡Confirmado!</span>
                        </>
                      ) : (
                        <span>{t.events.rsvpButton}</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
