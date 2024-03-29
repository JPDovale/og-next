import * as Popover from '@radix-ui/react-popover'
import { useContext } from 'react'
import {
  ArrowFatLinesDown,
  ArrowFatLinesUp,
  ArrowLineDown,
  ArrowLineUp,
  Moon,
  SortAscending,
  SortDescending,
  Sun,
  X,
} from 'phosphor-react'
import {
  HeaderPreferencies,
  Options,
  PopoverArrow,
  PopoverClose,
  PreferenciesPopoverContainer,
} from './styles'
import { InterfaceContext } from '@contexts/interface'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { useWindowSize } from '@hooks/useWindow'

export function PreferenciesPopover() {
  const { orderBy, setOrderBy, theme, setThemeFunction } =
    useContext(InterfaceContext)

  const { smallWindow } = useWindowSize()

  return (
    <Popover.Portal>
      <PreferenciesPopoverContainer darkMode={theme === 'dark'}>
        <PopoverArrow />

        <PopoverClose>
          <X size={20} />
        </PopoverClose>

        <HeaderPreferencies>
          <Text
            as={'h3'}
            size={'lg'}
            css={{ color: theme === 'dark' ? '$base100' : '' }}
          >
            Preferencias
          </Text>
        </HeaderPreferencies>

        <Options>
          {/* <ContainerGrid padding={0} columns={smallWindow ? 1 : 2}>
            <ButtonRoot
              size="xs"
              type="button"
              variant={isList ? 'noShadow' : 'active'}
              onClick={() => {
                setIsList && setIsList(false)
              }}
            >
              <ButtonIcon>
                <GridFour weight="bold" />
              </ButtonIcon>
              <ButtonLabel>Grid</ButtonLabel>
            </ButtonRoot>

            <ButtonRoot
              size="xs"
              type="button"
              variant={!isList ? 'noShadow' : 'active'}
              onClick={() => {
                setIsList && setIsList(true)
              }}
            >
              <ButtonIcon>
                <List weight="bold" />
              </ButtonIcon>
              <ButtonLabel>List</ButtonLabel>
            </ButtonRoot>
          </ContainerGrid> */}

          <Text size="sm" css={{ color: theme === 'dark' ? '$base100' : '' }}>
            Ordenar por:
          </Text>

          <ContainerGrid padding={0} columns={smallWindow ? 1 : 2}>
            <ButtonRoot
              size="xs"
              type="button"
              variant={orderBy === 'a-z' ? 'active' : 'noShadow'}
              onClick={() => setOrderBy('a-z')}
            >
              <ButtonIcon>
                <SortDescending weight="bold" />
              </ButtonIcon>
              <ButtonLabel>A para Z</ButtonLabel>
            </ButtonRoot>

            <ButtonRoot
              size="xs"
              type="button"
              variant={orderBy === 'z-a' ? 'active' : 'noShadow'}
              onClick={() => setOrderBy('z-a')}
            >
              <ButtonIcon>
                <SortAscending weight="bold" />
              </ButtonIcon>
              <ButtonLabel>Z para A</ButtonLabel>
            </ButtonRoot>

            <ButtonRoot
              size="xs"
              type="button"
              variant={orderBy === 'time-asc' ? 'active' : 'noShadow'}
              onClick={() => setOrderBy('time-asc')}
            >
              <ButtonIcon>
                <ArrowFatLinesUp weight="bold" />
              </ButtonIcon>
              <ButtonLabel>Mais novos primeiro</ButtonLabel>
            </ButtonRoot>

            <ButtonRoot
              size="xs"
              type="button"
              variant={orderBy === 'time-desc' ? 'active' : 'noShadow'}
              onClick={() => setOrderBy('time-desc')}
            >
              <ButtonIcon>
                <ArrowFatLinesDown weight="bold" />
              </ButtonIcon>
              <ButtonLabel>Mais velhos primeiro</ButtonLabel>
            </ButtonRoot>

            <ButtonRoot
              size="xs"
              type="button"
              variant={orderBy === 'update-asc' ? 'active' : 'noShadow'}
              onClick={() => setOrderBy('update-asc')}
            >
              <ButtonIcon>
                <ArrowLineUp weight="bold" />
              </ButtonIcon>
              <ButtonLabel>Atualização mais recente primeiro</ButtonLabel>
            </ButtonRoot>

            <ButtonRoot
              size="xs"
              type="button"
              variant={orderBy === 'update-desc' ? 'active' : 'noShadow'}
              onClick={() => setOrderBy('update-desc')}
            >
              <ButtonIcon>
                <ArrowLineDown weight="bold" />
              </ButtonIcon>
              <ButtonLabel>Atualização mais antiga primeiro</ButtonLabel>
            </ButtonRoot>
          </ContainerGrid>

          <Text size="sm" css={{ color: theme === 'dark' ? '$base100' : '' }}>
            Tema:
          </Text>

          <ContainerGrid padding={0} columns={smallWindow ? 1 : 2}>
            <ButtonRoot
              size="xs"
              type="button"
              variant={theme === 'dark' ? 'active' : 'noShadow'}
              onClick={() => {
                if (theme === 'dark') return
                setThemeFunction()
              }}
            >
              <ButtonIcon>
                <Moon weight="bold" />
              </ButtonIcon>
              <ButtonLabel>Dark mode</ButtonLabel>
            </ButtonRoot>

            <ButtonRoot
              size="xs"
              type="button"
              variant={theme === 'light' ? 'active' : 'noShadow'}
              onClick={() => {
                if (theme === 'light') return
                setThemeFunction()
              }}
            >
              <ButtonIcon>
                <Sun weight="bold" />
              </ButtonIcon>
              <ButtonLabel>Light mode</ButtonLabel>
            </ButtonRoot>
          </ContainerGrid>
        </Options>
      </PreferenciesPopoverContainer>
    </Popover.Portal>
  )
}
