import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Testimonial } from '../types';
import {
  Quote,
  CheckCircle,
  PlusCircle,
  X,
  Send,
  Sparkles,
  Heart
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, submitTestimonial, t } = useChurch();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form states
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState<Testimonial['category']>('Sanidad');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Only show approved testimonials on public page
  const approvedTestimonials = testimonials.filter(t => t.approved);

  const filtered = selectedCategory === 'all'
    ? approvedTestimonials
    : approvedTestimonials.filter(t => t.category === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !title || !content) return;

    submitTestimonial({
      author: author.trim(),
      city: city.trim() || 'Miembro de la Iglesia',
      category,
      title: title.trim(),
      content: content.trim()
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsShareModalOpen(false);
      setAuthor('');
      setCity('');
      setTitle('');
      setContent('');
    }, 2500);
  };

  return (
    <section id="testimonios" className="py-20 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Obras y Milagros del Dios Altísimo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-stone-900 tracking-tight">
              {t.testimonials.title}
            </h2>
            <p className="mt-2 text-base text-stone-600 max-w-2xl">
              {t.testimonials.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.testimonials.shareCta}</span>
            </button>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl mb-8 w-fit">
          {[
            { label: 'Todos los Testimonios', value: 'all' },
            { label: 'Sanidad Divina', value: 'Sanidad' },
            { label: 'Restauración Familiar', value: 'Familia' },
            { label: 'Provisión & Finanzas', value: 'Finanzas' },
            { label: 'Fe & Salvación', value: 'Fe' }
          ].map(c => (
            <button
              key={c.value}
              onClick={() => setSelectedCategory(c.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === c.value
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-amber-300 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-amber-800">{test.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{test.date}</span>
                  </div>

                  {test.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{t.testimonials.verifiedLabel}</span>
                    </span>
                  )}
                </div>

                <Quote className="w-8 h-8 text-amber-600/20 mb-2" />

                <h3 className="text-base sm:text-lg font-cinzel font-bold text-stone-900 mb-2">
                  "{test.title}"
                </h3>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  {test.content}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <strong className="block text-xs sm:text-sm text-stone-900 font-semibold">
                    {test.author}
                  </strong>
                  <span className="text-[11px] text-stone-500">{test.city}</span>
                </div>

                <span className="text-amber-600 text-xs font-medium">
                  A Dios sea la Gloria ✝
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal to Share Testimony */}
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <h3 className="text-lg font-cinzel font-bold text-stone-900">
                  {t.testimonials.modalTitle}
                </h3>
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submittedSuccess ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-900">¡Testimonio Enviado!</h4>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto">
                    {t.testimonials.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Tu Nombre
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t.testimonials.namePlaceholder}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Ciudad / País
                      </label>
                      <input
                        type="text"
                        placeholder={t.testimonials.cityPlaceholder}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Área del Milagro / Categoría
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="Sanidad">Sanidad Divina</option>
                      <option value="Familia">Restauración Familiar</option>
                      <option value="Finanzas">Provisión y Empleo</option>
                      <option value="Fe">Fe y Transformación</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Título Breve del Testimonio
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Dios restauró mi hogar"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Tu Relato
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={t.testimonials.storyPlaceholder}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.testimonials.submitButton}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
