import React, { useState } from 'react';
import { ChurchProvider } from './context/ChurchContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveStreamSection } from './components/LiveStreamSection';
import { EventsSection } from './components/EventsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { VolunteerSection } from './components/VolunteerSection';
import { GallerySection } from './components/GallerySection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { GivingModal } from './components/GivingModal';
import { ChurchWalletView } from './components/ChurchWalletView';
import { AdminModal } from './components/AdminModal';
import { NotificationModal } from './components/NotificationModal';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <ChurchProvider>
      <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
        
        {/* Navigation */}
        <Navbar
          onOpenNotifications={() => setIsNotifOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Main Sections */}
        <main className="flex-1">
          <HeroSection />
          <LiveStreamSection />
          <EventsSection />
          <ProjectsSection />
          <TestimonialsSection />
          <VolunteerSection />
          <GallerySection />
          <BlogSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals & Overlays */}
        <GivingModal />
        <ChurchWalletView />
        <AdminModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
        <NotificationModal
          isOpen={isNotifOpen}
          onClose={() => setIsNotifOpen(false)}
        />

      </div>
    </ChurchProvider>
  );
}
