import React, { useState, useEffect, useRef } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Users,
  Send,
  Heart,
  FileText,
  Radio,
  Download,
  Share2,
  Headphones,
  Check
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  city: string;
  text: string;
  timestamp: string;
}

const INITIAL_CHAT: ChatMessage[] = [
  { id: 'c1', sender: 'Hermana Marta', city: 'Medellín', text: '¡Bendiciones familia! Conectada con mis tres hijos adorando.', timestamp: '10:04' },
  { id: 'c2', sender: 'Hermano David', city: 'Santiago', text: 'Poderosa la presencia del Señor hoy. ¡Amén!', timestamp: '10:07' },
  { id: 'c3', sender: 'Pastora Ruth', city: 'Bogotá', text: 'Oramos por sanidad y fortaleza para todos los hogares.', timestamp: '10:10' },
  { id: 'c4', sender: 'Carlos & Andrea', city: 'Quito', text: 'Recibimos esa palabra con fe para nuestra empresa.', timestamp: '10:12' }
];

export const LiveStreamSection: React.FC = () => {
  const { t } = useChurch();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [viewersCount, setViewersCount] = useState(1482);
  const [amenCount, setAmenCount] = useState(384);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [inputMessage, setInputMessage] = useState('');
  const [senderName, setSenderName] = useState('Hermano(a)');
  const [activeTab, setActiveTab] = useState<'chat' | 'notes' | 'archive'>('chat');
  const [copiedNotes, setCopiedNotes] = useState(false);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Fluctuate viewers subtly to mimic live broadcast
  useEffect(() => {
    const interval = setInterval(() => {
      setViewersCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: `c-${Date.now()}`,
      sender: senderName.trim() || 'Feligrés',
      city: 'En Línea',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputMessage('');
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAmen = () => {
    setAmenCount(prev => prev + 1);
    const amenMsg: ChatMessage = {
      id: `amen-${Date.now()}`,
      sender: senderName.trim() || 'Feligrés',
      city: 'Adoración',
      text: '¡Gloria a Dios! ¡AMÉN! 🙏🔥',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, amenMsg]);
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const sermonNotesText = `Sermón: "La Gloria Postrera de Esta Casa"
Expositor: Pastor Samuel Morales
Lectura Bíblica: Hageo 2:9 & Filipenses 4:19

I. DIOS NO HA TERMINADO CONTIGO
- El pasado fue glorioso, pero Dios promete una unción mayor para este tiempo.
- Nuestra identidad está fundada en el pacto de Cristo, no en nuestras fuerzas.

II. SANTIFICACIÓN Y GENEROSIDAD
- Una vasija limpia es un canal para bendecir a otros.
- El sembrador que confía en Dios nunca sufre escasez.

III. LA PAZ QUE SOBREPASA TODO ENTENDIMIENTO
- En este lugar daré paz, dice Jehová de los ejércitos.
- Confianza plena aun en medio de la tormenta.`;

  const copyNotes = () => {
    navigator.clipboard.writeText(sermonNotesText);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  return (
    <section id="en-vivo" className="py-20 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span>{t.live.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-stone-900 tracking-tight">
            {t.live.title}
          </h2>
          <p className="mt-3 text-base text-stone-600">
            {t.live.subtitle}
          </p>
        </div>

        {/* Main Streaming Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Video Player Column */}
          <div className="lg:col-span-8 bg-stone-900 rounded-2xl overflow-hidden shadow-xl border border-stone-800">
            <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
              <img
                src="/src/assets/images/live_stream_sermon_1790550978879.jpg"
                alt="Transmisión del sermón en vivo"
                className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-95' : 'opacity-60'}`}
                referrerPolicy="no-referrer"
              />

              {/* Streaming Overlay Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                <span className="px-2.5 py-1 rounded-md bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  LIVE HD 1080p
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-stone-200 text-xs font-medium flex items-center gap-1.5 border border-white/10">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>{viewersCount.toLocaleString()} {t.live.viewers}</span>
                </span>
              </div>

              {/* Play Pause Center overlay if paused */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute z-20 p-5 rounded-full bg-amber-500 text-stone-900 shadow-2xl hover:scale-110 transition-transform"
                >
                  <Play className="w-8 h-8 fill-stone-900 ml-1" />
                </button>
              )}

              {/* Video Player Control Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex items-center justify-between text-white z-20">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 hover:text-amber-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 hover:text-amber-400 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <span className="text-xs font-medium text-stone-300">
                    Santuario Principal · Transmisión en Tiempo Real
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="hidden sm:inline px-2 py-0.5 rounded bg-white/10 text-stone-300">
                    Audio Estéreo 320kbps
                  </span>
                  <button
                    onClick={() => {
                      if (!document.fullscreenElement) {
                        document.getElementById('en-vivo')?.requestFullscreen().catch(() => {});
                      } else {
                        document.exitFullscreen().catch(() => {});
                      }
                    }}
                    className="p-1.5 hover:text-amber-400 transition-colors"
                    title="Pantalla Completa"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stream Info Bar */}
            <div className="p-5 bg-stone-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-stone-800">
              <div>
                <h3 className="text-lg font-cinzel font-semibold text-white">
                  {t.live.nowPlaying}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  {t.live.pastor} · Serie: "Fundamentos para Tiempos Proféticos"
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleAmen}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md active:scale-95 transition-all"
                >
                  <Heart className="w-4 h-4 fill-stone-950" />
                  <span>{t.live.sendAmen} ({amenCount})</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('¡Enlace de la transmisión copiado al portapapeles!');
                  }}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs flex items-center gap-1.5"
                  title="Compartir transmisión"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Chat & Notes Panel */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
            
            {/* Tab Selector */}
            <div className="flex border-b border-stone-200 bg-stone-50 p-1">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>{t.live.chatTitle}</span>
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'notes'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Notas</span>
              </button>
              <button
                onClick={() => setActiveTab('archive')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'archive'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Audios</span>
              </button>
            </div>

            {/* TAB CONTENT: CHAT */}
            {activeTab === 'chat' && (
              <>
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/60 text-amber-900 text-[11px] leading-relaxed">
                    📖 <strong>Moderador Pastoral:</strong> Bienvenidos a la transmisión en vivo. Escribe tus peticiones de oración para que el equipo de intercesión clame por ti.
                  </div>

                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-stone-800">{msg.sender}</span>
                        <span className="text-stone-400 text-[10px]">{msg.timestamp}</span>
                      </div>
                      <p className="text-stone-700 leading-snug">{msg.text}</p>
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-3 border-t border-stone-200 bg-stone-50 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Tu nombre (opcional)"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-1/3 px-2.5 py-1.5 text-xs rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      placeholder={t.live.chatPlaceholder}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs flex items-center justify-center transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* TAB CONTENT: SERMON NOTES */}
            {activeTab === 'notes' && (
              <div className="flex-1 p-5 overflow-y-auto flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-stone-900 text-sm font-cinzel">
                      {t.live.notesTitle}
                    </h4>
                    <span className="text-[11px] text-stone-500">Culto Dominical</span>
                  </div>
                  <pre className="text-xs text-stone-700 whitespace-pre-wrap font-sans leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                    {sermonNotesText}
                  </pre>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200 flex gap-2">
                  <button
                    onClick={copyNotes}
                    className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedNotes ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <FileText className="w-3.5 h-3.5" />}
                    <span>{copiedNotes ? '¡Copiado!' : 'Copiar Bosquejo'}</span>
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([sermonNotesText], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'Bosquejo_Sermon_Iglesia_Dios_Altisimo.txt';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="py-2 px-3 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ARCHIVE & AUDIO PODCAST */}
            {activeTab === 'archive' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                <p className="text-[11px] text-stone-500 mb-2">
                  Prédicas recientes en audio y video para escuchar durante tu semana:
                </p>

                {[
                  { title: 'El Fuego del Primer Amor', date: 'Dom 20 Sep', duration: '48 min', pastor: 'Pastor Samuel Morales' },
                  { title: 'Derribando Gigantes en la Intimidad', date: 'Dom 13 Sep', duration: '52 min', pastor: 'Pastora Ana Morales' },
                  { title: 'La Victoria en el Desierto', date: 'Mié 09 Sep', duration: '39 min', pastor: 'Pastor David Morales' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-stone-50 hover:bg-amber-50/50 border border-stone-200 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-stone-900">{item.title}</p>
                        <p className="text-[11px] text-stone-500 mt-0.5">{item.pastor} · {item.date}</p>
                      </div>
                      <span className="text-[10px] bg-stone-200 px-1.5 py-0.5 rounded text-stone-700">
                        {item.duration}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => alert(`Reproduciendo podcast: ${item.title}`)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 hover:text-amber-800"
                      >
                        <Play className="w-3 h-3 fill-amber-700" />
                        <span>Escuchar audio</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
