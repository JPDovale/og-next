import { Skeleton } from '@components/usefull/Skeleton'
import { styled } from '@styles/index'
import { lightMode } from '@styles/theme/light'

const ModelCardSkeletonContainer = styled(Skeleton, {
  boxShadow: '$default',
})

export function ModelCardSkeleton() {
  return (
    <ModelCardSkeletonContainer
      height={100}
      baseColor={`${lightMode.colors.purple600}`}
      highlightColor={`${lightMode.colors.purple500}`}
    />
  )
}
