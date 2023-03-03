import { IUpdateBookRequest } from '@api/booksRequests/types/IUpdateBookRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { IUserResponse } from '@api/responsesTypes/IUserResponse'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { ProjectsContext } from '@contexts/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { Trash, X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
// import { CardAuthor } from '../CardAuthor'
import { UpdateBookFormContainer } from './styles'

interface IUpdateBookFormProps {
  book: IBooksResponse | undefined
  usersInProject: IUserResponse[]
}

const updateBookFormSchema = z.object({
  title: z
    .string()
    .max(100, { message: 'O titulo não pode ter mais de 100 caracteres.' })
    .nullable(),
  subtitle: z
    .string()
    .max(100, { message: 'O subtitulo não pode ter mais de 100 caracteres.' })
    .nullable(),
  isbn: z.string().max(200, { message: 'Seu isbn é inválido' }).nullable(),
  literaryGenere: z
    .string()
    .max(200, { message: 'O titulo não pode ter mais de 100 caracteres.' })
    .nullable(),
  words: z
    .string()
    .max(20, { message: 'Valor excede o limite aceito' })
    .regex(/^\d+$/, { message: 'Insira apenas números' })
    .nullable(),
})

type UpdateBookData = z.infer<typeof updateBookFormSchema>

export function UpdateBookForm({ book, usersInProject }: IUpdateBookFormProps) {
  const [deleteSelected, setDeleteSelected] = useState(false)

  const { updateBook, deleteBook } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query

  const {
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting },
  } = useForm<UpdateBookData>({
    resolver: zodResolver(updateBookFormSchema),
    defaultValues: {
      title: book?.title,
      subtitle: book?.subtitle,
      isbn: book?.isbn,
      literaryGenere: book?.literaryGenere,
      words: book?.words,
    },
  })

  async function handleUpdateBook(data: UpdateBookData) {
    const bookInfosUpdated: IUpdateBookRequest = {
      ...data,
      bookId: book?.id!,
    }

    await updateBook(bookInfosUpdated)
  }

  async function handleDeleteBook() {
    router.push(`/project/${id}/books`)

    await deleteBook(book?.id!)
  }

  return (
    <ContainerGrid darkBackground>
      <UpdateBookFormContainer onSubmit={handleSubmit(handleUpdateBook)}>
        <ContainerGrid columns={2}>
          <InfoDefault title="Titulo" as="label">
            <TextInputRoot>
              <TextInputInput {...register('title')} />
            </TextInputRoot>
          </InfoDefault>

          <InfoDefault title="Subtitulo" as="label">
            <TextInputRoot>
              <TextInputInput {...register('subtitle')} />
            </TextInputRoot>
          </InfoDefault>

          <InfoDefault title="ISBN" as="label">
            <TextInputRoot>
              <TextInputInput {...register('isbn')} />
            </TextInputRoot>
          </InfoDefault>

          <InfoDefault title="Gênero literário" as="label">
            <TextInputRoot>
              <TextInputInput {...register('literaryGenere')} />
            </TextInputRoot>
          </InfoDefault>

          <InfoDefault title="Estimativa de palavras" as="label">
            <TextInputRoot>
              <TextInputInput {...register('words')} />
            </TextInputRoot>
          </InfoDefault>

          <InfoDefault title="Save">
            <ButtonRoot type="submit" disabled={isSubmitting || !isDirty}>
              <ButtonLabel>Salvar</ButtonLabel>
            </ButtonRoot>
          </InfoDefault>
        </ContainerGrid>
      </UpdateBookFormContainer>

      {/* <ContainerGrid>
        <InfoDefault title="Autores" />
        <ContainerGrid padding={0} columns={4}>
          {book?.authors.map((author) => {
            const a = usersInProject.find((user) => user.id === author.id)

            return <CardAuthor book={book} userAuthor={a} key={a?.id} />
          })}
        </ContainerGrid>
      </ContainerGrid> */}

      <ContainerGrid>
        <InfoDefault title="Danger zone" />
        {deleteSelected ? (
          <>
            <ContainerGrid columns={2} padding={0}>
              <ButtonRoot
                type="button"
                css={{ background: '$fullError' }}
                onClick={handleDeleteBook}
              >
                <ButtonIcon>
                  <Trash />
                </ButtonIcon>

                <ButtonLabel>Apagar</ButtonLabel>
              </ButtonRoot>

              <ButtonRoot
                type="button"
                onClick={() => setDeleteSelected(false)}
              >
                <ButtonIcon>
                  <X />
                </ButtonIcon>

                <ButtonLabel>Cancelar</ButtonLabel>
              </ButtonRoot>
            </ContainerGrid>
            <InfoDefault title="Tem certeza que quer excluir esse livro? Não será possível desafazer isso depois e todo o progresso será perdido." />
          </>
        ) : (
          <ButtonRoot
            type="button"
            css={{ background: '$fullError' }}
            onClick={() => setDeleteSelected(true)}
          >
            <ButtonIcon>
              <Trash />
            </ButtonIcon>

            <ButtonLabel>Apagar</ButtonLabel>
          </ButtonRoot>
        )}
      </ContainerGrid>
    </ContainerGrid>
  )
}
