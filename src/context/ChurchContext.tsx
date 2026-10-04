import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  ChurchEvent,
  SocialProject,
  DonationTransaction,
  Testimonial,
  VolunteerApplication,
  BlogPost,
  GalleryItem,
  PushNotification,
  Language
} from '../types';
import {
  INITIAL_EVENTS,
  INITIAL_PROJECTS,
  INITIAL_TRANSACTIONS,
  INITIAL_TESTIMONIALS,
  INITIAL_VOLUNTEERS,
  INITIAL_BLOG_POSTS,
  INITIAL_GALLERY,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';
import { translations } from '../i18n/translations';

interface ChurchContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations['es'];
  events: ChurchEvent[];
  projects: SocialProject[];
  transactions: DonationTransaction[];
  testimonials: Testimonial[];
  volunteers: VolunteerApplication[];
  blogPosts: BlogPost[];
  gallery: GalleryItem[];
  notifications: PushNotification[];
  unreadNotifsCount: number;
  pushSubscribed: boolean;
  setPushSubscribed: (val: boolean) => void;
  addRSVP: (eventId: string) => void;
  submitDonation: (donation: Omit<DonationTransaction, 'id' | 'receiptNumber' | 'date'>) => Promise<DonationTransaction>;
  submitTestimonial: (data: Omit<Testimonial, 'id' | 'date' | 'verified' | 'approved'>) => void;
  submitVolunteerApplication: (data: Omit<VolunteerApplication, 'id' | 'code' | 'status' | 'appliedAt'>) => string;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  sendBroadcastPush: (title: string, message: string, category: PushNotification['category']) => void;
  // Admin functions
  approveTestimonial: (id: string) => void;
  deleteTestimonial: (id: string) => void;
  updateVolunteerStatus: (id: string, status: VolunteerApplication['status']) => void;
  addNewEvent: (event: Omit<ChurchEvent, 'id' | 'rsvpCount'>) => void;
  addNewBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  // Admin auth
  isAdminAuthenticated: boolean;
  is2FAVerified: boolean;
  isBiometricVerified: boolean;
  adminLogin: (password: string) => boolean;
  verify2FA: (code: string) => boolean;
  verifyBiometrics: () => Promise<boolean>;
  adminLogout: () => void;
  // Modal states
  isGivingModalOpen: boolean;
  openGivingModal: (projectId?: string) => void;
  closeGivingModal: () => void;
  selectedProjectId?: string;
  isWalletReportOpen: boolean;
  openWalletReport: () => void;
  closeWalletReport: () => void;
}

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

export const ChurchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('church_lang') as Language) || 'es';
  });

  const [events, setEvents] = useState<ChurchEvent[]>(() => {
    const saved = localStorage.getItem('church_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [projects, setProjects] = useState<SocialProject[]>(() => {
    const saved = localStorage.getItem('church_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [transactions, setTransactions] = useState<DonationTransaction[]>(() => {
    const saved = localStorage.getItem('church_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('church_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>(() => {
    const saved = localStorage.getItem('church_volunteers');
    return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('church_blog');
    return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
  });

  const [gallery] = useState<GalleryItem[]>(INITIAL_GALLERY);

  const [notifications, setNotifications] = useState<PushNotification[]>(() => {
    const saved = localStorage.getItem('church_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [pushSubscribed, setPushSubscribed] = useState<boolean>(() => {
    return localStorage.getItem('church_push_enabled') === 'true';
  });

  // Admin auth states
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [is2FAVerified, setIs2FAVerified] = useState<boolean>(false);
  const [isBiometricVerified, setIsBiometricVerified] = useState<boolean>(false);

  // Modals
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>();
  const [isWalletReportOpen, setIsWalletReportOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('church_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('church_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('church_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('church_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('church_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('church_volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem('church_blog', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('church_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('church_push_enabled', pushSubscribed.toString());
  }, [pushSubscribed]);

  const t = translations[lang];

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const addRSVP = (eventId: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return { ...evt, rsvpCount: evt.rsvpCount + 1 };
      }
      return evt;
    }));
  };

  const submitDonation = async (
    data: Omit<DonationTransaction, 'id' | 'receiptNumber' | 'date'>
  ): Promise<DonationTransaction> => {
    // Generate unique verifiable receipt
    const newTx: DonationTransaction = {
      ...data,
      id: `tx-${Date.now()}`,
      receiptNumber: `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setTransactions(prev => [newTx, ...prev]);

    // Update project raised amount
    setProjects(prev => prev.map(proj => {
      if (proj.id === data.projectId) {
        return {
          ...proj,
          currentAmount: proj.currentAmount + data.convertedUSD,
          donorsCount: proj.donorsCount + 1
        };
      }
      return proj;
    }));

    // Trigger an automatic push notification for transparency
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title: '🕊️ Nueva Ofrenda Recibida',
      message: `Se registró una ofrenda de $${data.convertedUSD} USD para "${data.projectTitle}". ¡Dios multiplique tu semilla!`,
      timestamp: 'Ahora',
      read: false,
      category: 'giving',
      link: '#proyectos'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Native browser notification if permitted
    if (pushSubscribed && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(newNotif.title, {
          body: newNotif.message,
          icon: '/favicon.ico'
        });
      } catch {
        // Safe fallback
      }
    }

    return newTx;
  };

  const submitTestimonial = (data: Omit<Testimonial, 'id' | 'date' | 'verified' | 'approved'>) => {
    const newTest: Testimonial = {
      ...data,
      id: `test-${Date.now()}`,
      date: new Date().toISOString().substring(0, 10),
      verified: true,
      approved: false // Pending pastoral review
    };
    setTestimonials(prev => [newTest, ...prev]);

    // Pastoral notification
    const pastoralNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title: '🙏 Nuevo Testimonio Enviado',
      message: `${data.author} (${data.city}) envió un testimonio sobre ${data.category}. Pendiente de aprobación en el panel.`,
      timestamp: 'Ahora',
      read: false,
      category: 'pastoral'
    };
    setNotifications(prev => [pastoralNotif, ...prev]);
  };

  const submitVolunteerApplication = (
    data: Omit<VolunteerApplication, 'id' | 'code' | 'status' | 'appliedAt'>
  ): string => {
    const code = `VOL-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newVol: VolunteerApplication = {
      ...data,
      id: `vol-${Date.now()}`,
      code,
      status: 'pending',
      appliedAt: new Date().toISOString().substring(0, 10)
    };
    setVolunteers(prev => [newVol, ...prev]);

    const volNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title: '🤝 Nueva Solicitud de Voluntario',
      message: `${data.fullName} se inscribió para el ministerio de ${data.ministry}. Radicado: ${code}`,
      timestamp: 'Ahora',
      read: false,
      category: 'pastoral'
    };
    setNotifications(prev => [volNotif, ...prev]);

    return code;
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const sendBroadcastPush = (title: string, message: string, category: PushNotification['category']) => {
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Ahora',
      read: false,
      category
    };
    setNotifications(prev => [newNotif, ...prev]);

    if (pushSubscribed && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body: message,
          icon: '/favicon.ico'
        });
      } catch {
        // Safe fallback
      }
    }
  };

  // Admin approvals
  const approveTestimonial = (id: string) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, approved: true } : t));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const updateVolunteerStatus = (id: string, status: VolunteerApplication['status']) => {
    setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  const addNewEvent = (event: Omit<ChurchEvent, 'id' | 'rsvpCount'>) => {
    const newEvt: ChurchEvent = {
      ...event,
      id: `evt-${Date.now()}`,
      rsvpCount: 0
    };
    setEvents(prev => [...prev, newEvt]);
    sendBroadcastPush(
      '📅 Nuevo Evento Agendado',
      `Se ha programado: "${event.title}" para el ${event.date}. ¡Acompáñanos!`,
      'event'
    );
  };

  const addNewBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}`
    };
    setBlogPosts(prev => [newPost, ...prev]);
    sendBroadcastPush(
      '📖 Nueva Palabra Pastoral',
      `Nuevo devocional publicado: "${post.title}" por ${post.author}.`,
      'pastoral'
    );
  };

  // Admin authentication handlers
  const adminLogin = (password: string): boolean => {
    // Standard pastoral supervisor access code
    if (password === 'Altisimo2026' || password === 'admin' || password === 'pastor') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const verify2FA = (code: string): boolean => {
    // Accepts any 6-digit TOTP format or 777888 standard
    if (/^\d{6}$/.test(code.trim())) {
      setIs2FAVerified(true);
      return true;
    }
    return false;
  };

  const verifyBiometrics = async (): Promise<boolean> => {
    // Simulate biometric sensor delay & authentication
    await new Promise(res => setTimeout(res, 1200));
    setIsBiometricVerified(true);
    return true;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setIs2FAVerified(false);
    setIsBiometricVerified(false);
  };

  const openGivingModal = (projectId?: string) => {
    setSelectedProjectId(projectId);
    setIsGivingModalOpen(true);
  };

  const closeGivingModal = () => {
    setIsGivingModalOpen(false);
    setSelectedProjectId(undefined);
  };

  const openWalletReport = () => setIsWalletReportOpen(true);
  const closeWalletReport = () => setIsWalletReportOpen(false);

  return (
    <ChurchContext.Provider
      value={{
        lang,
        setLang,
        t,
        events,
        projects,
        transactions,
        testimonials,
        volunteers,
        blogPosts,
        gallery,
        notifications,
        unreadNotifsCount,
        pushSubscribed,
        setPushSubscribed,
        addRSVP,
        submitDonation,
        submitTestimonial,
        submitVolunteerApplication,
        markNotificationRead,
        markAllNotificationsRead,
        sendBroadcastPush,
        approveTestimonial,
        deleteTestimonial,
        updateVolunteerStatus,
        addNewEvent,
        addNewBlogPost,
        isAdminAuthenticated,
        is2FAVerified,
        isBiometricVerified,
        adminLogin,
        verify2FA,
        verifyBiometrics,
        adminLogout,
        isGivingModalOpen,
        openGivingModal,
        closeGivingModal,
        selectedProjectId,
        isWalletReportOpen,
        openWalletReport,
        closeWalletReport
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};

export const useChurch = () => {
  const context = useContext(ChurchContext);
  if (!context) {
    throw new Error('useChurch must be used within a ChurchProvider');
  }
  return context;
};
