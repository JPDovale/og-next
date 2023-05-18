import {
  IFeatures,
  IKeysOfFeatures,
} from '@api/responsesTypes/IProjectResponse'
import { Checkbox } from '@components/usefull/Checkbox'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { ComponentProps } from 'react'

interface ISelectFeatures extends ComponentProps<typeof ContainerGrid> {
  features: IFeatures
  setFeature: (feature: IKeysOfFeatures, values: boolean) => void
  columns?: 13 | 6 | 8
}

export function SelectFeatures({
  features,
  setFeature,
  columns = 13,
  ...rest
}: ISelectFeatures) {
  return (
    <ContainerGrid columns={columns} padding={0} {...rest}>
      <InfoDefault css={{ alignItems: 'center' }} title="Livros">
        <Checkbox
          onCheckedChange={(e: boolean) => setFeature('books', e)}
          checked={features?.books}
        />
      </InfoDefault>
      <InfoDefault css={{ alignItems: 'center' }} title="Plot">
        <Checkbox
          onCheckedChange={(e: boolean) => setFeature('plot', e)}
          checked={features?.plot}
        />
      </InfoDefault>
      <InfoDefault css={{ alignItems: 'center' }} title="Planetas">
        <Checkbox
          onCheckedChange={(e: boolean) => setFeature('planets', e)}
          checked={features?.planets}
        />
      </InfoDefault>
      <InfoDefault css={{ alignItems: 'center' }} title="Nações">
        <Checkbox
          onCheckedChange={(e: boolean) => setFeature('nations', e)}
          checked={features?.nations}
        />
      </InfoDefault>
      <InfoDefault css={{ alignItems: 'center' }} title="Personagens">
        <Checkbox
          onCheckedChange={(e: boolean) => setFeature('persons', e)}
          checked={features?.persons}
        />
      </InfoDefault>
      <InfoDefault css={{ alignItems: 'center' }} title="Cidades">
        <Checkbox
          onCheckedChange={(e: boolean) => setFeature('citys', e)}
          checked={features?.citys}
        />
      </InfoDefault>
      <InfoDefault css={{ alignItems: 'center' }} title="Raças">
        <Checkbox
          onCheckedChange={(e: boolean) => setFeature('races', e)}
          checked={features?.races}
        />
      </InfoDefault>
      <InfoDefault css={{ alignItems: 'center' }} title="Religiões">
        <Checkbox
          onCheckedChange={(e: boolean) => setFeature('religions', e)}
          checked={features?.religions}
        />
      </InfoDefault>
      <InfoDefault css={{ alignItems: 'center' }} title="Poderes">
        <Checkbox
          onCheckedChange={(e: boolean) => setFeature('powers', e)}
          checked={features?.powers}
        />
      </InfoDefault>
      <InfoDefault css={{ alignItems: 'center' }} title="Famílias">
        <Checkbox
          onCheckedChange={(e: boolean) => setFeature('familys', e)}
          checked={features?.familys}
        />
      </InfoDefault>
      <InfoDefault css={{ alignItems: 'center' }} title="Linguagens">
        <Checkbox
          onCheckedChange={(e: boolean) => setFeature('languages', e)}
          checked={features?.languages}
        />
      </InfoDefault>
      <InfoDefault css={{ alignItems: 'center' }} title="Instituições">
        <Checkbox
          onCheckedChange={(e: boolean) => setFeature('institutions', e)}
          checked={features?.institutions}
        />
      </InfoDefault>
      <InfoDefault css={{ alignItems: 'center' }} title="Time-lines">
        <Checkbox
          onCheckedChange={(e: boolean) => setFeature('timeLines', e)}
          checked={features?.timeLines}
        />
      </InfoDefault>
    </ContainerGrid>
  )
}
