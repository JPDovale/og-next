import { zodResolver } from '@hookform/resolvers/zod'
import { Heading, Text, Textarea } from '@og-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { IProjectResponse } from '../../../../../../../api/responsesTypes/IProjcetResponse'
import { DefaultError } from '../../../../../../../components/DefaultError'
import { TextInput } from '../../../../../../../components/TextInput'
import { ProjectsContext } from '../../../../../../../contexts/projects'
import { usePreventBack } from '../../../../../../../hooks/usePreventDefaultBack'
import { useWindowSize } from '../../../../../../../hooks/useWindow'
import { ProjectPageLayout } from '../../../../../../../layouts/ProjectPageLayout'
import {
  InputGroup,
  NewCapituleContainer,
  NewCapituleForm,
  InputContainer,
  AddButton,
} from './styles'

const newCapituleSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'O campo é obrigatório!' })
    .max(600, { message: 'O nome não pode exceder 600 caracteres' }),
  objective: z.string().min(1, { message: 'O campo é obrigatório!' }).max(600, {
    message: 'O objetivo do capítulo não pode exceder 600 caracteres',
  }),
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
    .regex(/^[^<>{}\\]+$/, { message: 'Não coloque caracteres especiais' })
    .optional(),
})

type newCapituleFormData = z.infer<typeof newCapituleSchema>

export default function NewCapitule() {
  const { projects, loading, books, error, setError, createCapitule } =
    useContext(ProjectsContext)

  const router = useRouter()
  const { id, bookId } = router.query
  usePreventBack(`/project/${id}`)

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<newCapituleFormData>({
    resolver: zodResolver(newCapituleSchema),
    defaultValues: {
      act1: ' ',
      act2: ' ',
      act3: ' ',
    },
  })

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const project = projects?.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const book = books?.find((book) => book.id === bookId)
  const bookName = loading
    ? 'Carregando...'
    : `${book?.title} ${book?.subtitle ? ' - ' + book.subtitle : ''}`

  async function handleCreateCapitule(data: newCapituleFormData) {
    const newCapitule = {
      bookId: bookId as string,
      name: data.name,
      objective: data.objective,
      structure: {
        act1: data.act1 === ' ' ? undefined : data.act1,
        act2: data.act2 === ' ' ? undefined : data.act2,
        act3: data.act3 === ' ' ? undefined : data.act3,
      },
    }

    const isCreated = await createCapitule(newCapitule)

    if (isCreated) {
      router.push(`/project/${id}/books/${bookId}`)
    }
  }

  return (
    <>
      <NextSeo
        title={`${bookName + ' Novo capítulo' || 'Carregando...'} | Ognare`}
        noindex
      />

      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={['Livros', bookName, 'Capítulos', 'Novo']}
        loading={loading}
        inError={!loading && !book}
        isFullScreen
      >
        {error && (
          <DefaultError
            close={() => setError(undefined)}
            title={error.title}
            message={error.message}
          />
        )}

        <NewCapituleContainer>
          <NewCapituleForm onSubmit={handleSubmit(handleCreateCapitule)}>
            <Heading size="sm">
              Vamos criar um novo capítulo para o livro {bookName}...
            </Heading>

            <InputGroup columns={smallWindow ? 1 : 2}>
              <InputContainer>
                <Text family="body" size="sm">
                  Nome do capítulo
                  <Text as="span" family="body" size="sm">
                    {errors.name?.message}
                  </Text>
                </Text>

                <TextInput label="name" register={register} />
              </InputContainer>

              <InputContainer>
                <Text family="body" size="sm">
                  Objetivo do capítulo
                  <Text as="span" family="body" size="sm">
                    {errors.objective?.message}
                  </Text>
                </Text>

                <TextInput label="objective" register={register} />
              </InputContainer>
            </InputGroup>

            <Text size="sm" css={{ marginTop: '$4' }}>
              Defina abaixo a estrutura de três atos do capítulo (opcional).
            </Text>

            <InputGroup>
              <InputContainer>
                <Text family="body" size="sm">
                  Ato 1
                  <Text as="span" family="body" size="sm">
                    {errors.act1?.message}
                  </Text>
                </Text>

                <Textarea {...register('act1')} css={{ width: '100%' }} />
              </InputContainer>

              <InputContainer>
                <Text family="body" size="sm">
                  Ato 2
                  <Text as="span" family="body" size="sm">
                    {errors.act2?.message}
                  </Text>
                </Text>

                <Textarea {...register('act2')} css={{ width: '100%' }} />
              </InputContainer>

              <InputContainer>
                <Text family="body" size="sm">
                  Ato 3
                  <Text as="span" family="body" size="sm">
                    {errors.act3?.message}
                  </Text>
                </Text>

                <Textarea {...register('act3')} css={{ width: '100%' }} />
              </InputContainer>
            </InputGroup>

            <AddButton
              type="submit"
              label="Criar capitulo"
              wid="hug"
              css={{
                boxShadow: 'none',
              }}
              disabled={isSubmitting}
            />
          </NewCapituleForm>
        </NewCapituleContainer>
      </ProjectPageLayout>
    </>
  )
}
