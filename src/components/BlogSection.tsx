import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { BlogPost } from '../types';
import {
  BookOpen,
  Clock,
  User,
  Search,
  ArrowRight,
  Headphones,
  X,
  Share2,
  Bookmark
} from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { blogPosts, t } = useChurch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const topics = [
    { label: t.blog.allTopics, value: 'all' },
    { label: 'Devocionales', value: 'Devocional' },
    { label: 'Estudio Bíblico', value: 'Estudio Bíblico' },
    { label: 'Noticias Comunitarias', value: 'Noticias' }
  ];

  const filtered = blogPosts.filter((post) => {
    const matchesTopic = selectedTopic === 'all' || post.category === selectedTopic;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <section id="blog" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Palabra Viva & Devocionales Diarios</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-stone-900 tracking-tight">
              {t.blog.title}
            </h2>
            <p className="mt-2 text-base text-stone-600">
              {t.blog.subtitle}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder={t.blog.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl mb-8 w-fit">
          {topics.map((top) => (
            <button
              key={top.value}
              onClick={() => setSelectedTopic(top.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedTopic === top.value
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {top.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="bg-stone-50 rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-amber-300 hover:shadow-xs transition-all group"
            >
              <div>
                {/* Clean unboxed metadata with dot separators */}
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                  <span className="font-semibold text-amber-800">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3
                  onClick={() => setActivePost(post)}
                  className="text-xl font-cinzel font-bold text-stone-900 group-hover:text-amber-800 transition-colors cursor-pointer leading-snug"
                >
                  {post.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {post.keyScripture && (
                  <div className="mt-4 p-3 rounded-xl bg-amber-100/40 border border-amber-200/50 text-[11px] text-amber-900 italic font-serif">
                    {post.keyScripture}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between">
                <div className="text-xs">
                  <strong className="block text-stone-900 font-semibold">{post.author}</strong>
                  <span className="text-[11px] text-stone-500">{post.role}</span>
                </div>

                <button
                  onClick={() => setActivePost(post)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 group-hover:translate-x-0.5 transition-all"
                >
                  <span>{t.blog.readMore}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reading Reader Modal */}
        {activePost && (
          <div className="fixed inset-0 z-60 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 my-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-semibold text-amber-800 uppercase tracking-wider">{activePost.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activePost.date}</span>
                </div>

                <button
                  onClick={() => setActivePost(null)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Byline */}
              <div className="mt-4">
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900 leading-tight">
                  {activePost.title}
                </h3>

                <div className="mt-3 flex items-center justify-between py-3 border-y border-stone-100 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-700" />
                    <span>Por <strong>{activePost.author}</strong> ({activePost.role})</span>
                  </div>

                  {activePost.audioDuration && (
                    <div className="flex items-center gap-1.5 text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">
                      <Headphones className="w-3.5 h-3.5" />
                      <span>Audio disponible: {activePost.audioDuration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Scripture Quote */}
              {activePost.keyScripture && (
                <div className="my-6 p-4 rounded-2xl bg-amber-50 border-l-4 border-amber-600 text-amber-950 text-sm font-serif italic">
                  {activePost.keyScripture}
                </div>
              )}

              {/* Article Content formatted cleanly */}
              <div className="mt-4 text-stone-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
                {activePost.content}
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Enlace del mensaje copiado para compartir.');
                  }}
                  className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartir con un hermano</span>
                </button>

                <button
                  onClick={() => setActivePost(null)}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-amber-700 hover:bg-amber-800 text-white"
                >
                  Cerrar Lectura
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
