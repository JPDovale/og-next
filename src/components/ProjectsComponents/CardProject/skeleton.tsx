import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Skeleton } from '@components/usefull/Skeleton'
import { styled } from '@styles/index'

const CardProjectSkeletonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  padding: 0,

  overflow: 'hidden',
  boxShadow: '$default',
  borderRadius: '$md',
  background: '$gray600',
})

const ImageContainer = styled(Skeleton, {
  height: '200px',
  width: '300px',
})

const InfosContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',
  width: '100%',
  height: '100%',

  textAlign: 'start',

  background: '$gray600',
})

export function CardProjectSkeleton() {
  return (
    <CardProjectSkeletonContainer>
      <ImageContainer />
      <InfosContainer>
        <InfoDefault title="Nome do projeto" size="lg" disableBold>
          <Skeleton />
        </InfoDefault>

        <ContainerGrid padding={0} columns={3}>
          <InfoDefault title="Tipo do projeto" size="sm" disableBold>
            <Skeleton />
          </InfoDefault>

          <InfoDefault title="Criador" size="sm" disableBold>
            <Skeleton />
          </InfoDefault>

          <InfoDefault title="Usuários com acesso" size="sm" disableBold>
            <Skeleton />
          </InfoDefault>

          <InfoDefault title="Livros?" size="sm" disableBold>
            <Skeleton />
          </InfoDefault>

          <InfoDefault title="Personagens?" size="sm" disableBold>
            <Skeleton />
          </InfoDefault>

          <InfoDefault title="Time-lines?" size="sm" disableBold>
            <Skeleton />
          </InfoDefault>
        </ContainerGrid>

        <InfoDefault title="Criado em" size="sm" disableBold>
          <Skeleton />
        </InfoDefault>

        <InfoDefault title="Usuários com acesso" size="sm" disableBold>
          <Skeleton width={40} height={40} circle />
        </InfoDefault>
      </InfosContainer>
    </CardProjectSkeletonContainer>
  )
}
