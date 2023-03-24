import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, vitest } from 'vitest'
import { BookGenere } from '.'

describe('Book genre card', () => {
  it('renders correctly', () => {
    render(
      <BookGenere genere="teste" onRemove={(genre) => genre} isNotRemovable />,
    )

    const element = screen.getByText('teste')

    expect(element).toBeInTheDocument()
  })

  it('renders button to remove when is possible remove', () => {
    render(<BookGenere genere="teste" onRemove={(genre) => genre} />)

    const element = screen.getByText('teste')
    const buttonToRemove = screen.getByTitle('Remover gênero do livro')

    expect(element).toBeInTheDocument()
    expect(buttonToRemove).toBeInTheDocument()
  })

  it('should be able call function when remove button are clicked', () => {
    const onRemoveMocked = vitest.fn()

    render(<BookGenere genere="teste" onRemove={onRemoveMocked} />)

    const element = screen.getByText('teste')
    const buttonToRemove = screen.getByTitle('Remover gênero do livro')
    fireEvent.click(buttonToRemove)

    expect(element).toBeInTheDocument()
    expect(buttonToRemove).toBeInTheDocument()
    expect(onRemoveMocked).toHaveBeenCalled()
  })
})
