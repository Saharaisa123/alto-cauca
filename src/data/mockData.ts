import {
  ChurchEvent,
  SocialProject,
  DonationTransaction,
  Testimonial,
  VolunteerApplication,
  BlogPost,
  GalleryItem,
  PushNotification
} from '../types';

export const INITIAL_EVENTS: ChurchEvent[] = [
  {
    id: 'evt-1',
    title: 'Gran Culto de Celebración y Alabanza',
    category: 'Cultos',
    date: '2026-10-04',
    time: '10:00 AM - 12:30 PM',
    location: 'Santuario Principal & Transmisión en Vivo',
    speaker: 'Pastor Principal Samuel Morales',
    description: 'Un tiempo de adoración profunda, intercesión y la proclamación de la Palabra de Dios bajo el tema "La Gloria Postrera de Esta Casa".',
    rsvpCount: 248,
    isVirtual: true,
    virtualLink: 'https://iglesiadeldiosaltisimo.org/en-vivo'
  },
  {
    id: 'evt-2',
    title: 'Noche de Clamor y Vigilia de Oración',
    category: 'Oración',
    date: '2026-10-09',
    time: '08:00 PM - 12:00 AM',
    location: 'Capilla de Oración Monte de Sion',
    speaker: 'Pastora Ana María Morales & Ministerio de Intercesión',
    description: 'Jornada unida clamando por las familias, la juventud y la paz de nuestra nación. Habrá momentos de cánticos proféticos y unción.',
    rsvpCount: 112,
    isVirtual: true
  },
  {
    id: 'evt-3',
    title: 'Conferencia Juvenil "Fuego & Santidad"',
    category: 'Jóvenes',
    date: '2026-10-17',
    time: '05:00 PM - 08:30 PM',
    location: 'Auditorio Juvenil Koinonía',
    speaker: 'Pastor David Morales & Banda Altísimo Worship',
    description: 'Encuentro especial para jóvenes de 13 a 28 años con música en vivo, talleres de liderazgo, fe en la universidad y ministración.',
    rsvpCount: 185,
    isVirtual: false
  },
  {
    id: 'evt-4',
    title: 'Jornada de Acción Social: "Pan de Vida"',
    category: 'Misiones',
    date: '2026-10-24',
    time: '08:00 AM - 02:00 PM',
    location: 'Comedor Comunitario Barrio Esperanza',
    speaker: 'Comité de Ayuda Humanitaria',
    description: 'Distribución de 350 mercados alimenticios, atención médica básica y recreación infantil para familias vulnerables del sector.',
    rsvpCount: 64,
    isVirtual: false
  },
  {
    id: 'evt-5',
    title: 'Bautismos Generales en Agua',
    category: 'Cultos',
    date: '2026-11-01',
    time: '09:00 AM - 12:00 PM',
    location: 'Centro Campestre Bethel',
    speaker: 'Cuerpo Pastoral',
    description: 'Paso de obediencia y testimonio público de fe para todos los nuevos creyentes que completaron la clase de discipulado.',
    rsvpCount: 42,
    isVirtual: false
  }
];

export const INITIAL_PROJECTS: SocialProject[] = [
  {
    id: 'proj-1',
    title: 'Comedor Comunitario "Pan de Gracia"',
    category: 'Nutrición Infantil',
    description: 'Brindamos 300 almuerzos nutritivos diarios a niños y adultos mayores de sectores vulnerables, junto con refuerzo escolar de lunes a viernes.',
    goalAmount: 18000,
    currentAmount: 14250,
    image: '/src/assets/images/social_outreach_food_1790550989005.jpg',
    donorsCount: 342,
    beneficiaries: '300 niños diarios',
    status: 'active'
  },
  {
    id: 'proj-2',
    title: 'Misiones Amazónicas & Agua Potable',
    category: 'Misiones',
    description: 'Instalación de 3 filtros comunitarios de purificación de agua y sostenimiento de 4 familias misioneras en comunidades ribereñas del Amazonas.',
    goalAmount: 25000,
    currentAmount: 19800,
    image: '/src/assets/images/community_baptisms_1790550998342.jpg',
    donorsCount: 215,
    beneficiaries: '1,200 habitantes indígenas',
    status: 'active'
  },
  {
    id: 'proj-3',
    title: 'Ampliación del Santuario & Escuela de Niños',
    category: 'Infraestructura',
    description: 'Construcción de 6 aulas pedagógicas seguras para la Escuela Dominical infantil y equipamiento audiovisual del templo.',
    goalAmount: 40000,
    currentAmount: 31200,
    image: '/src/assets/images/hero_sanctuary_worship_1790550968006.jpg',
    donorsCount: 520,
    beneficiaries: '450 niños y congregación',
    status: 'active'
  },
  {
    id: 'proj-4',
    title: 'Fondo de Auxilio Médico y Medicamentos',
    category: 'Salud',
    description: 'Suministro de fármacos esenciales, gafas formuladas y cirugías menores de emergencia para familias de escasos recursos.',
    goalAmount: 12000,
    currentAmount: 8900,
    image: '/src/assets/images/live_stream_sermon_1790550978879.jpg',
    donorsCount: 148,
    beneficiaries: '180 pacientes atendidos',
    status: 'active'
  }
];

export const INITIAL_TRANSACTIONS: DonationTransaction[] = [
  {
    id: 'tx-101',
    receiptNumber: 'REC-2026-8941',
    donorName: 'Carlos Andrés Mendoza',
    email: 'carlos.mendoza@gmail.com',
    amount: 150,
    currency: 'USD',
    convertedUSD: 150,
    paymentMethod: 'card',
    paymentDetail: 'Visa •••• 4242',
    projectId: 'proj-1',
    projectTitle: 'Comedor Comunitario "Pan de Gracia"',
    date: '2026-09-27 15:42',
    status: 'completed',
    anonymous: false
  },
  {
    id: 'tx-102',
    receiptNumber: 'REC-2026-8940',
    donorName: 'Donante Anónimo',
    email: 'crypto.donor@blockchain.org',
    amount: 0.015,
    currency: 'USD',
    convertedUSD: 975,
    paymentMethod: 'crypto',
    paymentDetail: 'Bitcoin (BTC)',
    txHash: '3a8f9c1b...7e4d82a1',
    projectId: 'proj-2',
    projectTitle: 'Misiones Amazónicas & Agua Potable',
    date: '2026-09-27 14:18',
    status: 'verified',
    anonymous: true
  },
  {
    id: 'tx-103',
    receiptNumber: 'REC-2026-8939',
    donorName: 'Familia Restrepo Gómez',
    email: 'm.restrepo@empresa.com',
    amount: 350,
    currency: 'USD',
    convertedUSD: 350,
    paymentMethod: 'bank',
    paymentDetail: 'PSE / Transferencia Bancolombia',
    projectId: 'proj-3',
    projectTitle: 'Ampliación del Santuario & Escuela de Niños',
    date: '2026-09-26 18:30',
    status: 'completed',
    anonymous: false
  },
  {
    id: 'tx-104',
    receiptNumber: 'REC-2026-8938',
    donorName: 'Lucía Fernández',
    email: 'lucia.f@hotmail.com',
    amount: 250,
    currency: 'USD',
    convertedUSD: 250,
    paymentMethod: 'crypto',
    paymentDetail: 'USDT (TRC-20)',
    txHash: '9b2c3d4e...1f8a7e3d',
    projectId: 'proj-1',
    projectTitle: 'Comedor Comunitario "Pan de Gracia"',
    date: '2026-09-26 11:15',
    status: 'verified',
    anonymous: false
  },
  {
    id: 'tx-105',
    receiptNumber: 'REC-2026-8937',
    donorName: 'Guillermo Silva',
    email: 'gsilva@tecnologia.io',
    amount: 80,
    currency: 'USD',
    convertedUSD: 80,
    paymentMethod: 'wallet',
    paymentDetail: 'PayPal / Billetera Digital',
    projectId: 'proj-4',
    projectTitle: 'Fondo de Auxilio Médico y Medicamentos',
    date: '2026-09-25 16:45',
    status: 'completed',
    anonymous: false
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Gloria Helena Duarte',
    city: 'Bogotá, Colombia',
    category: 'Sanidad',
    title: 'Sanada milagrosamente de tumor pulmonar',
    content: 'En mayo los médicos me dieron un diagnóstico desalentador. Durante la vigilia de clamor en la Iglesia del Dios Altísimo, el Pastor oró y sentí un fuego en mi pecho. En la tomografía de control dos semanas después, el especialista no encontró rastro de la masa. ¡La honra y gloria es para Jesús!',
    date: '2026-09-18',
    verified: true,
    approved: true
  },
  {
    id: 'test-2',
    author: 'Mateo & Valentina Quintero',
    city: 'Medellín, Colombia',
    category: 'Familia',
    title: 'Restauración matrimonial al borde del divorcio',
    content: 'Llegamos a la congregación separados legalmente y sin esperanzas. Gracias al ministerio de consejería pastoral y la escuela bíblica de matrimonios, aprendimos el perdón mutuo y Dios sanó las heridas del corazón. Hoy servimos juntos en la recepción del templo.',
    date: '2026-09-10',
    verified: true,
    approved: true
  },
  {
    id: 'test-3',
    author: 'Julián Camilo Torres',
    city: 'Cali, Colombia',
    category: 'Finanzas',
    title: 'Provisión sobrenatural en quiebra económica',
    content: 'Perdí mi empleo con tres hijos y muchas deudas acumuladas. Empecé a honrar a Dios con lo poco que tenía a través del diezmo y me uní al voluntariado del comedor comunitario. A los pocos días recibí una llamada imprevista para liderar un proyecto internacional con el triple de ingresos.',
    date: '2026-08-28',
    verified: true,
    approved: true
  },
  {
    id: 'test-4',
    author: 'Rebeca Santos',
    city: 'Miami, EE. UU.',
    category: 'Fe',
    title: 'Libertad de 7 años de depresión a través de la transmisión en vivo',
    content: 'Vivo en el extranjero y me sentía en soledad absoluta. Me conecté a la transmisión en vivo del culto dominical y la palabra predicada traspasó mi alma. Sentí el Espíritu Santo abrazándome. Hoy tengo paz verdadera y sigo cada domingo unida a esta hermosa familia de fe.',
    date: '2026-08-14',
    verified: true,
    approved: true
  }
];

export const INITIAL_VOLUNTEERS: VolunteerApplication[] = [
  {
    id: 'vol-1',
    code: 'VOL-2026-014',
    fullName: 'Esteban Ramírez Pardo',
    email: 'esteban.ramirez@gmail.com',
    phone: '+57 311 482 9912',
    ministry: 'Alabanza',
    availability: 'Domingos mañanas y ensayos jueves en la noche',
    talents: 'Guitarra acústica y eléctrica, 8 años de experiencia musical, teoría y solfeo.',
    status: 'approved',
    appliedAt: '2026-09-24'
  },
  {
    id: 'vol-2',
    code: 'VOL-2026-015',
    fullName: 'Diana Marcela Morales',
    email: 'dianis.morales@outlook.com',
    phone: '+57 320 894 1123',
    ministry: 'AccionSocial',
    availability: 'Sábados cada quince días',
    talents: 'Trabajadora social, experiencia en logística de comedores comunitarios y primeros auxilios.',
    status: 'in_review',
    appliedAt: '2026-09-26'
  },
  {
    id: 'vol-3',
    code: 'VOL-2026-016',
    fullName: 'Andrés Felipe Castro',
    email: 'andres.felipe@gmail.com',
    phone: '+57 315 771 8420',
    ministry: 'Medios',
    availability: 'Domingos jornada completa',
    talents: 'Operador de cámara, edición de video en DaVinci Resolve y streaming con OBS Studio.',
    status: 'approved',
    appliedAt: '2026-09-22'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Caminando sobre las Aguas: Cómo vencer la incertidumbre en tiempos difíciles',
    slug: 'caminando-sobre-las-aguas-fe-incertidumbre',
    excerpt: 'Cuando las tormentas de la vida rugen, Jesús nos llama a no mirar el oleaje, sino a fijar la mirada únicamente en Su rostro de compasión.',
    content: `En Mateo 14:28-31 encontramos uno de los pasajes más conmovedores de las Escrituras. Pedro vio a Jesús caminando sobre el mar embravecido y le pidió la orden de ir hacia Él. Mientras Pedro mantuvo sus ojos fijos en el Maestro, caminó sobre lo imposible. Pero en el instante en que miró la fuerza del viento, tuvo miedo y comenzó a hundirse.

¿Cuántas veces nos encontramos en esa misma encrucijada? Nos enfocamos en las noticias, en la inflación, en el diagnóstico médico o en la fragilidad humana, olvidando que Aquel que nos llamó es el Creador de los cielos y de la tierra.

Hoy la Iglesia del Dios Altísimo te recuerda tres verdades inconmovibles:
1. La voz de Cristo tiene más peso que el rugido de cualquier circunstancia.
2. Tu fe no se mide por la calma exterior, sino por tu ancla en el Espíritu.
3. Incluso cuando sientes que te hundes, Su mano extendida está lista para rescatarte con amor eterno.`,
    author: 'Pastor Samuel Morales',
    role: 'Pastor Principal',
    date: '2026-09-25',
    category: 'Devocional',
    readTime: '4 min de lectura',
    audioDuration: '14:20',
    keyScripture: 'Mateo 14:29-31: "Y él dijo: Ven. Y descendiendo Pedro de la barca, andaba sobre las aguas para ir a Jesús."'
  },
  {
    id: 'post-2',
    title: 'La Generosidad que Transforma: El poder del sembrador en el Reino',
    slug: 'generosidad-que-transforma-reino-dios',
    excerpt: 'Descubre los principios bíblicos que rigen la mayordomía financiera y cómo nuestras ofrendas desatan provisión en vidas necesitadas.',
    content: `La Biblia nos enseña en 2 Corintios 9:7 que Dios ama al dador alegre. La verdadera generosidad no es una obligación externa, sino una respuesta sincera al amor incondicional que recibimos en la Cruz.

Cuando apoyamos proyectos como nuestro Comedor Comunitario o las misiones en lugares remotos, no solo estamos entregando recursos materiales; nos convertimos en los pies y manos de Jesús en el mundo. La transparencia y la fidelidad con los bienes terrenales abren las ventanas de los cielos.`,
    author: 'Pastora Ana María Morales',
    role: 'Pastora Adjunta & Consejera',
    date: '2026-09-20',
    category: 'Estudio Bíblico',
    readTime: '5 min de lectura',
    audioDuration: '18:45',
    keyScripture: '2 Corintios 9:8: "Y poderoso es Dios para hacer que abunde en vosotros toda gracia..."'
  },
  {
    id: 'post-3',
    title: 'Reporte Misionero Trimestral: Luz en las comunidades del Río Amazonas',
    slug: 'reporte-misionero-rio-amazonas-luz',
    excerpt: 'Conoce los testimonios y avances de nuestros misioneros que llevaron agua potable y la Palabra de Dios a más de 12 poblados ribereños.',
    content: `Gracias a la fidelidad de sus oraciones y donaciones, el equipo misionero de la Iglesia del Dios Altísimo concluyó la primera fase del proyecto "Agua Viva". Se instalaron sistemas de purificación de agua potable y se entregaron 400 Biblias en lengua local. Más de 65 personas entregaron sus vidas a Jesús y se iniciaron tres nuevas células de estudio bíblico.`,
    author: 'Misionero David Cárdenas',
    role: 'Director de Misiones Globales',
    date: '2026-09-15',
    category: 'Noticias',
    readTime: '3 min de lectura',
    keyScripture: 'Marcos 16:15: "Id por todo el mundo y predicad el evangelio a toda criatura."'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Culto Solemne de Adoración en el Santuario',
    category: 'Adoración',
    date: 'Septiembre 2026',
    image: '/src/assets/images/hero_sanctuary_worship_1790550968006.jpg',
    description: 'Congregación reunida exaltando el nombre de Jesucristo en espíritu y en verdad.'
  },
  {
    id: 'gal-2',
    title: 'Transmisión Global de la Palabra de Dios',
    category: 'Comunidad',
    date: 'Septiembre 2026',
    image: '/src/assets/images/live_stream_sermon_1790550978879.jpg',
    description: 'Pastores compartiendo el mensaje de salvación a miles de hogares conectados.'
  },
  {
    id: 'gal-3',
    title: 'Jornada Solidaria en el Comedor Comunitario',
    category: 'Acción Social',
    date: 'Agosto 2026',
    image: '/src/assets/images/social_outreach_food_1790550989005.jpg',
    description: 'Voluntarios sirviendo raciones calientes y mercados con amor fraternal.'
  },
  {
    id: 'gal-4',
    title: 'Bautismos y Nacimiento a una Nueva Vida',
    category: 'Bautismos',
    date: 'Julio 2026',
    image: '/src/assets/images/community_baptisms_1790550998342.jpg',
    description: 'Testimonio público de fe de 42 hermanos en aguas de bendición.'
  }
];

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: 'notif-1',
    title: '🔴 ¡Estamos En Vivo!',
    message: 'Ha iniciado la transmisión del Culto de Oración y Alabanza. Conéctate con nosotros ahora.',
    timestamp: 'Hace 15 minutos',
    read: false,
    category: 'stream',
    link: '#en-vivo'
  },
  {
    id: 'notif-2',
    title: '✨ Meta Alcanzada en el Comedor Infantil',
    message: 'Gracias a tus aportes alcanzamos el 79% del fondo para los 300 almuerzos de este mes. ¡Dios te bendiga!',
    timestamp: 'Hace 3 horas',
    read: false,
    category: 'giving',
    link: '#proyectos'
  },
  {
    id: 'notif-3',
    title: '📅 Recordatorio de Evento Próximo',
    message: 'Este domingo tendremos el Culto de Santa Cena y bendición para las familias a las 10:00 AM.',
    timestamp: 'Ayer',
    read: true,
    category: 'event',
    link: '#eventos'
  },
  {
    id: 'notif-4',
    title: '📖 Devocional del Día Disponible',
    message: '"Caminando sobre las Aguas: Cómo vencer la incertidumbre", ya publicado en nuestro blog.',
    timestamp: 'Hace 2 días',
    read: true,
    category: 'pastoral',
    link: '#blog'
  }
];

export const CHURCH_WALLET_ADDRESSES = {
  BTC: 'bc1q9h6v38w92x78klt8a8dqlpwef7k4j2z0nm9y4s',
  ETH: '0x8849E48227b68266Af913C3A0108A7C6415B172E',
  USDT_TRC20: 'TLyD3wz5Jz4vjZ8n62R1P9KqW7mYxTbQcE',
  USDT_ERC20: '0x8849E48227b68266Af913C3A0108A7C6415B172E',
  SOL: '5KtPnWj42gR7b98xLmVtE1yZ3cXfQ6wP2jM0kL8n4yR'
};
