// Single source of truth for business details, links and navigation.
// Anything marked FILL or DECISION renders as a highlighted placeholder.
// Run `npm run placeholders` to list what is still open before launch.

export const FILL = (label: string) => `[FILL: ${label}]`;
export const isPlaceholder = (value: string) => /^\[(FILL|DECISION)/.test(value);

export const site = {
  name: '25X Academy',
  url: 'https://25xacademy.com',
  tagline: 'Put AI to work in your business.',
  description:
    '25X Academy teaches business owners and professionals to use AI in their own business: to build business tools that win customers, save hours and create new products, without coding or developers. Founded by John V Jayakumar, Chennai.',
  email: 'hi@25xacademy.com',
  phone: '+91 98402 14894',
  phoneHref: 'tel:+919840214894',
  whatsapp: '919840214894',
  legalName: 'JOHN V J VENTURES',
  entityType: 'Sole proprietorship',
  address: 'D1, Dev Apts, 68, 2nd Main Road, Gandhi Nagar, Adyar, Chennai 600020, Tamil Nadu',
  street: 'D1, Dev Apts, 68, 2nd Main Road, Gandhi Nagar, Adyar',
  postalCode: '600020',
  gstin: '33ADTPJ7011Q1Z2',
  grievanceOfficer: 'V John Jayakumar',
  founded: '2020',
  // What "25X" stands for. Shown on the homepage and About page.
  meaning:
    '25X is about leverage: one person, working with AI, doing the work that used to need a whole team.',
  // Add whatsappChannel here when the channel exists.
  social: {
    linkedin: 'https://www.linkedin.com/in/johnvjayakumar/',
    youtube: 'https://www.youtube.com/@johnvj',
    instagram: 'https://www.instagram.com/johnvjayakumar/',
  },
};

// Links out. The workshop is sold on vibecoding77.com (TagMango checkout).
export const links = {
  workshop:
    'https://vibecoding77.com/?utm_source=25xacademy&utm_medium=referral&utm_campaign=site',
  futureSimulator: 'https://thefuturesimulator.com/',
  mailto: (subject: string) =>
    `mailto:hi@25xacademy.com?subject=${encodeURIComponent(subject)}`,
};

export const nav = [
  { href: '/programs', label: 'Programs' },
  { href: '/ideas', label: 'Ideas' },
  { href: '/guides', label: 'Guides' },
  { href: '/rao-method', label: 'RAO Method' },
  { href: '/john-v-jayakumar', label: 'About John' },
];

export const footerNav = [
  {
    title: 'Learn',
    items: [
      { href: '/programs/business-tools-workshop', label: '3-Day Workshop' },
      { href: '/programs/buildalong-hub', label: 'BuildAlong Hub' },
      { href: '/programs/startup-intensive', label: 'Startup Intensive' },
      { href: '/speaking', label: 'Keynotes and training' },
    ],
  },
  {
    title: 'Explore',
    items: [
      { href: '/ideas', label: 'Business tool ideas' },
      { href: '/guides', label: 'Guides' },
      { href: '/rao-method', label: 'The RAO Method' },
      { href: '/glossary', label: 'AI glossary' },
    ],
  },
  {
    title: 'Company',
    items: [
      { href: '/john-v-jayakumar', label: 'About John' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/refund-policy', label: 'Refund Policy' },
    ],
  },
];

export const john = {
  name: 'John V Jayakumar',
  fullName: 'Vincent John Jayakumar',
  role: 'Founder, 25X Academy · CEO, Superposition Technologies',
  photo: '/images/john-v-jayakumar.jpg',
  stats: [
    { value: 5000, suffix: '+', label: 'people trained in AI' },
    { value: 25, suffix: '+', label: 'tools created' },
    { value: 30, suffix: '+', label: 'years in technology' },
    { value: 4, suffix: '+', label: 'books written' },
  ],
  credentials: [
    'Ex-Verizon, CIO Credo Star Award for Performance Excellence',
    'US patent holder (Verizon)',
    'Author of The AI-Native Leader, and 4+ books',
    'CEO, Superposition Technologies',
    'Keynote speaker and AI trainer',
    'Builder of The Future Simulator',
    'Microsoft Certified Professional · Certified ScrumMaster',
    'Anna University alumnus',
  ],
};
