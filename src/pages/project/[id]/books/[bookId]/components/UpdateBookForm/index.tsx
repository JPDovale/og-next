import { IUpdateBookRequest } from '@api/booksRequests/types/IUpdateBookRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { IUserResponse } from '@api/responsesTypes/IUserResponse'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { TextInput } from '@components/usefull/TextInput'
import { ProjectsContext } from '@contexts/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@og-ui/react'
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
            <TextInput label="title" register={register} />
          </InfoDefault>

          <InfoDefault title="Subtitulo" as="label">
            <TextInput label="subtitle" register={register} />
          </InfoDefault>

          <InfoDefault title="ISBN" as="label">
            <TextInput label="isbn" register={register} />
          </InfoDefault>

          <InfoDefault title="Gênero literário" as="label">
            <TextInput label="literaryGenere" register={register} />
          </InfoDefault>

          <InfoDefault title="Estimativa de palavras" as="label">
            <TextInput label="words" register={register} />
          </InfoDefault>

          <InfoDefault title="Save">
            <Button
              label="Salvar"
              type="submit"
              disabled={isSubmitting || !isDirty}
            />
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
              <Button
                type="button"
                label="Apagar"
                icon={<Trash />}
                css={{ background: '$fullError' }}
                onClick={handleDeleteBook}
              />
              <Button
                type="button"
                label="Cancelar"
                icon={<X />}
                onClick={() => setDeleteSelected(false)}
              />
            </ContainerGrid>
            <InfoDefault title="Tem certeza que quer excluir esse livro? Não será possível desafazer isso depois e todo o progresso será perdido." />
          </>
        ) : (
          <Button
            type="button"
            label="Apagar"
            icon={<Trash />}
            css={{ background: '$fullError' }}
            onClick={() => setDeleteSelected(true)}
          />
        )}
      </ContainerGrid>
    </ContainerGrid>
  )
}
