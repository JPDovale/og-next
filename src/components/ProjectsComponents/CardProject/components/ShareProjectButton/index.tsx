import { ComponentProps, ElementType, forwardRef } from 'react'
import { IButtonRootProps } from '@components/usefull/Button'
import { ShareButton } from './styles'

interface IShareProjectButton
  extends ComponentProps<typeof ShareButton>,
    IButtonRootProps {
  as?: ElementType
}

export const ShareProjectButton = forwardRef<
  HTMLButtonElement,
  IShareProjectButton
>((props, ref) => {
  return <ShareButton {...props} ref={ref} />
})

ShareProjectButton.displayName = 'ShareProjectButton'
