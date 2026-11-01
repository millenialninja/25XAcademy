// Data for the "Real Vibe-Coding Success Case-Studies" cards used on
// vibecoding77.com (not on this site). Figures are as publicly reported by the
// founders or platforms (research and sources:
// ../../website/real-world-vibe-coding-examples.md). Each entry is rendered to a
// 1080x1350 PNG from case-study.html (card data in the URL hash); the PNGs live
// in ../../website/case-study-images/. `who` may contain <b>; alt text strips it.

export interface CaseStudy {
  slug: string;
  product: string;
  what: string;
  tool: string;
  who: string;
  big: string; // headline part of the result
  rest: string; // the rest of the result sentence
  accent: 'saffron' | 'lilac' | 'mint';
}

export const caseStudies: CaseStudy[] = [
  { slug: 'refine', product: 'Refine', what: 'turns company documents into 6-minute gamified lessons', tool: 'Lovable',
    who: '<b>Alex Stojanovic</b>, corporate trainer with a PhD in psycholinguistics', big: '$3.2M', rest: 'contracted ARR, 27,000 users', accent: 'saffron' },
  { slug: 'shiftnex', product: 'ShiftNex', what: 'AI healthcare staffing platform in the US', tool: 'Lovable',
    who: '<b>Allan Njoroge</b>, ran a nurse staffing agency, no coding background', big: '$1M', rest: 'ARR in 5 months, 5,000+ users', accent: 'mint' },
  { slug: 'lumoo', product: 'Lumoo', what: 'AI virtual try-on for fashion brands such as Gant', tool: 'Lovable',
    who: '<b>Henrik Skagerlind Fasth</b> (ex-athlete, then product manager) and <b>Peter Thörngren</b> (sales)', big: '€700K', rest: 'ARR in 9 months (about $800K)', accent: 'lilac' },
  { slug: 'plinq', product: 'Plinq', what: "women's safety app with background checks", tool: 'Lovable',
    who: '<b>Sabrine Matos</b>, growth marketer from Brazil', big: 'About $456K', rest: 'ARR in 3 months, 10,000+ users', accent: 'saffron' },
  { slug: 'klar', product: 'Klar', what: 'AI study assistant for Swedish universities', tool: 'Lovable',
    who: "<b>Andreas, Isabel and Eric</b>, students (one designer, two in marketing) who couldn't code", big: '€130K', rest: 'ARR in its first 30 days', accent: 'mint' },
  { slug: 'quicktables', product: 'QuickTables', what: 'websites and SMS marketing for restaurants', tool: 'Lovable',
    who: '<b>Jaleel</b>, quit a sales job with 60 days of savings', big: '€100K', rest: 'ARR in 2 months, acquired 10 months after launch', accent: 'lilac' },
  { slug: 'theanna', product: 'Theanna', what: 'growth tool for founders', tool: 'Lovable + Claude Code',
    who: '<b>Nomiki Petrolla</b>, product manager', big: '$202K', rest: 'ARR', accent: 'saffron' },
  { slug: 'backchannel', product: 'Backchannel', what: 'job-search guidance', tool: 'Lovable',
    who: '<b>Mindaugas Petrutis</b>, recruiter who never coded', big: 'Paying users within days', rest: 'about $7-8K reported', accent: 'mint' },
];

const strip = (s: string) => s.replace(/<[^>]+>/g, '');

// Full card text, used as the image's alt text so the content stays readable
// by screen readers and search engines.
export const caseStudyAlt = (c: CaseStudy) =>
  `${c.product}: ${c.what}. Built with ${c.tool}. Result (as reported): ${c.big} ${c.rest}. ${strip(c.who)}.`;
