import { ButtonsContainer, NavigationBarContainer } from './styles'

import LogoToLeft from '../../assets/logos/logo.svg'
import { Button, Text } from '@og-ui/react'
import {
  BellSimple,
  DotsNine,
  FilePlus,
  // Clock,
  ListChecks,
  ProjectorScreenChart,
  UserCircle,
  // Star,
  UsersThree,
  XCircle,
} from 'phosphor-react'
import { useContext } from 'react'
import { InterfaceContext } from '../../contexts/interface'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useWindowSize } from '../../hooks/useWindow'
import { UserContext } from '../../contexts/user'

export function NavigationBar() {
  const { user, visualizeNotifications } = useContext(UserContext)
  const newNotifications = user?.notifications?.filter(
    (notification) => notification.isVisualized === false,
  )

  const {
    navIsOpen,
    setNavIsOpen,
    setUserOptionsIsOpen,
    setNotificationsIsOpen,
    setPreferenciesIsOpen,
    setNewProjectIsOpen,
  } = useContext(InterfaceContext)

  const router = useRouter()
  const location = router.pathname.split('/')[1]

  const windowSize = useWindowSize()

  const smallWindow = windowSize.width! < 786

  return (
    <NavigationBarContainer navIsOpen={navIsOpen}>
      <Image
        src={LogoToLeft}
        alt=""
        onClick={() => {
          router.push('/projects')
          setNavIsOpen(false)
        }}
      />
      <button
        className="close"
        type="button"
        onClick={() => setNavIsOpen(false)}
      >
        <XCircle size={32} />
      </button>
      <ButtonsContainer>
        {smallWindow && (
          <>
            <Text
              size="xs"
              css={{
                marginBottom: '-$4',
              }}
            >
              Ferramentas
            </Text>

            <Button
              type="button"
              label="Novo Projeto"
              icon={<FilePlus />}
              onClick={() => {
                setNewProjectIsOpen(true)
                setNavIsOpen(false)
              }}
            />

            <Button
              type="button"
              label={`Notificações${
                newNotifications && newNotifications[0]
                  ? ' ( ' + newNotifications.length + ' ) '
                  : ''
              }`}
              icon={<BellSimple />}
              onClick={() => {
                setNotificationsIsOpen(true)
                setNavIsOpen(false)

                setTimeout(() => {
                  newNotifications &&
                    newNotifications[0] &&
                    visualizeNotifications()
                }, 10000)
              }}
            />

            <Button
              type="button"
              label="Preferências"
              icon={<DotsNine />}
              onClick={() => {
                setPreferenciesIsOpen(true)
                setNavIsOpen(false)
              }}
            />

            <Text
              size="xs"
              css={{
                marginTop: '$4',
                marginBottom: '-$4',
              }}
            >
              Projetos
            </Text>
          </>
        )}

        <Button
          type="button"
          label="Projetos"
          variant={location === 'projects' ? 'active' : 'default'}
          icon={<ProjectorScreenChart />}
          onClick={() => {
            router.push('/projects')
            smallWindow && setNavIsOpen(false)
          }}
        />
        {/* <Button
        type='button'
          label="Recentes"
          variant={location === 'recent' ? 'active' : 'default'}
          icon={<Clock />}
          onClick={() => {
            router.push('/recent')
            smallWindow && setNavIsOpen(false)
          }}
        /> */}
        <Button
          type="button"
          label="Compartilhados comigo"
          variant={location === 'shared' ? 'active' : 'default'}
          icon={<UsersThree />}
          onClick={() => {
            router.push('/shared')
            smallWindow && setNavIsOpen(false)
          }}
        />
        <Button
          type="button"
          label="To-Do"
          variant={location === 'todo' ? 'active' : 'default'}
          disabled
          icon={<ListChecks />}
          onClick={() => {
            router.push('/todo')
            smallWindow && setNavIsOpen(false)
          }}
        />
        {/* <Button
        type='button'
          label="Pro"
          disabled
          variant={location === '*****' ? 'active' : 'default'}
          icon={<Star color="#f97700" />}
        /> */}
        {smallWindow && (
          <>
            <Text
              size="xs"
              css={{
                marginTop: '$4',
                marginBottom: '-$4',
              }}
            >
              Informações do usuário
            </Text>
            <Button
              type="button"
              label="Usuário"
              icon={<UserCircle />}
              onClick={() => {
                setUserOptionsIsOpen(true)
                setNavIsOpen(false)
              }}
            />
          </>
        )}
      </ButtonsContainer>
    </NavigationBarContainer>
  )
}
