import { ButtonLabel } from '@components/usefull/Button'
import { DefaultError } from '@components/usefull/DefaultError'
import { Heading } from '@components/usefull/Heading'
import { Text } from '@components/usefull/Text'
import { ProjectsContext } from '@contexts/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { useWindowSize } from '@hooks/useWindow'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { Textarea } from '@components/usefull/Textarea'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  InputGroup,
  NewCapituleContainer,
  NewCapituleForm,
  InputContainer,
  AddButton,
} from './styles'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { useBook } from '@hooks/useBook'

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
  const { loading, error, setError, createCapitule } =
    useContext(ProjectsContext)

  const router = useRouter()
  const { id, bookId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/books/${bookId}`)

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

  const { projectName } = useProject(id as string)
  const { book, bookName } = useBook(bookId as string)

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
        projectName={projectName}
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
            <GoBackButton topDistance={4} />

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

                <TextInputRoot>
                  <TextInputInput {...register('name')} />
                </TextInputRoot>
              </InputContainer>

              <InputContainer>
                <Text family="body" size="sm">
                  Objetivo do capítulo
                  <Text as="span" family="body" size="sm">
                    {errors.objective?.message}
                  </Text>
                </Text>

                <TextInputRoot>
                  <TextInputInput {...register('objective')} />
                </TextInputRoot>
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
              wid="hug"
              variant="noShadow"
              disabled={isSubmitting}
            >
              <ButtonLabel>Criar capitulo</ButtonLabel>
            </AddButton>
          </NewCapituleForm>
        </NewCapituleContainer>
      </ProjectPageLayout>
    </>
  )
}
