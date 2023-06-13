import { Header } from '@components/Header'
import { Heading } from '@components/usefull/Heading'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { createClient } from 'prismicio'
import PrismicTypes from '@prismicio/types'
import {
  Group,
  PostsPageContainer,
  PostPreview,
  PostPreviewContent,
  PostPreviewDescription,
  PostPreviewImage,
  PostPreviewTime,
  PostPreviewTitle,
  PostsContainer,
} from './styles'
import Link from 'next/link'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { FileMinus } from 'phosphor-react'

interface IPost {
  slug: string
  title: string
  excerpt: string
  image: {
    url: string
    alt: string
  } | null
  updatedAt: string
}

interface IPostPageProps {
  posts: IPost[]
}

export default function PostsPage({ posts }: IPostPageProps) {
  return (
    <>
      <NextSeo title="Blog | MagiScrita" />

      <PostsPageContainer>
        <Header />

        <Group>
          <Heading as="h1" size="lg">
            POSTS:
          </Heading>

          <PostsContainer isEmpty={posts.length === 0}>
            {posts.length !== 0 ? (
              posts.map((post) => (
                <Link
                  className="link-next"
                  key={post.slug}
                  href={`/blog/posts/${post.slug}`}
                >
                  <PostPreview>
                    {post.image && (
                      <PostPreviewImage>
                        <Image
                          src={post.image.url}
                          width={200}
                          height={200}
                          alt={post.image.alt}
                        />
                      </PostPreviewImage>
                    )}

                    <PostPreviewContent>
                      <PostPreviewTime>{post.updatedAt}</PostPreviewTime>
                      <PostPreviewTitle>{post.title}</PostPreviewTitle>
                      <PostPreviewDescription>
                        {post.excerpt}
                      </PostPreviewDescription>
                    </PostPreviewContent>
                  </PostPreview>
                </Link>
              ))
            ) : (
              <ListEmpty
                icon={<FileMinus size={50} />}
                message="Nenhum post foi criado ainda"
                contrast={2}
              />
            )}
          </PostsContainer>
        </Group>
      </PostsPageContainer>
    </>
  )
}

interface ContentPostP extends PrismicTypes.RTParagraphNode {
  text: string
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient()

  const postsReceived = await prismic.getAllByType('post', {
    fetch: ['post.title', 'post.content', 'post.image'],
    pageSize: 20,
  })

  const posts = postsReceived.map((post) => {
    const firstParagraph = post.data.content.find(
      (content) =>
        content.type === 'paragraph' && content.text.trim().length > 0,
    ) as ContentPostP

    return {
      slug: post.uid,
      title: post.data.title,
      excerpt: firstParagraph?.text ?? '',
      image: post.data?.image?.url
        ? {
            url: post.data.image.url,
            alt: post.data.image.alt,
          }
        : null,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        },
      ),
    }
  })

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60, // 1 hour
  }
}
