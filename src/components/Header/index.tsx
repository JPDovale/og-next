import { useContext } from 'react'
import Image from 'next/image'

import { ButtonsContent, HeaderContainer, ImageContent } from './styles'

import aloneLogoImg from '../../assets/logos/aloneLogo.svg'
import logoImg from '../../assets/logos/logo.svg'

import { Button } from '@og-ui/react'
import { ProjectorScreen, SignIn, UserCirclePlus } from 'phosphor-react'
import { AvatarWeb } from '@components/usefull/Avatar'
import { useRouter } from 'next/router'
import { useWindowSize } from '@hooks/useWindow'
import { UserContext } from '@contexts/user'

export function Header() {
  const { userLogged, user } = useContext(UserContext)

  const router = useRouter()

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  return (
    <HeaderContainer>
      <ImageContent>
        {smallWindow ? (
          <Image src={aloneLogoImg} alt="Ognare" priority />
        ) : (
          <Image src={logoImg} alt="Ognare" priority />
        )}
      </ImageContent>

      <ButtonsContent>
        {userLogged ? (
          <>
            <Button
              label="Dashboard"
              icon={<ProjectorScreen />}
              wid="hug"
              onClick={() => router.push('/projects')}
            />
            <AvatarWeb src={user?.avatar?.url} size="xsm" />
          </>
        ) : (
          <>
            <Button
              label="Registrar"
              icon={<UserCirclePlus />}
              wid="hug"
              onClick={() => router.push('/register')}
            />
            <Button
              label="Login"
              icon={<SignIn />}
              wid="hug"
              onClick={() => router.push('/login')}
            />
          </>
        )}
      </ButtonsContent>
    </HeaderContainer>
  )
}
