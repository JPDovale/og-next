import { styled } from '@styles/index'

export const PricingCardContainer = styled('div', {
  padding: '$4',

  background: '$gray800',
  borderRadius: '$md',
  border: '1px solid $purple500',
  boxShadow: '3px 3px 3px #000000aa',
})

export const PricingHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  height: '180px',
})

export const PricingInfoAmount = styled('div', {})

export const PricingInfosFeatures = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

export const PricingFeature = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  svg: {
    minWidth: 20,
    lineHeight: 0,
  },

  variants: {
    limited: {
      true: {
        svg: {
          color: '$alertDefault',
        },
      },
      false: {
        svg: {
          color: '$purple400',
        },
      },
    },
  },

  defaultVariants: {
    limited: false,
  },
})
