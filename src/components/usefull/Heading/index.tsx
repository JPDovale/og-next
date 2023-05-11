import { styled } from '@styles/index'
import React, { ComponentProps, ElementType, ReactNode } from 'react'

const HeadingContainer = styled('h2', {
  lineHeight: '$shorter',
  margin: 0,
  fontFamily: '$heading',
  color: '$base100',

  variants: {
    size: {
      sm: { fontSize: '$xl' },
      md: { fontSize: '$2xl' },
      lg: { fontSize: '$3xl' },
      xl: { fontSize: '$4xl' },
      '2xl': { fontSize: '$5xl' },
      '3xl': { fontSize: '$6xl' },
      '4xl': { fontSize: '$7xl' },
      '5xl': { fontSize: '$8xl' },
    },
    spacing: {
      default: { letterSpacing: 'none' },
      minimus: { letterSpacing: '$minimum' },
      minus: { letterSpacing: '$minus' },
      medium: { letterSpacing: '$medium' },
      maximum: { letterSpacing: '$maximum' },
    },
    height: {
      shorter: { lineHeight: '$shorter' },
      short: { lineHeight: '$short' },
      base: { lineHeight: '$base' },
      tall: { lineHeight: '$tall' },
    },
    weight: {
      regular: { fontWeight: '$regular' },
      medium: { fontWeight: '$medium' },
      bold: { fontWeight: '$bold' },
    },
    colorInvert: {
      true: {
        color: '$text100',
      },
      false: {
        color: '$text800',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    spacing: 'default',
    height: 'base',
    weight: 'regular',
    colorInvert: false,
  },
})

export interface IHeadingProps extends ComponentProps<typeof HeadingContainer> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  spacing?: 'default' | 'minimus' | 'minus' | 'medium' | 'maximum'
  height?: 'shorter' | 'short' | 'base' | 'tall'
  weight?: 'regular' | 'medium' | 'bold'
  as?: ElementType
  children?: ReactNode
  colorInvert?: boolean
}

export function Heading({ colorInvert = false, ...props }: IHeadingProps) {
  return <HeadingContainer colorInvert={colorInvert} {...props} />
}

Heading.displayName = 'Heading'
