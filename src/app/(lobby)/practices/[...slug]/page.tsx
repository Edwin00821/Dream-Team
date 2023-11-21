import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'

import { Mdx } from '@/components/mdx/mdx-components'

import '@/styles/mdx.css'

import { type Metadata } from 'next'
import Link from 'next/link'
import { env } from '@/env.mjs'

import { absoluteUrl, cn, formatDate } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Icons } from '@/components/icons'
import { MdxPager } from '@/components/pagers/mdx-pager'
import { Shell } from '@/components/shells/shell'

interface PostPageProps {
  params: {
    slug: string[]
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
async function getPostFromParams(params: PostPageProps['params']) {
  const slug = params?.slug?.join('/')
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: absoluteUrl(post.slug),
    },
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateStaticParams(): Promise<
  PostPageProps['params'][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <Shell as="article" variant="markdown">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-[-200px] top-14 hidden xl:inline-flex'
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
        Mira todos las practicas
      </Link>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {post.date && (
            <time dateTime={post.date} className="block">
              Publicado el {formatDate(post.date)}
            </time>
          )}
          {post.date ? <div>•</div> : null}
          <div>{post.readingTime}min</div>
        </div>
        <h1 className="inline-block text-4xl font-bold leading-tight lg:text-5xl">
          {post.title}
        </h1>
        <p className="text-base leading-7 [&:not(:first-child)]:mt-5">
          {post.description}
        </p>
      </div>
      {post.image && (
        <AspectRatio ratio={16 / 9}>
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full rounded-md border bg-muted object-center"
          />
        </AspectRatio>
      )}
      <Mdx code={post.body.code} />
      <Separator className="my-4" />
      <MdxPager currentItem={post} allItems={allPosts} />
      <Link
        href="/"
        className={cn(
          buttonVariants({
            variant: 'ghost',
            className: 'mx-auto mt-4 w-fit',
          })
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
        Mira todas las prácticas
        <span className="sr-only">See all posts</span>
      </Link>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
        integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
        crossOrigin="anonymous"
      />
    </Shell>
  )
}
