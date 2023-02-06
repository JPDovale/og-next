import { useRouter } from 'next/router'
import { PlusCircle } from 'phosphor-react'
import { ReactNode } from 'react'
import { HeadingPartContainer } from './styles'

interface IHeadingPartProps {
  redirectPath?: string
  icon: ReactNode
  label: string
  isToAdd?: boolean
  redirectPathToAdd?: string
  customFunctionToAd?: () => void
}

export function HeadingPart({
  icon,
  label,
  redirectPath,
  isToAdd = false,
  redirectPathToAdd,
  customFunctionToAd,
}: IHeadingPartProps) {
  const router = useRouter()

  return (
    <HeadingPartContainer
      onClick={() => redirectPath && router.push(redirectPath)}
    >
      {icon}
      {label}
      {isToAdd && (
        <PlusCircle
          size={40}
          onClick={() => {
            customFunctionToAd
              ? customFunctionToAd()
              : router.push(redirectPathToAdd!)
          }}
        />
      )}
    </HeadingPartContainer>
  )
}
