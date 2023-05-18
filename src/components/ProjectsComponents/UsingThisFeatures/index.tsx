import { IFeatures } from '@api/responsesTypes/IProjectResponse'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import {
  Alien,
  Atom,
  Bank,
  BookOpen,
  Books,
  Buildings,
  Clock,
  Lightning,
  MapTrifold,
  Planet,
  Translate,
  UserFocus,
  UsersFour,
} from 'phosphor-react'

interface IUsingThisFeatures {
  features: IFeatures | undefined
}

export function UsingThisFeatures({ features }: IUsingThisFeatures) {
  return (
    <ContainerGrid padding={0} columns={13}>
      {features?.books && (
        <InfoDefault size="sm" title="Livros:">
          <Books size={28} />
        </InfoDefault>
      )}

      {features?.plot && (
        <InfoDefault size="sm" title="Plot:">
          <BookOpen size={28} />
        </InfoDefault>
      )}

      {features?.planets && (
        <InfoDefault size="sm" title="Planetas:">
          <Planet size={28} />
        </InfoDefault>
      )}

      {features?.nations && (
        <InfoDefault size="sm" title="Nações:">
          <MapTrifold size={28} />
        </InfoDefault>
      )}

      {features?.persons && (
        <InfoDefault size="sm" title="Personagens:">
          <UserFocus size={28} />
        </InfoDefault>
      )}

      {features?.citys && (
        <InfoDefault size="sm" title="Cidades:">
          <Buildings size={28} />
        </InfoDefault>
      )}

      {features?.races && (
        <InfoDefault size="sm" title="Raças:">
          <Alien size={28} />
        </InfoDefault>
      )}

      {features?.religions && (
        <InfoDefault size="sm" title="Religiões:">
          <Atom size={28} />
        </InfoDefault>
      )}

      {features?.powers && (
        <InfoDefault size="sm" title="Poderes:">
          <Lightning size={28} />
        </InfoDefault>
      )}

      {features?.familys && (
        <InfoDefault size="sm" title="Famílias:">
          <UsersFour size={28} />
        </InfoDefault>
      )}

      {features?.languages && (
        <InfoDefault size="sm" title="Linguagens:">
          <Translate size={28} />
        </InfoDefault>
      )}

      {features?.institutions && (
        <InfoDefault size="sm" title="Instituições:">
          <Bank size={28} />
        </InfoDefault>
      )}

      {features?.timeLines && (
        <InfoDefault size="sm" title="Time-lines:">
          <Clock size={28} />
        </InfoDefault>
      )}
    </ContainerGrid>
  )
}
