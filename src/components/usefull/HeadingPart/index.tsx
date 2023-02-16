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
  customFunctionToAdd?: () => void
}

export function HeadingPart({
  icon,
  label,
  redirectPath,
  isToAdd = false,
  redirectPathToAdd,
  customFunctionToAdd,
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
          type="button"
          onClick={() => {
            customFunctionToAdd
              ? customFunctionToAdd()
              : router.push(redirectPathToAdd!)
          }}
        />
      )}
    </HeadingPartContainer>
  )
}
