import { DefaultError } from '@components/usefull/DefaultError'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { TextInput } from '@components/usefull/TextInput'
import { ProjectsContext } from '@contexts/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { useWindowSize } from '@hooks/useWindow'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { Heading, Text, TextInput as Input } from '@og-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  AddButton,
  GenereCard,
  Generes,
  InputContainer,
  InputGroup,
  NewBookContainer,
  NewBookForm,
} from './styles'

const newBookSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'O campo é obrigatório.' })
    .max(100, { message: 'O titulo não pode ter mais de 100 caracteres.' }),
  subtitle: z
    .string()
    .max(100, { message: 'O subtitulo não pode ter mais de 100 caracteres.' })
    .optional(),
  literaryGenere: z
    .string()
    .min(1, { message: 'O campo é obrigatório.' })
    .max(200, {
      message: 'O gênero literário não pode ter mais de 100 caracteres.',
    }),
  words: z
    .string()
    .max(20, { message: 'Valor excede o limite aceito' })
    .regex(/^\d+$/, { message: 'Insira apenas números' })
    .optional(),
  writtenWords: z
    .string()
    .max(20, { message: 'Valor excede o limite aceito' })
    .regex(/^\d+$/, { message: 'Insira apenas números' })
    .optional(),
  generes: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, { message: 'O nome do gênero é obrigatório' })
          .max(150, {
            message: 'O gênero não pode ter mais de 150 caracteres',
          }),
      }),
    )
    .min(1, { message: 'O livro precisa ter pelo menos um gênero' })
    .max(6, {
      message:
        'Não é aconselhável que um livro tenha muitos gêneros, por esse motivo, limitamos o número de gêneros para 6',
    }),
  isbn: z.string().max(200, { message: 'Seu isbn é inválido' }).optional(),
})

type newBookFormData = z.infer<typeof newBookSchema>

export default function NewBookPage() {
  const [genere, setGenere] = useState('')

  const { loading, error, setError, createBook } = useContext(ProjectsContext)

  const {
    register,
    setValue,
    watch,
    setError: setErrorInForm,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<newBookFormData>({
    resolver: zodResolver(newBookSchema),
  })
  const generes = watch('generes')

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/books`)

  const { project, projectName } = useProject(id as string)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  function handleAddGenere() {
    const generesNow = generes || []
    const genereToAdd = genere.toLowerCase()

    if (generesNow.length >= 6) {
      return setErrorInForm('generes', {
        message:
          'Não é aconselhável que um livro tenha muitos gêneros, por esse motivo, limitamos o número de gêneros para 6',
      })
    }

    const genereExiste = generesNow.find(
      (g) => g.name.toLowerCase() === genereToAdd,
    )

    if (genereExiste) {
      return setErrorInForm('generes', {
        message: 'Você já adicionou esse gênero. Tente outro',
      })
    }

    setValue('generes', [{ name: genere }, ...generesNow])
    setErrorInForm('generes', { message: '' })
    setGenere('')
  }

  function handleRemoveGenere(genere: string) {
    const filteredGeneres = generes.filter((g) => g.name !== genere)

    setValue('generes', filteredGeneres)
  }

  async function handleCreateBook(data: newBookFormData) {
    const created = await createBook({ newBook: data, project })

    if (created) {
      router.push(`/project/${id}/books`)
    }
  }

  return (
    <>
      <NextSeo title={`${projectName}-Novo livro | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Livros', 'Novo']}
        loading={loading}
        inError={!loading && !project}
        isFullScreen
      >
        {error && (
          <DefaultError
            close={() => setError(undefined)}
            title={error.title}
            message={error.message}
          />
        )}

        <NewBookContainer>
          <NewBookForm onSubmit={handleSubmit(handleCreateBook)}>
            <Heading size="sm">Vamos criar um novo livro...</Heading>

            <InputGroup columns={smallWindow ? 1 : 2}>
              <InputContainer>
                <Text family="body" size="sm">
                  Título do livro
                  <Text as="span" family="body" size="sm">
                    {errors.title?.message}
                  </Text>
                </Text>

                <TextInput label="title" register={register} />
              </InputContainer>

              <InputContainer>
                <Text family="body" size="sm">
                  Subtítulo do livro (Opcional)
                  <Text as="span" family="body" size="sm">
                    {errors.subtitle?.message}
                  </Text>
                </Text>

                <TextInput label="subtitle" register={register} />
              </InputContainer>
            </InputGroup>

            <InputGroup columns={smallWindow ? 1 : 2}>
              <InputContainer>
                <Text family="body" size="sm">
                  Estimativa de palavras para esse livro
                  <Text as="span" family="body" size="sm">
                    {errors.words?.message}
                  </Text>
                </Text>

                <TextInput label="words" register={register} />
              </InputContainer>

              <InputContainer>
                <Text family="body" size="sm">
                  Palavras já escritas
                  <Text as="span" family="body" size="sm">
                    {errors.writtenWords?.message}
                  </Text>
                </Text>

                <TextInput label="writtenWords" register={register} />
              </InputContainer>
            </InputGroup>

            <InputGroup columns={smallWindow ? 1 : 2}>
              <InputContainer>
                <Text family="body" size="sm">
                  Gênero literário do livro
                  <Text as="span" family="body" size="sm">
                    {errors.literaryGenere?.message}
                  </Text>
                </Text>

                <TextInput label="literaryGenere" register={register} />
              </InputContainer>

              <InputContainer>
                <Text family="body" size="sm">
                  ISBN do livro (Opcional)
                  <Text as="span" family="body" size="sm">
                    {errors.isbn?.message}
                  </Text>
                </Text>

                <TextInput label="isbn" register={register} />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <InputContainer>
                <Text family="body" size="sm">
                  Adicionar gênero ao livro:
                  <Text as="span" family="body" size="sm">
                    {errors.generes?.message}
                  </Text>
                </Text>

                <Input
                  name="genere"
                  value={genere}
                  onChange={(e) => setGenere(e.target.value)}
                />

                <AddButton
                  type="button"
                  label="Adicionar"
                  wid="hug"
                  css={{ boxShadow: 'none' }}
                  disabled={!genere}
                  onClick={handleAddGenere}
                />
              </InputContainer>

              <InputContainer>
                <Text family="body" size="sm">
                  Gêneros do livro:
                </Text>
              </InputContainer>
              <Generes isEmpty={generes ? !generes[0] : true}>
                {generes && generes[0] ? (
                  <>
                    {generes.map((g) => (
                      <GenereCard key={g.name}>
                        <Text>{g.name}</Text>

                        <button
                          type="button"
                          title="remover gênero"
                          onClick={() => handleRemoveGenere(g.name)}
                        >
                          <X weight="bold" size={18} />
                        </button>
                      </GenereCard>
                    ))}
                  </>
                ) : (
                  <ListEmpty message="Nenhum gênero foi adicionado ainda" />
                )}
              </Generes>
            </InputGroup>

            <AddButton
              type="submit"
              label="Criar livro"
              wid="hug"
              css={{
                boxShadow: 'none',
              }}
              disabled={isSubmitting}
            />
          </NewBookForm>
        </NewBookContainer>
      </ProjectPageLayout>
    </>
  )
}
