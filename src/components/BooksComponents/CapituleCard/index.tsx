import { Text } from '@og-ui/react'
import { ICapitule } from '../../../api/responsesTypes/IBooksResponse'
import { ContainerGrid } from '../../usefull/ContainerGrid'
import { InfoDefault } from '../../usefull/InfoDefault'
import {
  CapituleCardContainer,
  CapituleComplete,
  CapituleInfos,
  CapituleName,
  CapituleObjective,
} from './styles'

interface ICapituleCardProps {
  capitule: ICapitule
}

export function CapituleCard({ capitule }: ICapituleCardProps) {
  return (
    <CapituleCardContainer>
      <CapituleName>
        {capitule.name}
        <Text size="sm" family="body" css={{ color: '$base800' }}>
          Clique para abrir a grade de cenas
        </Text>
      </CapituleName>

      <CapituleInfos>
        <ContainerGrid columns={4}>
          <InfoDefault title="Completo">
            <CapituleComplete size="sm" complete={capitule.complete}>
              {capitule.complete ? 'Completo' : 'Incompleto'}
            </CapituleComplete>
          </InfoDefault>

          <InfoDefault title="Capítulo">{capitule.sequence}</InfoDefault>

          <InfoDefault title="Cenas">{capitule.scenes?.length}</InfoDefault>

          <InfoDefault title="Palavras">{capitule.words || 0}</InfoDefault>
        </ContainerGrid>

        <ContainerGrid>
          <InfoDefault title="Objetivo do capítulo">
            <CapituleObjective family="body">
              {capitule.objective}
            </CapituleObjective>
          </InfoDefault>
        </ContainerGrid>
      </CapituleInfos>
    </CapituleCardContainer>
  )
}
