import * as Popover from '@radix-ui/react-popover'

import { AvatarWeb } from '@components/usefull/Avatar'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { UserContext } from '@contexts/user'
import { useRouter } from 'next/router'
import {
  Fingerprint,
  Gear,
  UserMinus,
  UsersThree,
  WarningOctagon,
  X,
} from 'phosphor-react'
import { useContext } from 'react'

import {
  Options,
  PopoverArrow,
  PopoverClose,
  UserInfos,
  UserOptionsPopoverContainer,
} from './style'

export function UserOptionsPopover() {
  const { user, logout } = useContext(UserContext)

  const router = useRouter()

  return (
    <Popover.Portal>
      <UserOptionsPopoverContainer>
        <PopoverArrow />

        <PopoverClose>
          <X size={20} />
        </PopoverClose>

        <UserInfos>
          <AvatarWeb size="sm" src={user?.avatar?.url as string} />
          <div>
            <Text as={'h3'} size={'lg'}>
              {user?.username}
            </Text>
            <Text as={'span'} family={'body'} size={'sm'}>
              {user?.email}
            </Text>
          </div>
        </UserInfos>

        <Options>
          <ButtonRoot
            variant="noShadow"
            size="xs"
            type="button"
            onClick={() => {
              router.push('/user/settings')
            }}
          >
            <ButtonIcon>
              <Gear weight="bold" />
            </ButtonIcon>
            <ButtonLabel>Configurações de usuário</ButtonLabel>
          </ButtonRoot>

          <ButtonRoot
            variant="noShadow"
            size="xs"
            type="button"
            onClick={() => {
              router.push('/shared')
            }}
          >
            <ButtonIcon>
              <UsersThree weight="bold" />
            </ButtonIcon>

            <ButtonLabel>Projetos compartilhados</ButtonLabel>
          </ButtonRoot>

          <ButtonRoot
            variant="noShadow"
            size="xs"
            type="button"
            onClick={logout}
          >
            <ButtonIcon>
              <UserMinus weight="bold" />
            </ButtonIcon>
            <ButtonLabel>Logout</ButtonLabel>
          </ButtonRoot>

          <ButtonRoot
            variant="noShadow"
            size="xs"
            type="button"
            disabled
            css={{ marginTop: '$8' }}
          >
            <ButtonIcon>
              <WarningOctagon weight="bold" />
            </ButtonIcon>
            <ButtonLabel>Ajuda</ButtonLabel>
          </ButtonRoot>

          <ButtonRoot variant="noShadow" size="xs" type="button" disabled>
            <ButtonIcon>
              <Fingerprint weight="bold" />
            </ButtonIcon>
            <ButtonLabel>Política de privacidade</ButtonLabel>
          </ButtonRoot>
        </Options>
      </UserOptionsPopoverContainer>
    </Popover.Portal>
  )
}
