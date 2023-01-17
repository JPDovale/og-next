import React, { ReactNode, ComponentProps } from 'react'
import { UseFormRegister } from 'react-hook-form/dist/types'
import { Input, TextInputContainer, TextInputPrefix } from './style'

export interface ITextInputProps extends ComponentProps<typeof Input> {
  icon?: ReactNode
  prefix?: string
  variant?: 'default' | 'accepted' | 'denied' | 'attention'
  register: UseFormRegister<any>
  label: string
}

export function TextInput({
  icon,
  prefix,
  variant,
  register,
  label,
  ...rest
}: ITextInputProps) {
  return (
    <TextInputContainer variant={variant}>
      {!!icon && icon}
      {!!prefix && <TextInputPrefix>{prefix}</TextInputPrefix>}
      <Input {...register(label)} {...rest} />
    </TextInputContainer>
  )
}
