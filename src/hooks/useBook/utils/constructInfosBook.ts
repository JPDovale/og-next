import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { getDate } from '@utils/dates/getDate'
import { IInfos } from '..'

export function constructInfosBook(book: IBooksResponse | null) {
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
          value: book?.literary_genre || 'Carregando...',
        },
        {
          label: 'Gêneros',
          value: `${book?.genres?.length}` || 'Carregando...',
        },
        {
          label: 'Autores',
          value: `${book?.authors?.length}` || 'Carregando...',
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
          label: 'Capítulos',
          value: `${book?.capitules?.length}` || 'Carregando...',
        },
        {
          label: 'Criado em',
          value: book?.created_at ? getDate(book.created_at) : 'Carregando...',
        },
        {
          label: 'Atualizado em',
          value: book?.updated_at ? getDate(book.updated_at) : 'Carregando...',
        },
      ],
      columns: 4,
    },
  ]

  return bookInfos
}
