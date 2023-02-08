import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Textarea } from '@og-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArchiveBox, Info, ProjectorScreen } from 'phosphor-react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { DefaultError } from '../../../../../../../components/DefaultError'
import { ListEmpty } from '../../../../../../../components/ListEmpty'
import { TextInput } from '../../../../../../../components/TextInput'
import { ContainerGrid } from '../../../../../../../components/usefull/ContainerGrid'
import { HeadingPart } from '../../../../../../../components/usefull/HeadingPart'
import { InfoDefault } from '../../../../../../../components/usefull/InfoDefault'
import { ProjectsContext } from '../../../../../../../contexts/projects'
import { usePreventBack } from '../../../../../../../hooks/usePreventDefaultBack'
import { useProject } from '../../../../../../../hooks/useProject'
import { ProjectPageLayout } from '../../../../../../../layouts/ProjectPageLayout'
import { CapituleContainer, CapituleInfos } from './styles'

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
    .regex(/^[^<>{}\\]+$/, { message: 'Não coloque caracteres especiais' })
    .optional(),
  act2: z
    .string()
    .max(10000, { message: 'O campo não pode exceder 10000 caracteres' })
    .regex(/^[^<>{}\\]+$/, { message: 'Não coloque caracteres especiais' })
    .optional(),
  act3: z
    .string()
    .max(10000, { message: 'O campo não pode exceder 10000 caracteres' })
    .regex(/^[^<>{}\\]+$/, { message: 'Não coloque caracteres especiais' }),
})

type updateCapituleBodyData = z.infer<typeof updateCapituleSchema>

export default function CapitulePage() {
  const { loading, error, setError } = useContext(ProjectsContext)

  const { register, handleSubmit } = useForm<updateCapituleBodyData>({
    resolver: zodResolver(updateCapituleSchema),
  })

  const router = useRouter()
  const { id, bookId, capituleId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/books/${bookId}`)

  const { project, useBook } = useProject(id as string)
  const { book, bookName, findCapitule } = useBook(bookId as string)
  const { capitule, capituleName } = findCapitule(capituleId as string)

  async function handleUpdateCapitule(data: updateCapituleBodyData) {}

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
            <InfoDefault title="Nome do capítulo">
              <TextInput
                register={register}
                label="name"
                value={capitule?.name || 'Carregando...'}
              />
            </InfoDefault>

            <ContainerGrid columns={3}>
              <InfoDefault title="Ato 1">
                <Textarea
                  css={{ width: '100%', boxShadow: 'none' }}
                  value={capitule?.structure?.act1 || 'Não definido'}
                  {...register('act1')}
                />
              </InfoDefault>

              <InfoDefault title="Ato 2">
                <Textarea
                  css={{ width: '100%', boxShadow: 'none' }}
                  value={capitule?.structure?.act2 || 'Não definido'}
                  {...register('act1')}
                />
              </InfoDefault>

              <InfoDefault title="Ato 3">
                <Textarea
                  css={{ width: '100%', boxShadow: 'none' }}
                  value={capitule?.structure?.act3 || 'Não definido'}
                  {...register('act1')}
                />
              </InfoDefault>
            </ContainerGrid>

            <Button
              type="submit"
              label="Salvar"
              align="center"
              css={{ padding: '$3' }}
              icon={<ArchiveBox />}
            />
          </CapituleInfos>

          <HeadingPart
            icon={<ProjectorScreen size={40} />}
            label="Cenas"
            isToAdd
          />

          <ContainerGrid>
            {capitule?.scenes && capitule.scenes[0] ? (
              capitule?.scenes?.map((scene) => <>{scene.sequence}</>)
            ) : (
              <ListEmpty
                message="Nenhuma cena foi criada ainda."
                icon={<ProjectorScreen size={40} />}
              />
            )}
          </ContainerGrid>
        </CapituleContainer>
      </ProjectPageLayout>
    </>
  )
}
