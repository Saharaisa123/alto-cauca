import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { GalleryItem } from '../types';
import {
  Image,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Camera
} from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { gallery } = useChurch();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = [
    { label: 'Todos los Momentos', value: 'all' },
    { label: 'Cultos & Adoración', value: 'Adoración' },
    { label: 'Bautismos', value: 'Bautismos' },
    { label: 'Acción Social', value: 'Acción Social' },
    { label: 'Comunidad Global', value: 'Comunidad' }
  ];

  const filtered = selectedCategory === 'all'
    ? gallery
    : gallery.filter(g => g.category === selectedCategory);

  const openLightbox = (index: number) => setActiveImageIndex(index);
  const closeLightbox = () => setActiveImageIndex(null);

  const nextImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % filtered.length);
  };

  const prevImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + filtered.length) % filtered.length);
  };

  return (
    <section id="galeria" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Memoria & Vida de la Iglesia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-stone-900 tracking-tight">
              Galería Fotográfica & Testimonios Visuales
            </h2>
            <p className="mt-2 text-base text-stone-600">
              Registros visuales de la obra del Espíritu Santo en nuestras reuniones, bautismos y misiones comunitarias.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl">
            {categories.map((c) => (
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
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden bg-stone-200 cursor-pointer aspect-4/3 shadow-xs hover:shadow-lg transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                  {item.category} · {item.date}
                </span>
                <p className="font-cinzel text-sm font-bold mt-0.5 leading-snug">
                  {item.title}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-stone-300">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Ampliar fotografía</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImageIndex !== null && filtered[activeImageIndex] && (
          <div className="fixed inset-0 z-60 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-white transition-colors z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-white transition-colors z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
              <img
                src={filtered[activeImageIndex].image}
                alt={filtered[activeImageIndex].title}
                className="max-h-[65vh] w-auto rounded-2xl object-contain shadow-2xl border border-stone-800"
                referrerPolicy="no-referrer"
              />

              <div className="mt-4 text-center text-white max-w-xl">
                <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
                  {filtered[activeImageIndex].category} · {filtered[activeImageIndex].date}
                </span>
                <h4 className="text-xl font-cinzel font-bold mt-1">
                  {filtered[activeImageIndex].title}
                </h4>
                <p className="text-xs text-stone-300 mt-1 italic">
                  {filtered[activeImageIndex].description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
