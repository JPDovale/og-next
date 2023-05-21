import * as Popover from '@radix-ui/react-popover'

import { AvatarWeb } from '@components/usefull/Avatar'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { UserContext } from '@contexts/user'
import { useRouter } from 'next/router'
import {
  Files,
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
import { useProjects } from '@hooks/useProjects'
import { useUser } from '@hooks/useUser'
import { InterfaceContext } from '@contexts/interface'

export function UserOptionsPopover() {
  const { logout } = useContext(UserContext)
  const { theme } = useContext(InterfaceContext)

  const { projectsSharedWithUser } = useProjects()
  const { user } = useUser()

  const router = useRouter()

  return (
    <Popover.Portal>
      <UserOptionsPopoverContainer darkMode={theme === 'dark'}>
        <PopoverArrow />

        <PopoverClose>
          <X size={20} />
        </PopoverClose>

        <UserInfos>
          <AvatarWeb size="sm" src={user?.avatar_url as string} />
          <div>
            <Text
              as={'h3'}
              size={'lg'}
              css={{ color: theme === 'dark' ? '$white' : '' }}
            >
              {user?.username}
            </Text>
            <Text
              family={'body'}
              size={'sm'}
              css={{ color: theme === 'dark' ? '' : '$black' }}
            >
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

          {projectsSharedWithUser.length !== 0 && (
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
          )}

          <ButtonRoot
            variant="noShadow"
            size="xs"
            type="button"
            onClick={() => {
              router.push('/blog/posts')
            }}
          >
            <ButtonIcon>
              <Files weight="bold" />
            </ButtonIcon>

            <ButtonLabel>Blog</ButtonLabel>
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
