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
  redirectFunction?: () => void
}

export function CapituleCard({
  capitule,
  redirectFunction,
}: ICapituleCardProps) {
  return (
    <CapituleCardContainer
      type="button"
      onClick={redirectFunction && redirectFunction}
    >
      <CapituleName as="div">
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

          <Text size="xxs" css={{ marginBottom: '-$4' }}>
            Estrutura de 3 atos:
          </Text>

          <InfoDefault title="Ato 1">
            <CapituleObjective family="body">
              {capitule.structure?.act1 || 'Não definido'}
            </CapituleObjective>
          </InfoDefault>

          <InfoDefault title="Ato 2">
            <CapituleObjective family="body">
              {capitule.structure?.act2 || 'Não definido'}
            </CapituleObjective>
          </InfoDefault>

          <InfoDefault title="Ato 3">
            <CapituleObjective family="body">
              {capitule.structure?.act3 || 'Não definido'}
            </CapituleObjective>
          </InfoDefault>
        </ContainerGrid>
      </CapituleInfos>
    </CapituleCardContainer>
  )
}
