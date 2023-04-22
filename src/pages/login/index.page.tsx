import { zodResolver } from '@hookform/resolvers/zod'
import { Text } from '@components/usefull/Text'
import Link from 'next/link'
import { Envelope, Eye, EyeClosed, LockKey } from 'phosphor-react'
import {
  BackgroundLogin,
  InputContainer,
  InputHeader,
  Links,
  LoginFormContainer,
  LoginPageContainer,
} from './styles'

import Back from '../../assets/back.svg'
import LogoToDown from '../../assets/logos/logoToDown.svg'
import Logo from '../../assets/logos/logo.svg'

import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/user'

import { NextSeo } from 'next-seo'
import { ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { ToastError } from '@components/usefull/ToastError'
import { useUser } from '@hooks/useUser'
import { InterfaceContext } from '@contexts/interface'

const loginFormSchema = z.object({
  email: z.string().email({ message: 'O email é invalido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha precisa conter mais de 6 letras' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export default function LoginPage() {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const { createSession, error, setError } = useContext(UserContext)
  const { theme } = useContext(InterfaceContext)
  const { userLogged, refetchUser } = useUser()

  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const router = useRouter()

  async function handleLogin(data: LoginFormData) {
    const newSession = { ...data }

    const isLogged = await createSession(newSession)

    if (isLogged) {
      await refetchUser()
      router.push('/projects')
    }
  }

  useEffect(() => {
    if (userLogged) {
      router.push('/projects')
    }
  }, [userLogged, router])

  return (
    <>
      <NextSeo title="Faça o login | Ognare" />

      <LoginPageContainer>
        <Image className="logo" src={LogoToDown} alt="" />
        <Image className="logo2" src={Logo} alt="" />
        <BackgroundLogin src={Back} alt="" darkMode={theme === 'dark'} />

        <LoginFormContainer onSubmit={handleSubmit(handleLogin)}>
          <Text size={'xl'} as="span" spacing={'maximum'} weight="bold">
            Efetue o login
          </Text>

          {error && <ToastError error={error} setError={setError} />}

          <InputContainer>
            <InputHeader size={'xs'} weight="bold">
              E-MAIL
              <Text size="sm" as="span" family="body">
                {formState.errors?.email?.message}
              </Text>
            </InputHeader>

            <TextInputRoot
              variant={formState.errors.email?.message ? 'denied' : 'default'}
            >
              <TextInputIcon>
                <Envelope />
              </TextInputIcon>

              <TextInputInput
                placeholder="exemplo@exemplo.com"
                {...register('email')}
              />
            </TextInputRoot>
          </InputContainer>

          <InputContainer>
            <InputHeader size={'xs'} weight="bold">
              SUA SENHA
              <Text size="sm" as="span" family="body">
                {formState.errors?.password?.message}
              </Text>
            </InputHeader>

            <TextInputRoot
              variant={
                formState.errors.password?.message ? 'denied' : 'default'
              }
            >
              <TextInputIcon>
                <LockKey />
              </TextInputIcon>

              <TextInputInput
                type={isShowPassword ? 'text' : 'password'}
                placeholder="***************"
                {...register('password')}
              />

              <TextInputIcon onClick={() => setIsShowPassword(!isShowPassword)}>
                {isShowPassword ? <Eye /> : <EyeClosed />}
              </TextInputIcon>
            </TextInputRoot>
          </InputContainer>

          <ButtonRoot
            type="submit"
            align="center"
            disabled={formState.isSubmitting}
          >
            <ButtonLabel>Entrar</ButtonLabel>
          </ButtonRoot>

          <Links>
            <Link href="/register">
              <Text as="span" size="xs" weight="bold">
                Ainda não tenho cadastro
              </Text>
            </Link>
            <Link href="/user/password/forgot">
              <Text as="span" size="xs" weight="bold">
                Esqueci minha senha
              </Text>
            </Link>
            {/* <Link href="/getuser">
              <Text as="span" size="xs">
                Possuo um código de acesso
              </Text>
            </Link> */}
          </Links>
        </LoginFormContainer>
      </LoginPageContainer>
    </>
  )
}
