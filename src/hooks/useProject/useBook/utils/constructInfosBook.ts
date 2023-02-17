import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { IInfos } from '..'

export function constructInfosBook(book: IBooksResponse | undefined) {
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

  return bookInfos
}
