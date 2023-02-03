import { Dispatch } from 'react'
import { createBookRequest } from '../../../../api/booksRequests'
import { ICreateBookDTO } from '../../../../api/dtos/booksDTOS/ICreateBookDTO'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { IUserResponse } from '../../../../api/responsesTypes/IUserResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  addBookAction,
  setErrorAction,
} from '../../reducer/actionsProjectsReducer'

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
  if (!newBook || !project) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

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

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return createBookFunction({ newBook, project, user, users, dispatch })
    } else {
      return false
    }
  }

  if (response.errorMessage) {
    dispatch(
      setErrorAction({
        title: response.errorTitle as string,
        message: response.errorMessage,
      }),
    )
    return false
  }

  const bookReceipted = response.book as IBooksResponse
  const projectReceipted = response.project as IProjectResponse

  dispatch(addBookAction(bookReceipted, projectReceipted))

  return true
}
