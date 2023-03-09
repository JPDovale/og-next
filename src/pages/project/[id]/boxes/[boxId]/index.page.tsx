import { AvatarWeb } from '@components/usefull/Avatar'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function BoxPage() {
  const { loading } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, boxId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/boxes`)

  const { project, projectName, findBoxOfProject, findPersonOfProject } =
    useProject(id as string)
  const box = findBoxOfProject(boxId as string)

  return (
    <>
      <NextSeo title={`${projectName}-Livros | Ognare`} noindex />
      <ProjectPageLayout
        inError={!loading && !box}
        projectId={project?.id}
        projectName={projectName}
        paths={['Boxes', 'Internas', box?.name!]}
        loading={loading}
        isScrolling
      >
        <ContainerGrid padding={8} isRelativePosition>
          <GoBackButton topDistance={4} />

          <Text size="2xl" family="headingText">
            BOX
          </Text>

          <ContainerGrid
            columns={3}
            padding={0}
            css={{ border: '2px solid $purple400' }}
            darkBackground
          >
            <InfoDefault title="Nome">{box?.name}</InfoDefault>
            <InfoDefault title="Criado em">{box?.createdAt}</InfoDefault>
            <InfoDefault title="Atualizado em">{box?.updatedAt}</InfoDefault>
          </ContainerGrid>

          <ContainerGrid padding={0}>
            <Text size="2xl" family="headingText">
              Arquivos
            </Text>

            <ContainerGrid padding={0} columns={2}>
              {box?.archives.map((archive, i) => (
                <ContainerGrid
                  key={archive.archive.id}
                  padding={0}
                  css={{ border: '1px solid $purple400' }}
                  darkBackground
                >
                  <Text
                    size="lg"
                    css={{ justifySelf: 'center' }}
                    family="headingText"
                  >
                    Arquivo {i + 1}
                  </Text>

                  <InfoDefault title="Titulo">
                    <Text size="sm">{archive.archive.title}</Text>
                  </InfoDefault>
                  <InfoDefault title="Descrição">
                    <Text family="body"> {archive.archive.description}</Text>
                  </InfoDefault>

                  <ContainerGrid padding={0} css={{ marginTop: '$5' }}>
                    <Text family="headingText" css={{ color: '$base500' }}>
                      Atribuições:
                    </Text>

                    <ContainerGrid columns={6} padding={0}>
                      {archive.links?.map((link) => {
                        const person = findPersonOfProject(link.id)

                        if (!person) return ''

                        return (
                          <InfoDefault
                            css={{ alignItems: 'center' }}
                            key={link.id}
                            title={person?.name}
                            onClick={() =>
                              router.push(`/project/${id}/persons/${person.id}`)
                            }
                          >
                            <AvatarWeb
                              src={person?.image?.url}
                              size="sm"
                              isClickable
                            />
                          </InfoDefault>
                        )
                      })}
                    </ContainerGrid>
                  </ContainerGrid>
                </ContainerGrid>
              ))}
            </ContainerGrid>
          </ContainerGrid>
        </ContainerGrid>
      </ProjectPageLayout>
    </>
  )
}
