import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog');

  return rss({
    title: 'Firewall Flamingos',
    description: 'Threat research, reverse engineering, and AI × security essays.',
    site: context.site!,
    items: blog
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map(post => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/blog/${post.id}/`,
        categories: [post.data.category, ...post.data.tags],
      })),
    customData: `<language>en-us</language>`,
  });
}
