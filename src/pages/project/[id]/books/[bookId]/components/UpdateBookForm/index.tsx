import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { Toast } from '@components/usefull/Toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useBook } from '@hooks/useBook'
import { useRouter } from 'next/router'
import { Trash, X } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
// import { CardAuthor } from '../CardAuthor'
import { UpdateBookFormContainer } from './styles'

interface IUpdateBookFormProps {
  bookId: string
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
    .number()
    .max(1000000, { message: 'Valor excede o limite aceito' })
    .nullable(),
})

type UpdateBookData = z.infer<typeof updateBookFormSchema>

export function UpdateBookForm({ bookId }: IUpdateBookFormProps) {
  const [deleteSelected, setDeleteSelected] = useState(false)
  const [successToastOpen, setSuccessToastOpen] = useState(false)

  const { book, callEvent } = useBook(bookId)

  const router = useRouter()
  const { id } = router.query

  const {
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting },
  } = useForm<UpdateBookData>({
    resolver: zodResolver(updateBookFormSchema),
    defaultValues: {
      title: book?.name.title,
      subtitle: book?.name.subtitle,
      isbn: book?.infos.isbn,
      literaryGenere: book?.infos.literaryGenre,
      words: book?.infos.words,
    },
  })

  async function handleUpdateBook(data: UpdateBookData) {
    const bookInfosUpdated = {
      ...data,
    }

    const { resolved } = await callEvent.update(bookInfosUpdated)

    if (resolved) {
      setSuccessToastOpen(true)
    }
  }

  async function handleDeleteBook() {
    router.push(`/project/${id}/books`)

    await callEvent.delete()
  }

  return (
    <ContainerGrid darkBackground>
      <Toast
        title="Sucesso"
        message="Livro atualizado com sucesso"
        open={successToastOpen}
        setOpen={setSuccessToastOpen}
      />

      <UpdateBookFormContainer onSubmit={handleSubmit(handleUpdateBook)}>
        <ContainerGrid columns={2}>
          <InfoDefault title="Titulo" as="label">
            <TextInputRoot size="sm">
              <TextInputInput {...register('title')} />
            </TextInputRoot>
          </InfoDefault>

          <InfoDefault title="Subtitulo" as="label">
            <TextInputRoot size="sm">
              <TextInputInput {...register('subtitle')} />
            </TextInputRoot>
          </InfoDefault>

          <InfoDefault title="ISBN" as="label">
            <TextInputRoot size="sm">
              <TextInputInput {...register('isbn')} />
            </TextInputRoot>
          </InfoDefault>

          <InfoDefault title="Gênero literário" as="label">
            <TextInputRoot size="sm">
              <TextInputInput {...register('literaryGenere')} />
            </TextInputRoot>
          </InfoDefault>

          <InfoDefault title="Estimativa de palavras" as="label">
            <TextInputRoot size="sm">
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
            align="center"
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
