import { useRouter } from 'next/router'
import { PencilCircle, PlusCircle } from 'phosphor-react'
import { ReactNode } from 'react'
import { HeadingPartContainer } from './styles'

interface IHeadingPartProps {
  redirectPath?: string
  icon: ReactNode
  label: string
  isToAdd?: boolean
  isToEdit?: boolean
  redirectPathToAdd?: string
  permission: 'edit' | 'view' | 'comment' | undefined
  customFunctionOnClickSideButton?: () => void
}

export function HeadingPart({
  icon,
  label,
  redirectPath,
  isToAdd = false,
  isToEdit = false,
  permission,
  redirectPathToAdd,
  customFunctionOnClickSideButton,
}: IHeadingPartProps) {
  const router = useRouter()

  return (
    <HeadingPartContainer
      onClick={() => redirectPath && router.push(redirectPath)}
    >
      {icon}
      {label}
      {isToAdd && !isToEdit && permission === 'edit' && (
        <PlusCircle
          size={40}
          type="button"
          onClick={() => {
            customFunctionOnClickSideButton
              ? customFunctionOnClickSideButton()
              : router.push(redirectPathToAdd!)
          }}
        />
      )}

      {isToEdit && !isToAdd && permission === 'edit' && (
        <PencilCircle
          size={40}
          type="button"
          onClick={() => {
            customFunctionOnClickSideButton
              ? customFunctionOnClickSideButton()
              : router.push(redirectPathToAdd!)
          }}
        />
      )}
    </HeadingPartContainer>
  )
}
