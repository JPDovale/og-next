import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Text } from '.'

describe('TextComponent', () => {
  it('renders correctly', () => {
    render(<Text>Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('size-md')).toEqual(true)
    expect(element.className.includes('family-text')).toEqual(true)
    expect(element.className.includes('spacing-default')).toEqual(true)
    expect(element.className.includes('height-base')).toEqual(true)
    expect(element.className.includes('weight-regular')).toEqual(true)
  })

  it('should be able to render this with size extra extra small', () => {
    render(<Text size="xxs">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('size-xxs')).toEqual(true)
  })

  it('should be able to render this with size extra small', () => {
    render(<Text size="xs">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('size-xs')).toEqual(true)
  })

  it('should be able to render this with size small', () => {
    render(<Text size="sm">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('size-sm')).toEqual(true)
  })

  it('should be able to render this with size large', () => {
    render(<Text size="lg">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('size-lg')).toEqual(true)
  })

  it('should be able to render this with size extra large', () => {
    render(<Text size="xl">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('size-xl')).toEqual(true)
  })

  it('should be able to render this with size extra large * 2', () => {
    render(<Text size="2xl">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('size-2xl')).toEqual(true)
  })

  it('should be able to render this with size extra large * 3', () => {
    render(<Text size="3xl">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('size-3xl')).toEqual(true)
  })

  it('should be able to render this with size extra large * 4', () => {
    render(<Text size="4xl">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('size-4xl')).toEqual(true)
  })

  it('should be able to render this with size extra large * 5', () => {
    render(<Text size="5xl">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('size-5xl')).toEqual(true)
  })

  it('should be able to render this with size extra large * 6', () => {
    render(<Text size="6xl">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('size-6xl')).toEqual(true)
  })

  it('should be able to render this with size extra large * 7', () => {
    render(<Text size="7xl">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('size-7xl')).toEqual(true)
  })

  it('should be able to render this with size extra large * 8', () => {
    render(<Text size="8xl">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('size-8xl')).toEqual(true)
  })

  it('should be able to render this with family body text', () => {
    render(<Text family="body">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('family-body')).toEqual(true)
  })

  it('should be able to render this with family heading text', () => {
    render(<Text family="headingText">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('family-headingText')).toEqual(true)
  })

  it('should be able to render this with spacing minimus', () => {
    render(<Text spacing="minimus">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('spacing-minimus')).toEqual(true)
  })

  it('should be able to render this with spacing minus', () => {
    render(<Text spacing="minus">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('spacing-minus')).toEqual(true)
  })

  it('should be able to render this with spacing medium', () => {
    render(<Text spacing="medium">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('spacing-medium')).toEqual(true)
  })

  it('should be able to render this with spacing maximum', () => {
    render(<Text spacing="maximum">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('spacing-maximum')).toEqual(true)
  })

  it('should be able to render this with height shorter', () => {
    render(<Text height="shorter">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('height-shorter')).toEqual(true)
  })

  it('should be able to render this with height short', () => {
    render(<Text height="short">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('height-short')).toEqual(true)
  })

  it('should be able to render this with height tall', () => {
    render(<Text height="tall">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('height-tall')).toEqual(true)
  })

  it('should be able to render this with weight medium', () => {
    render(<Text weight="medium">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('weight-medium')).toEqual(true)
  })

  it('should be able to render this with weight bold', () => {
    render(<Text weight="bold">Hello world</Text>)

    const element = screen.getByText('Hello world')

    expect(element).toBeInTheDocument()
    expect(element.className.includes('weight-bold')).toEqual(true)
  })
})
