import { links } from './site';

export type Program = {
  slug: string;
  step: string;
  name: string;
  short: string;
  format: string;
  price: string;
  priceNote: string;
  cta: { label: string; href: string; external?: boolean };
};

export const programs: Program[] = [
  {
    slug: 'business-tools-workshop',
    step: '01',
    name: '3-Day Business Tools Workshop',
    short:
      'Watch John build a working lead tool live, from a blank screen, then plan one for your own business.',
    format: '3 live evenings on Zoom · Mon to Wed · 7:30 to 8:30 PM IST',
    price: '₹99',
    priceNote: 'for all 3 evenings, incl. GST',
    cta: { label: 'Register for ₹99', href: links.workshop, external: true },
  },
  {
    slug: 'buildalong-hub',
    step: '02',
    name: 'BuildAlong Hub',
    short:
      'A 12-week program where you build your own business tool or product with John, with a live Build Night every Thursday.',
    format: '12 weeks · recorded modules · live Thursday Build Nights · community',
    price: 'Founding pricing',
    priceNote: 'shared live at the end of the workshop',
    cta: { label: 'See the 12 weeks', href: '/programs/buildalong-hub' },
  },
  {
    slug: 'startup-intensive',
    step: '03',
    name: 'Startup Intensive',
    short:
      'One year building your startup’s product with AI, alongside John. From the first version to real customers.',
    format: '1 year · 25 startups a year · by application',
    price: 'By application',
    priceNote: 'a short call with John first',
    cta: { label: 'How to apply', href: '/programs/startup-intensive' },
  },
];

export const workshopDays = [
  {
    day: 'Day 1',
    title: 'Pick the right tool',
    points: [
      'Why tools that do something beat pages that say something',
      'Choose the one lead tool that fits your business',
      'Plan it on a one-page brief, then start the live build with the RAO method',
    ],
  },
  {
    day: 'Day 2',
    title: 'Make it work',
    points: [
      'Build the questions, the scoring and the result your visitor sees',
      'Capture name, WhatsApp number and need for every lead',
      'Run the two-user safety test so your customers’ data stays private',
    ],
  },
  {
    day: 'Day 3',
    title: 'Go live and get leads',
    points: [
      'Publish your tool and share it',
      'Live Q&A: John scopes attendees’ own tool ideas on the spot',
      'Bonuses for everyone still in the room',
    ],
  },
];

export const hubPhases = [
  { weeks: 'Weeks 1 to 2', title: 'Find the idea', detail: 'Pick your product, write the one-page brief, test it with 5 real people.' },
  { weeks: 'Weeks 3 to 5', title: 'Build version 1', detail: 'Screens and flow, data and accounts, and the AI feature that makes it special.' },
  { weeks: 'Weeks 6 to 7', title: 'Make it real', detail: 'Security checks, error handling, payments, and your privacy, terms and refund pages.' },
  { weeks: 'Weeks 8 to 9', title: 'Launch', detail: 'Domain, landing page, welcome messages, analytics, and your first 10 users.' },
  { weeks: 'Weeks 10 to 12', title: 'Grow', detail: 'Improve from feedback, build your own lead engine, and present at Demo Day.' },
];

export const buildNight = [
  { min: '10 min', title: 'Wins of the week' },
  { min: '40 min', title: 'Live build: John builds the week’s hardest step on screen' },
  { min: '60 min', title: 'Hot seats: members share their screen and get unstuck' },
  { min: '10 min', title: 'Next week’s milestone' },
];

export const faqs = [
  {
    q: 'What is 25X Academy?',
    a: '25X Academy is an AI education company founded by John V Jayakumar in Chennai, India. It teaches business owners and professionals to use AI in their own business: to build business tools that win customers, save hours and create new products, without coding or hiring developers.',
  },
  {
    q: 'Do I need to know coding?',
    a: 'No. Our programs use AI builders that turn plain-English instructions into working tools. If you can write a clear WhatsApp message, you can follow along. We teach you how to give AI clear instructions with the RAO method.',
  },
  {
    q: 'What is a business tool?',
    a: 'A small web app that does something useful for your customer, such as a scorecard, a readiness check, a quote calculator or a course finder. The visitor gets an instant result, and you get their name, WhatsApp number and need. It opens from a link on any phone or laptop, with no App Store needed.',
  },
  {
    q: 'Who are the programs for?',
    a: 'Speakers, trainers, coaches, consultants, business owners, professionals and early-stage founders who want to use AI in their own work. They are not courses to become a professional software developer.',
  },
  {
    q: 'Where should I start?',
    a: 'With the 3-Day Business Tools Workshop: 3 live evenings on Zoom, 1 hour each, ₹99 for all 3. You watch a working lead tool being built live and plan your own. If you want to go further, the BuildAlong Hub is the next step.',
  },
  {
    q: 'Do you guarantee results?',
    a: 'No. We teach skills, methods and tools, and show you what is possible. Your results depend on your work, your business and your market. Read our Terms of Service for details.',
  },
  {
    q: 'Are the sessions recorded?',
    a: 'The ₹99 workshop is live only. No recordings are shared, so please attend all 3 evenings. BuildAlong Hub includes recorded modules for each week, plus live Build Nights.',
  },
  {
    q: 'What is your refund policy?',
    a: 'It depends on the program, and every checkout page links to it. Approved refunds are always the full amount paid. See the Refund Policy for the details.',
  },
];
