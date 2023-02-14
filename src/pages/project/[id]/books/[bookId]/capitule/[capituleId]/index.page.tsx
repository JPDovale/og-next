import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, Textarea } from '@og-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import {
  ArchiveBox,
  ArrowClockwise,
  Info,
  ProjectorScreen,
} from 'phosphor-react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { IUpdateCapituleRequest } from '../../../../../../../api/booksRequests/types/IUpdateCapituleRequest'
import { SceneCard } from '../../../../../../../components/BooksComponents/SceneCard'
import { DefaultError } from '../../../../../../../components/DefaultError'
import { ListEmpty } from '../../../../../../../components/ListEmpty'
import { TextInput } from '../../../../../../../components/TextInput'
import { ContainerGrid } from '../../../../../../../components/usefull/ContainerGrid'
import { HeadingPart } from '../../../../../../../components/usefull/HeadingPart'
import { InfoDefault } from '../../../../../../../components/usefull/InfoDefault'
import { ProgressBar } from '../../../../../../../components/usefull/ProgressBar'
import { ProjectsContext } from '../../../../../../../contexts/projects'
import { usePreventBack } from '../../../../../../../hooks/usePreventDefaultBack'
import { useProject } from '../../../../../../../hooks/useProject'
import { useWindowSize } from '../../../../../../../hooks/useWindow'
import { ProjectPageLayout } from '../../../../../../../layouts/ProjectPageLayout'
import { AddScene } from './components/AddScene'
import { EditScene } from './components/EditScene'
import { CapituleContainer, CapituleInfos, InputContainer } from './styles'

const updateCapituleSchema = z.object({
  name: z
    .string()
    .max(600, { message: 'O nome não pode exceder 600 caracteres' })
    .optional(),
  objective: z
    .string()
    .max(600, {
      message: 'O objetivo do capítulo não pode exceder 600 caracteres',
    })
    .optional(),
  act1: z
    .string()
    .max(10000, { message: 'O campo não pode exceder 10000 caracteres' })
    .optional(),
  act2: z
    .string()
    .max(10000, { message: 'O campo não pode exceder 10000 caracteres' })
    .optional(),
  act3: z
    .string()
    .max(10000, { message: 'O campo não pode exceder 10000 caracteres' })
    .optional(),
})

type updateCapituleBodyData = z.infer<typeof updateCapituleSchema>

export default function CapitulePage() {
  const [isAddingScene, setIsAddingScene] = useState(false)
  const [onEditScene, setOnEditScene] = useState('')

  const { loading, error, setError, updateCapitule } =
    useContext(ProjectsContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<updateCapituleBodyData>({
    resolver: zodResolver(updateCapituleSchema),
  })

  const router = useRouter()
  const { id, bookId, capituleId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/books/${bookId}`)

  const { project, useBook, findManyPersons } = useProject(id as string)
  const { book, bookName, findCapitule, bookWords, bookWrittenWords } = useBook(
    bookId as string,
  )
  const { capitule, capituleName, findScene, capituleWords } = findCapitule(
    capituleId as string,
  )
  const sceneToUpdate = findScene(onEditScene)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  async function handleUpdateCapitule(data: updateCapituleBodyData) {
    if (data.act1 === ' ') data.act1 = ''
    if (data.act2 === ' ') data.act2 = ''
    if (data.act3 === ' ') data.act3 = ''

    const capitule: IUpdateCapituleRequest = {
      bookId: bookId as string,
      capituleId: capituleId as string,
      name: data.name,
      objective: data.objective,
      structure: {
        act1: data.act1 || undefined,
        act2: data.act2 || undefined,
        act3: data.act3 || undefined,
      },
    }

    await updateCapitule(capitule)
    reset()
  }

  return (
    <>
      <NextSeo title={`${bookName}-${capituleName} | Ognare`} noindex />

      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={['Livros', bookName, 'Capítulo', capituleName]}
        loading={loading}
        inError={!loading && (!book || !capitule)}
        isScrolling
      >
        {error && (
          <DefaultError
            close={() => setError(undefined)}
            title={error.title}
            message={error.message}
          />
        )}

        <CapituleContainer>
          <GoBackButton />

          <HeadingPart icon={<Info size={40} />} label="Informações:" />

          <CapituleInfos onSubmit={handleSubmit(handleUpdateCapitule)}>
            <InputContainer>
              <Text family="body" size="sm">
                Nome do capítulo
                <Text as="span" family="body" size="sm">
                  {errors.name?.message}
                </Text>
              </Text>

              <TextInput
                register={register}
                label="name"
                placeholder={capitule?.name || 'Carregando...'}
              />
            </InputContainer>

            <InputContainer>
              <Text family="body" size="sm">
                Objetivo do capítulo
                <Text as="span" family="body" size="sm">
                  {errors.objective?.message}
                </Text>
              </Text>

              <Textarea
                css={{ width: '100%', boxShadow: 'none' }}
                placeholder={capitule?.objective || 'Carregando...'}
                {...register('objective')}
              />
            </InputContainer>

            <ContainerGrid columns={3}>
              <InputContainer>
                <Text family="body" size="sm">
                  Estrutura do capítulo: Ato 1
                  <Text as="span" family="body" size="sm">
                    {errors.act1?.message}
                  </Text>
                </Text>

                <Textarea
                  css={{ width: '100%', boxShadow: 'none' }}
                  placeholder={capitule?.structure?.act1 || 'Não definido'}
                  {...register('act1')}
                />
              </InputContainer>

              <InputContainer>
                <Text family="body" size="sm">
                  Estrutura do capítulo: Ato 2
                  <Text as="span" family="body" size="sm">
                    {errors.act2?.message}
                  </Text>
                </Text>

                <Textarea
                  css={{ width: '100%', boxShadow: 'none' }}
                  placeholder={capitule?.structure?.act2 || 'Não definido'}
                  {...register('act2')}
                />
              </InputContainer>

              <InputContainer>
                <Text family="body" size="sm">
                  Estrutura do capítulo: Ato 3
                  <Text as="span" family="body" size="sm">
                    {errors.act3?.message}
                  </Text>
                </Text>

                <Textarea
                  css={{ width: '100%', boxShadow: 'none' }}
                  placeholder={capitule?.structure?.act3 || 'Não definido'}
                  {...register('act3')}
                />
              </InputContainer>
            </ContainerGrid>

            <Button
              type="submit"
              label="Salvar"
              align="center"
              disabled={isSubmitting || !isDirty}
              css={{ padding: '$3', boxShadow: 'none' }}
              icon={<ArchiveBox />}
            />
          </CapituleInfos>

          <HeadingPart label="Progresso" icon={<ArrowClockwise size={40} />} />
          <ContainerGrid darkBackground>
            <InfoDefault
              title={`Referente ao livro: ${bookWrittenWords} palavras escritas de ${bookWords}`}
            >
              <ProgressBar actual={bookWrittenWords} final={bookWords} />
            </InfoDefault>

            <InfoDefault
              title={`${capituleWords} palavras escritas nesse capítulo`}
            >
              <ProgressBar actual={capituleWords} final={capituleWords} />
            </InfoDefault>
          </ContainerGrid>

          <HeadingPart
            icon={<ProjectorScreen size={40} />}
            label="Cenas"
            customFunctionToAdd={() => setIsAddingScene(!isAddingScene)}
            isToAdd
          />

          {isAddingScene ? (
            <AddScene
              onClose={() => setIsAddingScene(false)}
              projectId={project.id}
              bookId={book?.id!}
              capitule={capitule!}
            />
          ) : onEditScene ? (
            <EditScene
              projectId={project.id}
              bookId={book?.id!}
              capitule={capitule!}
              scene={sceneToUpdate!}
              onClose={() => setOnEditScene('')}
            />
          ) : (
            <ContainerGrid columns={smallWindow ? 1 : 2}>
              {capitule?.scenes && capitule.scenes[0] ? (
                capitule?.scenes?.map((scene) => {
                  const personsInThisScene = findManyPersons(scene.persons)

                  return (
                    <SceneCard
                      setOnEditScene={setOnEditScene}
                      key={scene.id}
                      bookId={book?.id!}
                      capituleId={capitule.id!}
                      scene={scene}
                      persons={personsInThisScene}
                    />
                  )
                })
              ) : (
                <ListEmpty
                  message="Nenhuma cena foi criada ainda."
                  icon={<ProjectorScreen size={40} />}
                />
              )}
            </ContainerGrid>
          )}
        </CapituleContainer>
      </ProjectPageLayout>
    </>
  )
}
