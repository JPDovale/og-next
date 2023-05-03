import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { CommentsOnPage } from '@components/ProjectsComponents/CommentsOnPage'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { Text } from '@components/usefull/Text'
import { ProjectsContext } from '@contexts/projects'
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { getDate } from '@utils/dates/getDate'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { UserCircleGear } from 'phosphor-react'
import { useContext } from 'react'

export default function PersonalityPage() {
  const { commentInPerson } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId, personalityId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { person, personName, findPersonality, loadingPerson } = usePerson(
    personId as string,
  )
  const { personality } = findPersonality(personalityId as string)

  async function handleCommentInPersonality(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }
  return (
    <>
      <NextSeo
        title={`${personName}-${personality?.title}  | Magiscrita`}
        noindex
      />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Personalidade',
          personality?.title ?? 'Carregando...',
        ]}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        isScrolling
      >
        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            permission={permission}
            icon={<UserCircleGear size={40} />}
            label="Aparência"
            customFunctionOnClickSideButton={() =>
              router.push(
                `/project/${id}/persons/${personId}/personality/${personalityId}/edit`,
              )
            }
            isToEdit
            inTop
          />

          <ContainerGrid padding={4} darkBackground>
            <InfoDefault size="lg" title="Titulo:">
              <Text family="body" size="3xl" height="shorter" weight="bold">
                {personality?.title}
              </Text>
            </InfoDefault>

            <InfoDefault title="Descrição:">
              <Text family="body" size="xl" height="shorter" weight="bold">
                {personality?.description}
              </Text>
            </InfoDefault>

            <InfoDefault title="Consequências:">
              <ContainerGrid
                css={{ gap: '$8', marginTop: '$4' }}
                padding={0}
                columns={
                  personality?.consequences && personality.consequences[0]
                    ? 2
                    : 1
                }
              >
                {personality?.consequences && personality.consequences[0] ? (
                  personality.consequences.map((consequence) => (
                    <ContainerGrid
                      padding={4}
                      css={{
                        background: '$gray700',
                        borderRadius: '$sm',
                        boxShadow: '$default',
                      }}
                      key={consequence.id}
                    >
                      <InfoDefault size="lg" title="Titulo:">
                        <Text
                          family="body"
                          size="xl"
                          height="shorter"
                          weight="bold"
                        >
                          {consequence?.title}
                        </Text>
                      </InfoDefault>

                      <InfoDefault title="Descrição:">
                        <Text family="body" height="shorter" weight="bold">
                          {consequence?.description}
                        </Text>
                      </InfoDefault>
                    </ContainerGrid>
                  ))
                ) : (
                  <ListEmpty
                    message="Nenhuma consequência adicionada a lista."
                    isLoading={loadingPerson}
                    isInLine
                  />
                )}
              </ContainerGrid>
            </InfoDefault>

            <InfoDefault title="Criado em:">
              <Text family="body" size="sm" height="shorter" weight="bold">
                {personality?.created_at
                  ? getDate(personality?.created_at)
                  : 'Carregando...'}
              </Text>
            </InfoDefault>
          </ContainerGrid>
        </ContainerGrid>

        <CommentsOnPage
          onNewComment={handleCommentInPersonality}
          permission={permission}
          comments={personality?.comments}
        />

        {/* <EditorAndCommentsToGenerics
          persons={persons}
          referenceArchives={files}
          isNew={personalityId === 'new'}
          editorTo={keysPersonality.label}
          projectId={project?.id}
          personId={person?.id!}
          object={
            {
              ...personality,
              subObjects: personality?.consequences || [],
            } as IGenericObject
          }
          withSubObjects={keysPersonality.subObjects}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysPersonality.keyPath}
          comments={commentsInThisPersonality}
        /> */}
      </ProjectPageLayout>
    </>
  )
}
