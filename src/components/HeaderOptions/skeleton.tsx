import { Skeleton } from '@components/usefull/Skeleton'
import { styled } from '@styles/index'

const HeaderOptionsSkeletonContainer = styled('header', {
  position: 'fixed',
  display: 'flex',
  zIndex: 2,
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: '0 $4',
  height: '60px',
  width: '95%',

  boxShadow: '0 4px 8px #00000050',
  background: '$gray700',

  '@media screen and (max-width: 768px)': {
    borderRadius: '0',
    padding: '$4',
  },
})

const Space = styled('div', {
  minHeight: '60px',
})

const TitleSkeleton = styled(Skeleton, {
  height: '28px',
})

const Options = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$4',
  alignItems: 'center',
  height: '100%',
  width: '100%',
})

const AvatarSkeleton = styled(Skeleton, {})

const IconSkeleton = styled(Skeleton, {})

export function HeaderOptionsSkeleton() {
  return (
    <>
      <HeaderOptionsSkeletonContainer>
        <TitleSkeleton width={250} />
        <Options>
          <IconSkeleton height={30} width={30} />
          <IconSkeleton height={30} width={30} />
          <IconSkeleton height={30} width={30} />
          <IconSkeleton height={30} width={30} />
          <IconSkeleton height={30} width={30} />
          <AvatarSkeleton circle height={40} width={40} />
        </Options>
      </HeaderOptionsSkeletonContainer>
      <Space />
    </>
  )
}
