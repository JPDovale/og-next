import { IScene } from '@api/responsesTypes/IBooksResponse'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, vitest } from 'vitest'
import { CapituleCard } from '.'

interface IRenderComponentProps {
  bookId?: string
  capitule?: {
    complete?: boolean
    createdAt?: string
    id?: string
    name?: string
    objective?: string
    sequence?: string
    updatedAt?: string
    scenes?: IScene[]
    structure?: {}
    words?: '120'
  }
  maxLengthToReorder?: number
}

const renderComponent = ({
  maxLengthToReorder,
  bookId,
  capitule,
}: IRenderComponentProps) => {
  const redirectFunctionMocked = vitest.fn()

  render(
    <CapituleCard
      bookId={bookId ?? 'fake-book-id'}
      capitule={{
        complete: capitule?.complete ?? false,
        createdAt: capitule?.createdAt ?? 'fake-date',
        id: capitule?.id ?? 'fake-id',
        name: capitule?.name ?? 'test',
        objective: capitule?.objective ?? 'test',
        sequence: capitule?.sequence ?? '1',
        updatedAt: capitule?.updatedAt ?? 'fakeDate',
        scenes: capitule?.scenes ?? [],
        structure: capitule?.structure ?? {},
        words: capitule?.words ?? '120',
      }}
      maxLengthToReorder={maxLengthToReorder ?? 3}
      redirectFunction={redirectFunctionMocked}
    />,
  )

  return { redirectFunctionMocked }
}

describe('Card capitule', () => {
  it('renders correctly', () => {
    renderComponent({})

    const element = screen.getByTestId('capitule')

    expect(element).toBeInTheDocument()
  })

  it('should be able change icon when click in button "Reorder capitule"', () => {
    renderComponent({})

    const buttonReorder = screen.getByTitle('Reordenar capitulo')
    fireEvent.click(buttonReorder)

    const cancelReorderElement = screen.getByTestId('cancel-reorder')
    const selectReorderElement = screen.queryByTestId('select-reorder')

    expect(buttonReorder).toBeInTheDocument()
    expect(cancelReorderElement).toBeInTheDocument()
    expect(selectReorderElement).not.toBeInTheDocument()
  })

  it('should be able change icon when click in button "Reorder capitule" 2 times', () => {
    renderComponent({})

    const buttonReorder = screen.getByTitle('Reordenar capitulo')
    fireEvent.click(buttonReorder)
    fireEvent.click(buttonReorder)

    const cancelReorderElement = screen.queryByTestId('cancel-reorder')
    const selectReorderElement = screen.getByTestId('select-reorder')

    expect(buttonReorder).toBeInTheDocument()
    expect(cancelReorderElement).not.toBeInTheDocument()
    expect(selectReorderElement).toBeInTheDocument()
  })

  it('should be able change capitule infos to reorder form when reorder is select', () => {
    renderComponent({})

    const buttonReorder = screen.getByTitle('Reordenar capitulo')
    fireEvent.click(buttonReorder)

    const capitulesInfosElement = screen.queryByTestId('capitule-infos')
    const reorderFormElement = screen.getByTestId('reorder-form')

    expect(buttonReorder).toBeInTheDocument()
    expect(capitulesInfosElement).not.toBeInTheDocument()
    expect(reorderFormElement).toBeInTheDocument()
  })

  it('should be able call redirect when user click in infos of capitule', () => {
    const { redirectFunctionMocked } = renderComponent({})

    const capitulesInfosElement = screen.getByTestId('capitule-infos')
    fireEvent.click(capitulesInfosElement)

    expect(redirectFunctionMocked).toHaveBeenCalled()
  })

  it('should render "Completo" when capitule is complete', () => {
    renderComponent({
      capitule: {
        complete: true,
      },
    })

    const elementComplete = screen.getByTestId('complete')
    const elementIncomplete = screen.queryByTestId('incomplete')

    expect(elementComplete).toBeInTheDocument()
    expect(elementIncomplete).not.toBeInTheDocument()
  })

  it('should render "Incompleto" when capitule is not complete', () => {
    renderComponent({})

    const elementComplete = screen.queryByTestId('complete')
    const elementIncomplete = screen.getByTestId('incomplete')

    expect(elementComplete).not.toBeInTheDocument()
    expect(elementIncomplete).toBeInTheDocument()
  })
})
