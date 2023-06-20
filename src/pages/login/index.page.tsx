import { zodResolver } from '@hookform/resolvers/zod'
import { Text } from '@components/usefull/Text'
import Link from 'next/link'
import { Envelope, Eye, EyeClosed, GoogleLogo, LockKey } from 'phosphor-react'
import {
  CardLogin,
  InputContainer,
  InputHeader,
  Links,
  LoginFormContainer,
  LoginPageContainer,
} from './styles'

import LogoToDown from '../../assets/logos/logo.png'

import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import { NextSeo } from 'next-seo'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { createSessionRequest } from '@api/userRequest'
import { InterfaceContext } from '@contexts/interface'
import { useUser } from '@hooks/useUser'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { signIn } from 'next-auth/react'

const loginFormSchema = z.object({
  email: z.string().email({ message: 'O email é invalido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha precisa conter mais de 6 letras' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export default function LoginPage() {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const { setError } = useContext(InterfaceContext)

  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const { refetchUser, user } = useUser()

  const router = useRouter()

  async function handleLogin(data: LoginFormData) {
    const response = await createSessionRequest(data.email, data.password)

    if (response.error) {
      setError(response.error)
    }

    if (response.ok) {
      await refetchUser()
      router.push('/projects')
    }
  }

  async function handleLoginWithGoogle() {
    return await signIn('google')
  }

  useEffect(() => {
    if (user) router.push('/projects')
  }, [user, router])

  return (
    <>
      <NextSeo title="Faça o login | Magiscrita" />

      <LoginPageContainer>
        <CardLogin>
          <Image className="logo" src={LogoToDown} alt="" />
          <Text size="3xl" family="headingText" className="logo">
            MagiScrita
          </Text>

          <Text size="lg" height="shorter" family="body" weight="bold">
            Bem-vindo de volta ao MagiScrita, a plataforma de escrita criativa
            que permite que sua imaginação voe livremente! Estamos muito felizes
            em tê-lo de volta conosco. Sabemos que o tempo pode ser escasso e
            que a vida é agitada, mas estamos sempre aqui para lhe oferecer um
            espaço tranquilo e inspirador para você deixar fluir sua
            criatividade.
            <br />
            <br /> MagiScrita é um lugar onde suas ideias são bem-vindas e onde
            você pode compartilhar seus escritos com uma comunidade apaixonada
            por literatura. Nosso objetivo é fornecer as ferramentas e recursos
            necessários para ajudá-lo a aprimorar suas habilidades de escrita e
            tornar suas histórias ainda mais envolventes.
            <br />
            <br /> Não importa se você é um escritor experiente ou se está
            apenas começando sua jornada literária, o MagiScrita é o lugar
            perfeito para expandir seus horizontes e explorar novas ideias. Aqui
            você encontrará tudo o que precisa para transformar suas histórias
            em obras-primas, desde dicas de escrita até desafios criativos, além
            de uma comunidade de escritores dedicados que estarão sempre prontos
            para ajudar e apoiar uns aos outros. <br />
            <br />
            Então, seja bem-vindo de volta ao MagiScrita. Estamos ansiosos para
            ver o que você irá criar aqui e mal podemos esperar para ler suas
            próximas histórias incríveis!
          </Text>
        </CardLogin>

        <LoginFormContainer onSubmit={handleSubmit(handleLogin)}>
          <Text
            size="2xl"
            css={{ textTransform: 'uppercase' }}
            as="span"
            family="headingText"
          >
            Efetue o login
          </Text>

          <InputContainer>
            <InputHeader size={'xs'} weight="bold">
              E-MAIL
              <Text size="sm" as="span" family="body">
                {formState.errors?.email?.message}
              </Text>
            </InputHeader>

            <TextInputRoot
              size="sm"
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
              size="sm"
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
            size="sm"
            disabled={formState.isSubmitting}
          >
            <ButtonLabel>Entrar</ButtonLabel>
          </ButtonRoot>

          <ContainerGrid padding={0}>
            <ButtonRoot
              size="sm"
              align="center"
              type="button"
              onClick={handleLoginWithGoogle}
            >
              <ButtonIcon>
                <GoogleLogo weight="bold" />
              </ButtonIcon>

              <ButtonLabel>Entrar com o Google</ButtonLabel>
            </ButtonRoot>
          </ContainerGrid>

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
