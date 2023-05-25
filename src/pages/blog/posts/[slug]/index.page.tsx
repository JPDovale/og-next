import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { createClient } from 'prismicio'
import { asHTML } from '@prismicio/client'
import PrismicTypes from '@prismicio/types'
import { Header } from '@components/Header'
import {
  PostBody,
  PostContent,
  PostDate,
  PostImage,
  PostTitle,
  PostPageContainer,
} from './styles'
import Image from 'next/image'

interface IPost {
  slug: string
  title: string
  content: string
  excerpt: string
  image: {
    url: string
    alt: string
  } | null
  updatedAt: string
}

interface IPostPage {
  post: IPost
}

export default function PostPage({ post }: IPostPage) {
  return (
    <>
      <NextSeo title={post.title} description={post.excerpt} />

      <PostPageContainer>
        <Header />

        <PostBody>
          <PostTitle>{post.title}</PostTitle>

          <PostDate>{post.updatedAt}</PostDate>

          {post.image && (
            <PostImage>
              <Image
                src={post.image.url}
                alt={post.image.alt}
                width={600}
                height={600}
                quality={100}
                priority
              />
            </PostImage>
          )}

          <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
        </PostBody>
      </PostPageContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

interface ContentPostP extends PrismicTypes.RTParagraphNode {
  text: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug

  const prismic = createClient()

  const postReceived = await prismic.getByUID('post', String(slug), {})

  const firstParagraph = postReceived.data.content.find(
    (content) => content.type === 'paragraph',
  ) as ContentPostP

  const post = {
    slug,
    title: postReceived.data.title,
    content: asHTML(postReceived.data.content),
    image: postReceived.data?.image?.url
      ? {
          url: postReceived.data.image.url,
          alt: postReceived.data.image.alt,
        }
      : null,
    excerpt: firstParagraph?.text ?? '',
    updatedAt: new Date(postReceived.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  }

  return {
    props: {
      post,
    },
    revalidate: 60 * 60, // 1 hour
  }
}
