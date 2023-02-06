import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text } from '@og-ui/react'
import Link from 'next/link'
import { Envelope, LockKey } from 'phosphor-react'
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
import { TextInput } from '../../components/TextInput'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/user'

import { ResponseInfoApi } from '../../components/ResponseInfoApi'
import { NextSeo } from 'next-seo'
import { Loading } from '../../components/Loading'

const loginFormSchema = z.object({
  email: z.string().email({ message: 'O email é invalido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha precisa conter mais de 6 letras' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export default function LoginPage() {
  const { createSession, userLogged, loading, error } = useContext(UserContext)

  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const router = useRouter()

  async function handleLogin(data: LoginFormData) {
    const newSession = { ...data }

    const isLogged = await createSession(newSession)

    if (isLogged) {
      router.push('/projects')
    }
  }

  useEffect(() => {
    if (userLogged) {
      router.push('/projects')
    }
  }, [userLogged, router])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <NextSeo title="Faça o login | Ognare" />

      <LoginPageContainer>
        <Image className="logo" src={LogoToDown} alt="" />
        <Image className="logo2" src={Logo} alt="" />
        <BackgroundLogin src={Back} alt="" />

        <LoginFormContainer onSubmit={handleSubmit(handleLogin)}>
          <Text size={'xl'} as="span" spacing={'maximum'} weight="bold">
            Efetue o login
          </Text>

          {error && <ResponseInfoApi error={error} />}

          <InputContainer>
            <InputHeader size={'xs'}>
              E-MAIL
              <Text size="sm" as="span" family="body">
                {formState.errors?.email?.message}
              </Text>
            </InputHeader>

            <TextInput
              label="email"
              register={register}
              variant={formState.errors.email?.message ? 'denied' : 'default'}
              icon={<Envelope />}
              placeholder="exemplo@exemplo.com"
            />
          </InputContainer>

          <InputContainer>
            <InputHeader size={'xs'}>
              SUA SENHA
              <Text size="sm" as="span" family="body">
                {formState.errors?.password?.message}
              </Text>
            </InputHeader>

            <TextInput
              label="password"
              register={register}
              variant={
                formState.errors.password?.message ? 'denied' : 'default'
              }
              icon={<LockKey />}
              placeholder="***************"
              isShown
            />
          </InputContainer>

          <Button
            type="submit"
            label="Entrar"
            align="center"
            disabled={formState.isSubmitting}
          />

          <Links>
            <Link href="/register">
              <Text as="span" size="xs">
                Ainda não tenho cadastro
              </Text>
            </Link>
            <Link href="/user/password/forgot">
              <Text as="span" size="xs">
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
