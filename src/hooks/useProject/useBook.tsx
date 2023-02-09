import { useContext } from 'react'
import {
  IBooksResponse,
  ICapitule,
  IScene,
} from '../../api/responsesTypes/IBooksResponse'
import { ProjectsContext } from '../../contexts/projects'
import { UserContext } from '../../contexts/user'

export interface IInfos {
  infos: Array<{
    label: string
    value: string
  }>
  columns: 1 | 2 | 3 | 4
}

export interface IFindCapituleResponse {
  capitule: ICapitule | undefined
  capituleName: string

  findScene: (id: string) => IScene | undefined
}

export function useBook(books: IBooksResponse[], id: string) {
  const { loading, users } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const book = books?.find((book) => book.id === id)
  const bookName = loading
    ? 'Carregando...'
    : `${book?.title} ${book?.subtitle ? ' - ' + book.subtitle : ''}`
  const bookInfos: IInfos[] = [
    {
      infos: [
        { label: 'Titulo', value: book?.title || 'Carregando...' },
        book?.subtitle
          ? {
              label: 'Subtitulo',
              value: book?.subtitle || 'Carregando...',
            }
          : {
              label: '',
              value: '',
            },
      ],
      columns: 2,
    },
    {
      infos: [
        {
          label: 'Gênero literário',
          value: book?.literaryGenere || 'Carregando...',
        },
        {
          label: 'Gêneros',
          value: `${book?.generes.length}` || 'Carregando...',
        },
        {
          label: 'Autores',
          value: `${book?.authors.length}` || 'Carregando...',
        },
        {
          label: 'ISBN',
          value: book?.isbn || 'Você ainda não definiu o seu ISBN',
        },
        // {
        //   label: 'Estimativa de palavras',
        //   value: book?.words || 'Carregando...',
        // },
        // {
        //   label: 'Palavras escritas',
        //   value: book?.writtenWords || 'Carregando...',
        // },
        {
          label: 'Personagens',
          value: `${book?.plot.persons.length}` || 'Carregando...',
        },
        {
          label: 'Capítulos',
          value: `${book?.capitules.length}` || 'Carregando...',
        },
        {
          label: 'Criado em',
          value: book?.createAt || 'Carregando...',
        },
        {
          label: 'Atualizado em',
          value: book?.updateAt || 'Carregando...',
        },
      ],
      columns: 4,
    },
  ]

  const authorsIncludeCreator = users.filter((user) => {
    const userAccess = !!book?.authors?.find((u) => u.id === user.id)
    return userAccess
  })
  const bookAuthors = authorsIncludeCreator.filter((u) => u.id !== user?.id)

  function findCapitule(id: string): IFindCapituleResponse {
    const capitule = book?.capitules.find((capitule) => capitule.id === id)
    const capituleName = capitule?.name || 'Carregando...'

    function findScene(id: string) {
      const scene = capitule?.scenes?.find((s) => s.id === id)

      return scene
    }

    return { capitule, capituleName, findScene }
  }

  return { book, bookName, bookInfos, bookAuthors, findCapitule }
}
