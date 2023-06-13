import { Header } from '@components/Header'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { createClient } from 'prismicio'
import { DocsPageContainer, Documentation, ContentPage } from '../../styles'

import { asHTML } from '@prismicio/client'
import { DocDocument } from 'prismicio-types'
import { SideBar } from '@pages/docs/components/SideBar'

interface ILabelProject {
  label: string
  value: string
}

interface IDocument {
  slug: string
  title: string
  content: string
  updatedAt: string
}

interface IDocPageProps {
  document: IDocument
  labelsProjects: ILabelProject[]
}

export default function DocsPage({ document, labelsProjects }: IDocPageProps) {
  return (
    <>
      <NextSeo title={`${document.title} | MagiScrita`} />

      <DocsPageContainer>
        <Header disableShadow />

        <Documentation>
          <SideBar
            addLabels={[
              {
                title: 'Projetos',
                value: 'projects',
                labels: labelsProjects,
              },
            ]}
          />

          <ContentPage dangerouslySetInnerHTML={{ __html: document.content }} />
        </Documentation>
      </DocsPageContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          lessonSlug: 'como-criar-um-projeto',
          lessonInto: 'projects',
        },
      },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.lessonSlug

  const prismic = createClient()

  const docReceived = await prismic.getByUID('doc', String(slug), {})

  const doc = {
    slug,
    title: docReceived.data.title,
    content: asHTML(docReceived.data.content),
    updatedAt: new Date(docReceived.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  }

  const docsProject = await prismic.getAllBySomeTags<DocDocument>(
    ['lesson', 'project'],
    {
      fetch: ['doc.title', 'doc.content', 'doc.image'],
    },
  )

  const labelsProjects = docsProject.map((doc) => ({
    label: doc.data.title,
    value: doc.uid,
  }))

  return {
    props: {
      document: doc,
      labelsProjects,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
