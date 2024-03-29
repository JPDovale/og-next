import { SceneCard } from '@components/BooksComponents/SceneCard'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { ProgressBar } from '@components/usefull/ProgressBar'
import { Text } from '@components/usefull/Text'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { useWindowSize } from '@hooks/useWindow'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { Textarea } from '@components/usefull/Textarea'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import {
  ArchiveBox,
  ArrowClockwise,
  Info,
  ProjectorScreen,
  Trash,
  X,
} from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AddScene } from './components/AddScene'
import { EditScene } from './components/EditScene'
import {
  CapituleContainer,
  CapituleInfos,
  DeleteContainer,
  InputContainer,
} from './styles'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { useBook } from '@hooks/useBook'
import { useCapitule } from '@hooks/useCapitule'
import { IError } from '@@types/errors/IError'
import { IUpdateCapitule } from '@hooks/useCapitule/types/IUpdateCapitule'
import { ToastError } from '@components/usefull/ToastError'

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
  const [isSelectedDelete, setIsSelectedDelete] = useState(false)
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id, bookId, capituleId } = router.query

  const pathGoBack = `/project/${id}/books/${bookId}`
  const { GoBackButton } = usePreventBack(pathGoBack)

  const { project, projectName, permission } = useProject(id as string)

  const { book } = useBook(bookId as string)

  const {
    capitule,
    capituleName,
    loadingCapitule,
    capituleWords,
    findScene,
    callEvent,
  } = useCapitule(capituleId as string)

  const { scene: sceneToUpdate } = findScene(onEditScene)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<updateCapituleBodyData>({
    resolver: zodResolver(updateCapituleSchema),
    defaultValues: {
      act1: capitule?.structure.act1 ?? '',
      act2: capitule?.structure.act2 ?? '',
      act3: capitule?.structure.act3 ?? '',
      name: capitule?.name ?? '',
      objective: capitule?.infos.objective ?? '',
    },
  })

  const { smallWindow } = useWindowSize()

  async function handleUpdateCapitule(data: updateCapituleBodyData) {
    if (data.act1 === ' ') data.act1 = ''
    if (data.act2 === ' ') data.act2 = ''
    if (data.act3 === ' ') data.act3 = ''

    const capitule: IUpdateCapitule = {
      name: data.name,
      objective: data.objective,
      structure: {
        act1: data.act1 || undefined,
        act2: data.act2 || undefined,
        act3: data.act3 || undefined,
      },
    }

    await callEvent.update(capitule)
  }

  async function handleDeleteCapitule() {
    router.push(pathGoBack)

    await callEvent.delete()
  }

  return (
    <>
      <NextSeo
        title={`${
          book?.name.fullName ?? 'Carregando...'
        }-${capituleName} | Magiscrita`}
        noindex
      />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Livros',
          book?.name.fullName ?? 'Carregando...',
          'Capítulo',
          capituleName,
        ]}
        loading={loadingCapitule}
        inError={!loadingCapitule && (!book || !capitule)}
        isScrolling
      >
        <ToastError error={error} setError={setError} />

        <CapituleContainer>
          <GoBackButton />

          <HeadingPart
            permission={permission}
            icon={<Info size={40} />}
            label="Informações:"
          />

          <CapituleInfos
            onDeleteSelected={isSelectedDelete}
            onSubmit={handleSubmit(handleUpdateCapitule)}
          >
            {!isSelectedDelete && (
              <>
                <InputContainer>
                  <Text family="body" size="sm">
                    Nome do capítulo
                    <Text as="span" family="body" size="sm">
                      {errors.name?.message}
                    </Text>
                  </Text>

                  <TextInputRoot>
                    <TextInputInput
                      placeholder={capituleName}
                      {...register('name')}
                    />
                  </TextInputRoot>
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
                    placeholder={capitule?.infos.objective || 'Carregando...'}
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
                      placeholder={capitule?.structure.act1 || 'Não definido'}
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
                      placeholder={capitule?.structure.act2 || 'Não definido'}
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
                      placeholder={capitule?.structure.act3 || 'Não definido'}
                      {...register('act3')}
                    />
                  </InputContainer>
                </ContainerGrid>
                <ButtonRoot
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  size="sm"
                  variant="noShadow"
                >
                  <ButtonIcon>
                    <ArchiveBox />
                  </ButtonIcon>

                  <ButtonLabel>Salvar</ButtonLabel>
                </ButtonRoot>

                <ButtonRoot
                  type="button"
                  variant="noShadow"
                  size="xs"
                  align="center"
                  css={{
                    marginTop: '$4',
                    background: '$fullError',
                  }}
                  onClick={() => setIsSelectedDelete(true)}
                >
                  <ButtonIcon>
                    <Trash />
                  </ButtonIcon>

                  <ButtonLabel>Excluir</ButtonLabel>
                </ButtonRoot>
              </>
            )}

            {isSelectedDelete && (
              <DeleteContainer>
                <Text family="body" size="lg">
                  Tem certeza que quer excluir esse capitulo? Todas as cenas e o
                  progresso de palavras serão perdidos e não será possível
                  desfazer isso depois.
                </Text>

                <div className="buttons">
                  <ButtonRoot
                    type="button"
                    align="center"
                    variant="noShadow"
                    size="sm"
                    onClick={() => setIsSelectedDelete(false)}
                  >
                    <ButtonIcon>
                      <X />
                    </ButtonIcon>

                    <ButtonLabel>Cancelar</ButtonLabel>
                  </ButtonRoot>

                  <ButtonRoot
                    type="button"
                    align="center"
                    size="sm"
                    variant="noShadow"
                    css={{ background: '$fullError' }}
                    onClick={handleDeleteCapitule}
                  >
                    <ButtonIcon>
                      <Trash />
                    </ButtonIcon>

                    <ButtonLabel>Excluir</ButtonLabel>
                  </ButtonRoot>
                </div>
              </DeleteContainer>
            )}
          </CapituleInfos>

          <HeadingPart
            label="Progresso"
            icon={<ArrowClockwise size={40} />}
            permission={permission}
          />
          <ContainerGrid darkBackground>
            <InfoDefault
              title={`Referente ao livro: ${book?.infos.writtenWords} palavras escritas de ${book?.infos.words}`}
            >
              <ProgressBar
                actual={book?.infos.writtenWords ?? 0}
                final={book?.infos.words ?? 0}
              />
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
            customFunctionOnClickSideButton={() =>
              setIsAddingScene(!isAddingScene)
            }
            permission={permission}
            isToAdd
          />

          {isAddingScene ? (
            <AddScene
              onClose={() => setIsAddingScene(false)}
              projectId={project!.id}
              bookId={book!.id}
              capitule={capitule!}
            />
          ) : onEditScene ? (
            <EditScene
              projectId={project!.id}
              capitule={capitule!}
              scene={sceneToUpdate!}
              onClose={() => setOnEditScene('')}
            />
          ) : (
            <ContainerGrid
              columns={
                capitule?.collections.scene.itens &&
                capitule.collections.scene.itens[0]
                  ? smallWindow
                    ? 1
                    : 2
                  : 1
              }
            >
              {capitule?.collections.scene.itens &&
              capitule.collections.scene.itens[0] ? (
                capitule?.collections.scene.itens?.map((scene) => {
                  return (
                    <SceneCard
                      setOnEditScene={setOnEditScene}
                      key={scene.id}
                      bookId={book?.id!}
                      capituleId={capitule.id!}
                      scene={scene}
                      persons={scene.collections.persons.itens}
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
