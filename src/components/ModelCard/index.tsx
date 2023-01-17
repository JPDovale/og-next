import { IBoxProps } from '@og-ui/react'
import { ModelCardContainer } from './styles'

type IModelCardProps = IBoxProps & {}

export function ModelCard({ ...rest }: IModelCardProps) {
  return <ModelCardContainer {...rest} />
}
