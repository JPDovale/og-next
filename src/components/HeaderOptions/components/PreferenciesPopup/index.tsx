import { useContext } from 'react'
import {
  ArrowFatLinesDown,
  ArrowFatLinesUp,
  ArrowLineDown,
  ArrowLineUp,
  GridFour,
  List,
  SortAscending,
  SortDescending,
  XCircle,
} from 'phosphor-react'
import {
  HeaderPreferencies,
  Options,
  PreferenciesPopupContainer,
} from './styles'
import { InterfaceContext } from '@contexts/interface'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'

interface IPreferenciesPopupProps {
  preferenciesIsOpen: boolean
  setPreferenciesIsOpen: (newState: boolean) => void
}

export function PreferenciesPopup({
  preferenciesIsOpen,
  setPreferenciesIsOpen,
}: IPreferenciesPopupProps) {
  const { isList, setIsList, orderBy, setOrderBy } =
    useContext(InterfaceContext)

  return (
    <PreferenciesPopupContainer onWindow={preferenciesIsOpen}>
      <HeaderPreferencies>
        <button
          className="close"
          type="button"
          onClick={() => setPreferenciesIsOpen(false)}
        >
          <XCircle size={32} />
        </button>
        <Text as={'h3'} size={'lg'} weight={'bold'} spacing={'maximum'}>
          Preferencias
        </Text>
      </HeaderPreferencies>
      <Options>
        <ButtonRoot
          type="button"
          variant={isList ? 'default' : 'active'}
          onClick={() => {
            setIsList && setIsList(false)
            setPreferenciesIsOpen(false)
          }}
        >
          <ButtonIcon>
            <GridFour weight="bold" />
          </ButtonIcon>
          <ButtonLabel>Grid</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot
          type="button"
          variant={!isList ? 'default' : 'active'}
          onClick={() => {
            setIsList && setIsList(true)
            setPreferenciesIsOpen(false)
          }}
        >
          <ButtonIcon>
            <List weight="bold" />
          </ButtonIcon>
          <ButtonLabel>List</ButtonLabel>
        </ButtonRoot>
        <Text>Ordenar por:</Text>

        <ButtonRoot
          type="button"
          variant={orderBy === 'a-z' ? 'active' : 'default'}
          onClick={() => setOrderBy('a-z')}
        >
          <ButtonIcon>
            <SortDescending weight="bold" />
          </ButtonIcon>
          <ButtonLabel>A para Z</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot
          type="button"
          variant={orderBy === 'z-a' ? 'active' : 'default'}
          onClick={() => setOrderBy('z-a')}
        >
          <ButtonIcon>
            <SortAscending weight="bold" />
          </ButtonIcon>
          <ButtonLabel>Z para A</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot
          type="button"
          variant={orderBy === 'time-asc' ? 'active' : 'default'}
          onClick={() => setOrderBy('time-asc')}
        >
          <ButtonIcon>
            <ArrowFatLinesUp weight="bold" />
          </ButtonIcon>
          <ButtonLabel>Mais novos primeiro</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot
          type="button"
          variant={orderBy === 'time-desc' ? 'active' : 'default'}
          onClick={() => setOrderBy('time-desc')}
        >
          <ButtonIcon>
            <ArrowFatLinesDown weight="bold" />
          </ButtonIcon>
          <ButtonLabel>Mais velhos primeiro</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot
          type="button"
          variant={orderBy === 'update-asc' ? 'active' : 'default'}
          onClick={() => setOrderBy('update-asc')}
        >
          <ButtonIcon>
            <ArrowLineUp weight="bold" />
          </ButtonIcon>
          <ButtonLabel>Atualização mais recente primeiro</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot
          type="button"
          variant={orderBy === 'update-desc' ? 'active' : 'default'}
          onClick={() => setOrderBy('update-desc')}
        >
          <ButtonIcon>
            <ArrowLineDown weight="bold" />
          </ButtonIcon>
          <ButtonLabel>Atualização mais antiga primeiro</ButtonLabel>
        </ButtonRoot>
      </Options>
    </PreferenciesPopupContainer>
  )
}
