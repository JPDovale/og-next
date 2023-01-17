import { useContext } from 'react'
import { Button, Text } from '@og-ui/react'
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
import { InterfaceContext } from '../../../../contexts/interface'

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
        <Button
          type="button"
          icon={<GridFour weight="bold" />}
          label="Grid"
          variant={isList ? 'default' : 'active'}
          onClick={() => {
            setIsList && setIsList(false)
            setPreferenciesIsOpen(false)
          }}
        />
        <Button
          type="button"
          icon={<List weight="bold" />}
          label="list"
          variant={!isList ? 'default' : 'active'}
          onClick={() => {
            setIsList && setIsList(true)
            setPreferenciesIsOpen(false)
          }}
        />
        <Text>Ordenar por:</Text>
        <Button
          type="button"
          variant={orderBy === 'a-z' ? 'active' : 'default'}
          icon={<SortDescending weight="bold" />}
          label="A para Z"
          onClick={() => setOrderBy('a-z')}
        />
        <Button
          type="button"
          variant={orderBy === 'z-a' ? 'active' : 'default'}
          icon={<SortAscending weight="bold" />}
          label="Z para A"
          onClick={() => setOrderBy('z-a')}
        />
        <Button
          type="button"
          variant={orderBy === 'time-asc' ? 'active' : 'default'}
          icon={<ArrowFatLinesUp weight="bold" />}
          label="Mais novos primeiro"
          onClick={() => setOrderBy('time-asc')}
        />
        <Button
          type="button"
          variant={orderBy === 'time-desc' ? 'active' : 'default'}
          icon={<ArrowFatLinesDown weight="bold" />}
          label="Mais velhos primeiro"
          onClick={() => setOrderBy('time-desc')}
        />
        <Button
          type="button"
          variant={orderBy === 'update-asc' ? 'active' : 'default'}
          icon={<ArrowLineUp weight="bold" />}
          label="Atualização mais recente primeiro"
          onClick={() => setOrderBy('update-asc')}
        />
        <Button
          type="button"
          variant={orderBy === 'update-desc' ? 'active' : 'default'}
          icon={<ArrowLineDown weight="bold" />}
          label="Atualização mais antiga primeiro"
          onClick={() => setOrderBy('update-desc')}
        />
      </Options>
    </PreferenciesPopupContainer>
  )
}
