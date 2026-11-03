// schema.org JSON-LD builders. Placeholder values are left out, so the
// structured data never shows "[FILL: ...]" to search engines.
import { site, john, isPlaceholder } from './site';

const real = (v: string) => (isPlaceholder(v) ? undefined : v);
const sameAs = () => Object.values(site.social).filter((v) => !isPlaceholder(v));

export const orgId = `${site.url}/#organization`;
export const johnId = `${site.url}/john-v-jayakumar#person`;

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': orgId,
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/25x-logo.png`,
    description: site.description,
    email: site.email,
    telephone: real(site.phone),
    legalName: real(site.legalName),
    address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.postalCode, addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
    foundingDate: real(site.founded),
    founder: { '@id': johnId },
    areaServed: ['IN', 'SG', 'MY'],
    knowsAbout: ['Artificial intelligence for business', 'Vibe coding', 'No-code AI app building', 'Prompt engineering', 'Lead generation tools'],
    sameAs: sameAs(),
  };
}

export function website() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.name, publisher: { '@id': orgId }, inLanguage: 'en-IN' };
}

export function person() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': johnId,
    name: john.name,
    alternateName: john.fullName,
    url: `${site.url}/john-v-jayakumar`,
    image: `${site.url}${john.photo}`,
    jobTitle: ['Founder, 25X Academy', 'CEO, Superposition Technologies'],
    worksFor: [{ '@id': orgId }, { '@type': 'Organization', name: 'Superposition Technologies' }],
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Anna University' },
    award: 'Verizon CIO Credo Star Award for Performance Excellence',
    homeLocation: { '@type': 'Place', name: 'Chennai, India' },
    knowsAbout: ['Artificial intelligence', 'AI strategy', 'AI-assisted software development', 'Leadership', 'Prompt engineering'],
    sameAs: sameAs(),
  };
}

export function breadcrumbs(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', href: '/' }, ...items].map((c, i) => ({
      '@type': 'ListItem', position: i + 1, name: c.name, item: `${site.url}${c.href === '/' ? '' : c.href}`,
    })),
  };
}

export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function course(o: { name: string; description: string; path: string; price?: string; mode?: string; workload?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: o.name,
    description: o.description,
    url: `${site.url}${o.path}`,
    provider: { '@id': orgId },
    inLanguage: 'en',
    instructor: { '@id': johnId },
    ...(o.price && {
      offers: { '@type': 'Offer', price: o.price, priceCurrency: 'INR', category: 'Paid', availability: 'https://schema.org/InStock', url: `${site.url}${o.path}` },
    }),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: o.mode ?? 'Online',
      ...(o.workload && { courseWorkload: o.workload }),
      instructor: { '@id': johnId },
    },
  };
}

export function article(o: { title: string; description: string; path: string; published: string; updated: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: o.title,
    description: o.description,
    url: `${site.url}${o.path}`,
    mainEntityOfPage: `${site.url}${o.path}`,
    datePublished: o.published,
    dateModified: o.updated,
    author: { '@id': johnId, '@type': 'Person', name: john.name, url: `${site.url}/john-v-jayakumar` },
    publisher: { '@id': orgId },
    inLanguage: 'en-IN',
  };
}
