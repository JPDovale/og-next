import { InterfaceContext } from '@contexts/interface'
import { useContext } from 'react'
import { ButtonLabel, ButtonRoot } from '../Button'
import { TimeChristSelectContainer } from './styles'

interface ITimeChristSelect {
  value: 'A.C.' | 'D.C.'
  setValue: (newState: 'A.C.' | 'D.C.') => void
  activeThemeVerification?: boolean
}

export function TimeChristSelect({
  setValue,
  value,
  activeThemeVerification = false,
}: ITimeChristSelect) {
  const { theme } = useContext(InterfaceContext)

  return (
    <TimeChristSelectContainer>
      <ButtonRoot
        type="button"
        css={{
          background: activeThemeVerification
            ? theme === 'light'
              ? '$base600'
              : '$gray800'
            : '$gray500',
          color: activeThemeVerification
            ? theme === 'light'
              ? '$text800'
              : '$white'
            : 'unset',
        }}
        onClick={() => setValue('A.C.')}
        variant={value === 'A.C.' ? 'active' : 'noShadow'}
        wid="hug"
      >
        <ButtonLabel>A.C.</ButtonLabel>
      </ButtonRoot>
      <ButtonRoot
        type="button"
        css={{
          background: activeThemeVerification
            ? theme === 'light'
              ? '$base600'
              : '$gray800'
            : '$gray500',
          color: activeThemeVerification
            ? theme === 'light'
              ? '$text800'
              : '$white'
            : 'unset',
        }}
        onClick={() => setValue('D.C.')}
        variant={value === 'D.C.' ? 'active' : 'noShadow'}
        wid="hug"
      >
        <ButtonLabel>D.C.</ButtonLabel>
      </ButtonRoot>
    </TimeChristSelectContainer>
  )
}
