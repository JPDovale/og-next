import { IBook } from '@api/responsesTypes/book/IBook'
import { getDate } from '@utils/dates/getDate'
import { IInfos } from '..'

export function constructInfosBook(book: IBook | null) {
  const bookInfos: IInfos[] = [
    {
      infos: [
        { label: 'Titulo', value: book?.name.title || 'Carregando...' },
        book?.name.subtitle
          ? {
              label: 'Subtitulo',
              value: book?.name.subtitle || 'Carregando...',
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
          value: book?.infos.literaryGenre || 'Carregando...',
        },
        {
          label: 'Gêneros',
          value: `${book?.collections.genre.itensLength}` || 'Carregando...',
        },
        {
          label: 'Autores',
          value: `${book?.collections.author?.itensLength}` || 'Carregando...',
        },
        {
          label: 'ISBN',
          value: book?.infos.isbn || 'Carregando...',
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
          label: 'Capítulos',
          value:
            `${book?.collections.capitules.itensLength}` || 'Carregando...',
        },
        {
          label: 'Criado em',
          value: book?.infos.createdAt
            ? getDate(book.infos.createdAt)
            : 'Carregando...',
        },
        {
          label: 'Atualizado em',
          value: book?.infos.updatedAt
            ? getDate(book.infos.updatedAt)
            : 'Carregando...',
        },
      ],
      columns: 4,
    },
  ]

  return bookInfos
}
