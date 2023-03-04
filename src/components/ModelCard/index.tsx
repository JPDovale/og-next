import { IBoxProps } from '@components/usefull/Box'
import { ModelCardContainer } from './styles'

type IModelCardProps = IBoxProps & {}

export function ModelCard({ ...rest }: IModelCardProps) {
  return <ModelCardContainer {...rest} />
}
