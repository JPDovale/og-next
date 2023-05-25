import SkeletonLIB, {
  SkeletonProps,
  SkeletonThemeProps,
  SkeletonTheme as SkeletonThemeLib,
} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function Skeleton(props: SkeletonProps) {
  return <SkeletonLIB {...props} />
}

export function SkeletonTheme(props: SkeletonThemeProps) {
  return <SkeletonThemeLib {...props} />
}
