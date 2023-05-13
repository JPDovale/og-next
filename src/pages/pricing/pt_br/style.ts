import { styled } from '@styles/index'

export const PricingPTBRPageContainer = styled('main', {
  position: 'relative',
  background: '$gray900',
})

export const PricingPageBodyContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',
})

export const DiscountCard = styled('div', {
  display: 'flex',
  justifyContent: 'center',

  padding: '$2',

  background: '$purple800',
  borderRadius: '$sm',
})

export const PricingTable = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '$6',
})
