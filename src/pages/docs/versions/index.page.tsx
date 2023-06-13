import { Header } from '@components/Header'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { createClient } from 'prismicio'
import { asHTML } from '@prismicio/client'
import { SideBar } from '../components/SideBar'
import {
  ContentPage,
  Documentation,
  MultipleContent,
  VersionsPageContainer,
} from './styles'
import { DocDocument } from 'prismicio-types'

interface IVersion {
  slug: string
  content: string
  createdAt: string
  updatedAt: string
}

interface ILabelProject {
  label: string
  value: string
}

interface IDocPageProps {
  versions: IVersion[]
  labelsProjects: ILabelProject[]
}

export default function VersionsPage({
  versions,
  labelsProjects,
}: IDocPageProps) {
  return (
    <>
      <NextSeo title="Documentação - Versionamento | MagiScrita" />

      <VersionsPageContainer>
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

          <MultipleContent>
            {versions.map((version) => (
              <ContentPage
                key={version.slug}
                dangerouslySetInnerHTML={{ __html: version.content }}
              />
            ))}
          </MultipleContent>
        </Documentation>
      </VersionsPageContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient()

  const versionsReceived = await prismic.getAllByTag('versions', {
    fetch: ['doc.title', 'doc.content', 'doc.date'],
    pageSize: 20,
    orderings: {
      field: 'doc.date',
      direction: 'desc',
    },
  })

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

  const versions = versionsReceived.map((version) => {
    return {
      slug: version.uid,
      content: asHTML(version.data.content),
      createdAt: new Date(version.first_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        },
      ),
      updatedAt: new Date(version.last_publication_date).toLocaleDateString(
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
      versions,
      labelsProjects,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
