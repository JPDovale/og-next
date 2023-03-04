import { ComponentProps, ElementType } from 'react'
import { IButtonRootProps } from '@components/usefull/Button'
import { ShareButton } from './styles'

interface IShareProjectButton
  extends ComponentProps<typeof ShareButton>,
    IButtonRootProps {
  as?: ElementType
}

export function ShareProjectButton(props: IShareProjectButton) {
  return <ShareButton {...props} />
}
