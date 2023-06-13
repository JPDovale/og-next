import { Header } from '@components/Header'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { createClient } from 'prismicio'
import { DocsPageContainer, Documentation, ContentPage } from './styles'

import { SideBar } from './components/SideBar'
import { asHTML } from '@prismicio/client'
import { DocDocument } from 'prismicio-types'

interface IPage {
  slug: string
  content: string
}

interface ILabelProject {
  label: string
  value: string
}

interface IDocPageProps {
  page: IPage
  labelsProjects: ILabelProject[]
}

export default function DocsPage({ page, labelsProjects }: IDocPageProps) {
  return (
    <>
      <NextSeo title="Documentação - Introdução | MagiScrita" />

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

          <ContentPage dangerouslySetInnerHTML={{ __html: page.content }} />
        </Documentation>
      </DocsPageContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient()

  const introductionPage = await prismic.getByUID('page', 'introduction')
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

  const partiedIntroductionPage = {
    slug: introductionPage.uid,
    content: asHTML(introductionPage.data.content),
  }

  return {
    props: {
      page: partiedIntroductionPage,
      labelsProjects,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
