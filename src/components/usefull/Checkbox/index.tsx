import React, { ComponentProps } from 'react'
import { Check } from 'phosphor-react'
import { CheckboxContainer, CheckboxIndicator } from './styles'

export interface ICheckboxProps
  extends ComponentProps<typeof CheckboxContainer> {}

export function Checkbox(props: ICheckboxProps) {
  return (
    <CheckboxContainer {...props}>
      <CheckboxIndicator asChild>
        <Check weight="bold" />
      </CheckboxIndicator>
    </CheckboxContainer>
  )
}

Checkbox.displayName = 'Checkbox'
