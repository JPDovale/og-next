import { Heading } from '@components/usefull/Heading'
import { styled } from '@styles/index'

interface IOnBuildingProps {
  text?: string
}

const TextDescription = styled(Heading, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})

export function OnBuilding({ text = 'Em produção' }: IOnBuildingProps) {
  return <TextDescription size={'lg'}>{text}</TextDescription>
}
