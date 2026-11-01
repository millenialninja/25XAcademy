// Guides live as Markdown in src/content/guides. Frontmatter:
// title, description, category, published, updated, answer (the short
// answer shown first, for AEO), order (lower shows first).
type GuideFrontmatter = {
  title: string;
  description: string;
  category: string;
  published: string;
  updated: string;
  answer: string;
  order?: number;
};

export type Guide = GuideFrontmatter & { slug: string; Content: any; readMinutes: number };

const files = import.meta.glob<any>('../content/guides/*.md', { eager: true });

export async function getGuides(): Promise<Guide[]> {
  const list = await Promise.all(
    Object.entries(files).map(async ([path, mod]) => {
      const html: string = await mod.compiledContent();
      const raw = html.replace(/<[^>]+>/g, ' ');
      return {
        ...(mod.frontmatter as GuideFrontmatter),
        slug: path.split('/').pop()!.replace(/\.md$/, ''),
        Content: mod.Content,
        readMinutes: Math.max(2, Math.round(raw.split(/\s+/).length / 220)),
      };
    }),
  );
  return list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}
