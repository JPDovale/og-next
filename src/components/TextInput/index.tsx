import { Eye, EyeClosed } from 'phosphor-react'
import React, { ReactNode, ComponentProps, useState } from 'react'
import { UseFormRegister } from 'react-hook-form/dist/types'
import { Input, TextInputContainer, TextInputPrefix } from './style'

export interface ITextInputProps extends ComponentProps<typeof Input> {
  icon?: ReactNode
  prefix?: string
  variant?: 'default' | 'accepted' | 'denied' | 'attention'
  register: UseFormRegister<any>
  label: string
  isShown?: boolean
}

export function TextInput({
  icon,
  prefix,
  variant,
  register,
  label,
  isShown = false,
  ...rest
}: ITextInputProps) {
  const [show, setShow] = useState(false)

  return (
    <TextInputContainer variant={variant}>
      {!!icon && icon}
      {!!prefix && <TextInputPrefix>{prefix}</TextInputPrefix>}
      <Input
        {...register(label)}
        type={isShown ? (show ? 'text' : 'password') : rest.type}
        {...rest}
      />
      {isShown && (
        <>
          {show ? (
            <Eye weight="bold" onClick={() => setShow(!show)} />
          ) : (
            <EyeClosed weight="bold" onClick={() => setShow(!show)} />
          )}
        </>
      )}
    </TextInputContainer>
  )
}
