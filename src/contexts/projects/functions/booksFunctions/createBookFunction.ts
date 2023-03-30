import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { addBookAction } from '@contexts/projects/reducer/actions/books/addBookAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { createBookRequest } from '../../../../api/booksRequests'
import { ICreateBookDTO } from '../../../../api/dtos/booksDTOS/ICreateBookDTO'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjectResponse'
import { IUserResponse } from '../../../../api/responsesTypes/IUserResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface INewBook {
  title: string
  subtitle?: string
  literaryGenere: string
  generes: Array<{ name: string }>
  isbn?: string
  words?: string
  writtenWords?: string
}

interface ICreateBookFunction {
  newBook: INewBook
  project: IProjectResponse
  users: IUserResponse[]
  user: IUserResponse
  dispatch: Dispatch<any>
}

interface IAuthor {
  username: string
  email: string
  id: string
}

export async function createBookFunction({
  dispatch,
  newBook,
  project,
  users,
  user,
}: ICreateBookFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const idAuthors = project.users.map((user) => {
    if (user.permission === 'edit') {
      return user.id
    }

    return ''
  })

  const authorsInProject = idAuthors.map((id) => {
    const user = users.find((user) => user.id === id)

    if (user) {
      return {
        email: user?.email,
        username: user?.username,
        id: user?.id,
      }
    }

    return null
  })

  authorsInProject.push({
    email: user.email,
    username: user.username,
    id: user.id,
  })

  const authors = authorsInProject.filter(
    (author) => author !== null,
  ) as IAuthor[]

  const book: ICreateBookDTO = {
    ...newBook,
    authors,
  }

  const response = await createBookRequest({ ...book, projectId: project.id })

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      createBookFunction({ dispatch, newBook, project, users, user }),
  })

  if (handledAnswer === false) return false

  const bookReceipted = response.book as IBooksResponse
  const boxReceipted = response.box as IBoxResponse

  dispatch(addBookAction({ book: bookReceipted, box: boxReceipted }))

  return true
}
