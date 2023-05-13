import { ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { Check } from 'phosphor-react'
import {
  PricingFeature,
  PricingHeader,
  PricingInfoAmount,
  PricingInfosFeatures,
  PricingCardContainer,
} from './styes'

interface IPricingCardProps {
  priceId: string
  title: string
  description: string
  amount: string
  revalidateInTime: string
  onSelectPlan: (priceId: string) => void
  features: {
    text: string
    limited?: boolean
  }[]
  buttonIsDisabled: boolean | null | undefined
}

export function PricingCard({
  amount,
  description,
  features,
  onSelectPlan,
  priceId,
  revalidateInTime,
  title,
  buttonIsDisabled,
}: IPricingCardProps) {
  return (
    <PricingCardContainer>
      <PricingHeader>
        <Text family="body" weight="bold" size="3xl" height="shorter">
          MagiScrita {title}
        </Text>
        <Text family="body" height="shorter">
          {description}
        </Text>
      </PricingHeader>

      <PricingInfoAmount>
        <Text family="body" weight="bold" size="4xl" height="shorter">
          {amount}
        </Text>
        <Text size="sm" height="shorter">
          {revalidateInTime}
        </Text>

        <ButtonRoot
          size="sm"
          align="center"
          css={{ marginTop: '$10' }}
          variant="noShadow"
          onClick={() => onSelectPlan(priceId)}
          disabled={buttonIsDisabled || false}
        >
          <ButtonLabel>Comece agora</ButtonLabel>
        </ButtonRoot>
      </PricingInfoAmount>
      <div>
        <Text family="body" css={{ marginTop: '$8' }}>
          Disponível no plano:
        </Text>
        <PricingInfosFeatures>
          {features.map((feature) => (
            <PricingFeature key={feature.text} limited={feature.limited}>
              <Check weight="bold" size={20} />
              <Text size="sm">{feature.text}</Text>
            </PricingFeature>
          ))}
        </PricingInfosFeatures>
      </div>
    </PricingCardContainer>
  )
}
