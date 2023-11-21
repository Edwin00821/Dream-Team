import { allPosts } from 'contentlayer/generated'

import { slugify } from '@/lib/utils'

export const practices = allPosts.map((post) => ({
  title: post.title,
  description: post.description,
  href: `/ /${slugify(post.slugAsParams)}`,
  items: [],
}))
