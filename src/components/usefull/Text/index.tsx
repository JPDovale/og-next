import { styled } from '@styles/index'
import React, { ComponentProps, ElementType, ReactNode } from 'react'

const TextContainer = styled('p', {
  lineHeight: '$base',
  margin: 0,

  variants: {
    size: {
      xxs: { fontSize: '$xxs' },
      xs: { fontSize: '$xs' },
      sm: { fontSize: '$sm' },
      md: { fontSize: '$md' },
      lg: { fontSize: '$lg' },
      xl: { fontSize: '$xl' },
      '2xl': { fontSize: '$2xl' },
      '3xl': { fontSize: '$3xl' },
      '4xl': { fontSize: '$4xl' },
      '5xl': { fontSize: '$5xl' },
      '6xl': { fontSize: '$6xl' },
      '7xl': { fontSize: '$7xl' },
      '8xl': { fontSize: '$8xl' },
    },
    family: {
      body: { fontFamily: '$bodyText' },
      text: { fontFamily: '$text' },
      headingText: { fontFamily: '$heading' },
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
    family: 'text',
    spacing: 'default',
    height: 'base',
    weight: 'regular',
    colorInvert: false,
  },
})

export interface ITextProps extends ComponentProps<typeof TextContainer> {
  as?: ElementType
  size?:
    | 'xxs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
  family?: 'body' | 'text' | 'headingText'
  spacing?: 'default' | 'minimus' | 'minus' | 'medium' | 'maximum'
  height?: 'shorter' | 'short' | 'base' | 'tall'
  weight?: 'regular' | 'medium' | 'bold'
  children?: ReactNode
  colorInvert?: boolean
}

export function Text(props: ITextProps) {
  return <TextContainer {...props} />
}

Text.displayName = 'Text'
