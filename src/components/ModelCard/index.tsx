import { IButtonRootProps } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { InterfaceContext } from '@contexts/interface'
import {
  ComponentProps,
  ElementType,
  forwardRef,
  ReactNode,
  useContext,
} from 'react'
import { ModelCardContainer } from './styles'

interface IModelCardProps
  extends ComponentProps<typeof ModelCardContainer>,
    IButtonRootProps {
  title: string
  icon: ReactNode
  as?: ElementType
}

export const ModelCard = forwardRef<HTMLButtonElement, IModelCardProps>(
  ({ icon, title, ...props }, ref) => {
    const { theme } = useContext(InterfaceContext)

    return (
      <ModelCardContainer type="button" {...props} ref={ref}>
        <Text size="xxs" colorInvert={theme === 'light'}>
          {title}
        </Text>

        <div className="icon">{icon}</div>
      </ModelCardContainer>
    )
  },
)
ModelCard.displayName = 'ModelCard'
