import React from 'react'

import { MultiStepContainer, Label, Steps, Step } from './style'

export interface IMultiStepProps {
  size: number
  currentStep?: number
}

export function MultiStep(props: IMultiStepProps) {
  const { size, currentStep = 1 } = props

  return (
    <MultiStepContainer>
      <Label>
        Passo {currentStep} de {size}
      </Label>
      <Steps css={{ '--steps-size': size }}>
        {Array.from({ length: size }, (_, i) => i + 1).map((step) => {
          return <Step key={step} active={currentStep >= step} />
        })}
      </Steps>
    </MultiStepContainer>
  )
}

MultiStep.displayName = 'MultiStep'
