import * as Popover from '@radix-ui/react-popover'

import { AvatarWeb } from '@components/usefull/Avatar'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { useRouter } from 'next/router'
import {
  Article,
  Atom,
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
import { logouRequest } from '@api/userRequest'

export function UserOptionsPopover() {
  const { theme, setError } = useContext(InterfaceContext)

  const { projectsSharedWithUser } = useProjects()
  const { user, refetchUser } = useUser()

  const router = useRouter()

  async function handleLogout() {
    const response = await logouRequest()

    if (response.error) {
      setError(response.error)
    }

    if (response.ok) {
      await refetchUser()
      router.push('/')
    }
  }

  return (
    <Popover.Portal>
      <UserOptionsPopoverContainer darkMode={theme === 'dark'}>
        <PopoverArrow />

        <PopoverClose>
          <X size={20} />
        </PopoverClose>

        <UserInfos>
          <AvatarWeb
            size="sm"
            src={user?.infos.avatar.url}
            alt={user?.infos.avatar.alt}
          />
          <div>
            <Text
              as={'h3'}
              size={'lg'}
              css={{ color: theme === 'dark' ? '$white' : '' }}
            >
              {user?.infos.username}
            </Text>
            <Text
              family={'body'}
              size={'sm'}
              css={{ color: theme === 'dark' ? '' : '$black' }}
            >
              {user?.infos.email}
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
              <Article weight="bold" />
            </ButtonIcon>

            <ButtonLabel>Blog</ButtonLabel>
          </ButtonRoot>

          <ButtonRoot
            variant="noShadow"
            size="xs"
            type="button"
            onClick={() => {
              router.push('/docs')
            }}
          >
            <ButtonIcon>
              <Files weight="bold" />
            </ButtonIcon>

            <ButtonLabel>Documentação</ButtonLabel>
          </ButtonRoot>

          <ButtonRoot
            variant="noShadow"
            size="xs"
            type="button"
            onClick={() => {
              router.push('https://forgecontentai.magiscrita.com/')
            }}
          >
            <ButtonIcon>
              <Atom weight="bold" />
            </ButtonIcon>

            <ButtonLabel>Forge Content AI</ButtonLabel>
          </ButtonRoot>

          <ButtonRoot
            variant="noShadow"
            size="xs"
            type="button"
            onClick={handleLogout}
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
