import React, {
  ComponentProps,
  ElementType,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from 'react'

import {
  ButtonContainer,
  ButtonIconContainer,
  ButtonLabelContainer,
} from './styles'

export interface IButtonRootProps
  extends ComponentProps<typeof ButtonContainer>,
    HTMLAttributes<HTMLButtonElement> {
  as?: ElementType
  variant?: 'default' | 'active' | 'noShadow'
  wid?: 'full' | 'middle' | 'hug'
  align?: 'left' | 'center' | 'right'
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children?: ReactNode
}

export const ButtonRoot = forwardRef<HTMLButtonElement, IButtonRootProps>(
  (props, ref) => {
    return <ButtonContainer {...props} ref={ref} />
  },
)

ButtonRoot.displayName = 'Button.Root'

export interface IButtonIconProps
  extends ComponentProps<typeof ButtonIconContainer> {
  children?: ReactNode
}

export function ButtonIcon(props: IButtonIconProps) {
  return <ButtonIconContainer {...props} />
}

ButtonIcon.displayName = 'Button.Icon'

export interface IButtonLabelProps
  extends ComponentProps<typeof ButtonLabelContainer> {
  children?: ReactNode
}

export function ButtonLabel(props: IButtonLabelProps) {
  return <ButtonLabelContainer {...props} />
}

ButtonLabel.displayName = 'Button.Label'
