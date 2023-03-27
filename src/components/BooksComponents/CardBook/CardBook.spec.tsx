import { IAvatar } from '@api/responsesTypes/ICreateResponse'
import { render, screen } from '@testing-library/react'
import { describe, it, vitest } from 'vitest'
import { CardBook } from '.'

vitest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        query: {
          id: 'testProjectId',
        },
      }
    },
  }
})

interface IRenderComponentsProps {
  renderImage?: boolean
}

function renderComponent({ renderImage }: IRenderComponentsProps) {
  render(
    <CardBook
      book={{
        id: 'test',
        title: 'test title',
        subtitle: 'test subtitle',
        authors: [
          {
            email: 'test@test.com',
            id: 'testUserId',
            username: 'testUser',
          },
        ],
        capitules: [],
        comments: [],
        createAt: 'testDate',
        defaultProject: 'testProjectId',
        frontCover: renderImage
          ? {
              fileName: 'test.jpg',
              url: 'https://imgs.search.brave.com/n9qsmCV2RxhJ2mAaT8dzrNP5LtTcx2pH2rp9ESmwcmo/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5Z/Y3pFcmd0RTcxWmth/Y1VKbTJwQjFBSGFF/SyZwaWQ9QXBp',
              createdAt: 'testDate',
              updatedAt: 'testDate',
            }
          : ({} as IAvatar),
        generes: [{ name: 'fantasy' }],
        isbn: '1234567890',
        literaryGenere: 'literary',
        plot: {
          ambient: 'ambient',
          countTime: 'countTime',
          details: 'details',
          historicalFact: 'historicalFacts',
          onePhrase: 'onePhrase',
          persons: [],
          premise: 'premise',
          storyteller: 'storyTeller',
          summary: 'summary',
          urlOfText: 'urlOfText',
          structure: {
            act1: 'act1',
            act2: 'act2',
            act3: 'act3',
          },
        },
        updateAt: 'testDate',
        words: '0',
        writtenWords: '0',
      }}
    />,
  )
}

describe('Card book', () => {
  it('renders correctly', async () => {
    renderComponent({})

    const element = screen.getByTestId('card-book')

    expect(element).toBeInTheDocument()
  })

  it('should be able to render image when image url existes', async () => {
    renderComponent({ renderImage: true })

    const image = screen.getByTestId('image-cover')
    const icon = screen.queryByTestId('icon-image')

    expect(image).toBeInTheDocument()
    expect(icon).not.toBeInTheDocument()
  })

  it("should be able to render icon image when image url don't existes", async () => {
    renderComponent({ renderImage: false })

    const image = screen.queryByTestId('image-cover')
    const icon = screen.getByTestId('icon-image')

    expect(image).not.toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })
})
