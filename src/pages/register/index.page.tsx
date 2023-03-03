import { zodResolver } from '@hookform/resolvers/zod'
import {
  BackgroundRegister,
  InputContainer,
  InputHeader,
  Links,
  RegisterFormContainer,
  RegisterPageContainer,
} from './styles'

import { useForm } from 'react-hook-form'

import Back from '../../assets/back.svg'
import LogoToDown from '../../assets/logos/logoToDown.svg'
import Logo from '../../assets/logos/logo.svg'
import Image from 'next/image'
import { Text } from '@components/usefull/Text'
import Link from 'next/link'
import {
  At,
  Envelope,
  // GoogleLogo,
  LockKey,
  UserCircle,
} from 'phosphor-react'
import { z } from 'zod'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
// import { signIn, useSession } from 'next-auth/react'
// import { unstable_getServerSession } from 'next-auth'
// import { loginWithGoogleRequest } from '../../api/userRequest'
// import { authOptions } from '../api/auth/[...nextauth].api'
// import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import { UserContext } from '@contexts/user'
import { Loading } from '@components/usefull/Loading'
import { ResponseInfoApi } from '@components/usefull/ResponseInfoApi'
import { ICreateUserDTO } from '@api/dtos/ICreateUserDTO'
import { ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'

const registerFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 letras' })
    .max(100, { message: 'O nome não pode ter mais de 100 caracteres' }),
  username: z
    .string()
    .regex(/^([a-z\\-]+)$/i, {
      message:
        'O nome de usuário possui caracteres inválidos. Coloque apenas letas e hifens',
    })
    .min(3, {
      message: 'O nome de usuário precisa ter no mínimo 3 letras',
    })
    .max(30, {
      message: 'O nome de usuário não pode ter mais de 30 caracteres',
    })

    .transform((username) => username.toLowerCase()),
  email: z.string().email({ message: 'O email é invalido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha precisa conter mais de 6 letras' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'A senha precisa conter mais de 6 letras' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function RegisterPage() {
  const { createUser, userLogged, error, loading } = useContext(UserContext)

  const { handleSubmit, register, formState, setError } =
    useForm<RegisterFormData>({
      resolver: zodResolver(registerFormSchema),
    })

  const router = useRouter()
  // const session = useSession()

  async function handleCreateUser(data: RegisterFormData) {
    if (data.password !== data.confirmPassword) {
      return setError('confirmPassword', {
        message: 'As senhas não correspondem',
      })
    }

    const newUser: ICreateUserDTO = { ...data }
    const userCreated = await createUser(newUser)

    if (userCreated) {
      router.push('/projects')
    }
  }

  useEffect(() => {
    if (userLogged) {
      router.push('/projects')
    }
  }, [userLogged, router])

  // useEffect(() => {
  //   if (session?.data?.loggedUser!) setUser(session?.data?.loggedUser!)
  // }, [session, setUser])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <NextSeo title="Crie uma conta | Ognare" />

      <RegisterPageContainer>
        <Image className="logo" src={LogoToDown} alt="Ognare" />
        <Image className="logo2" src={Logo} alt="Ognare" />

        <BackgroundRegister src={Back} alt="" />

        <RegisterFormContainer onSubmit={handleSubmit(handleCreateUser)}>
          <Text size={'xl'} as="span" spacing={'maximum'} weight="bold">
            Efetue seu cadastro
          </Text>

          {/* <InputContainer>
            <ButtonRoot
              type="button"
              label="Fazer cadastro com o google"
              icon={<GoogleLogo weight="bold" />}
              css={{ padding: '$3' }}
              align="center"
              onClick={() => signIn('google')}
            />
          </InputContainer> */}

          {error && <ResponseInfoApi error={error} />}

          <InputContainer>
            <InputHeader size={'xs'}>
              NOME COMPLETO
              <Text size="sm" as="span" family="body">
                {formState.errors?.name?.message}
              </Text>
            </InputHeader>

            <TextInputRoot
              variant={formState.errors.name?.message ? 'denied' : 'default'}
            >
              <TextInputIcon>
                <UserCircle />
              </TextInputIcon>

              <TextInputInput
                placeholder="Ana Maria da Silva"
                {...register('name')}
              />
            </TextInputRoot>
          </InputContainer>

          <InputContainer>
            <InputHeader size={'xs'}>
              NOME DE USUÁRIO
              <Text size="sm" as="span" family="body">
                {formState.errors?.username?.message}
              </Text>
            </InputHeader>

            <TextInputRoot
              variant={
                formState.errors.username?.message ? 'denied' : 'default'
              }
            >
              <TextInputIcon>
                <At />
              </TextInputIcon>

              <TextInputInput placeholder="Aninha" {...register('username')} />
            </TextInputRoot>
          </InputContainer>

          <InputContainer>
            <InputHeader size={'xs'}>
              E-MAIL VÁLIDO
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
            <InputHeader size={'xs'}>
              SUA SENHA
              <Text size="sm" as="span" family="body">
                {formState.errors?.password?.message}
              </Text>
            </InputHeader>

            <TextInputRoot
              variant={
                formState.errors.password?.message ? 'denied' : 'default'
              }
              isShown
            >
              <TextInputIcon>
                <LockKey />
              </TextInputIcon>

              <TextInputInput
                placeholder="***************"
                {...register('password')}
              />
            </TextInputRoot>
          </InputContainer>

          <InputContainer>
            <InputHeader size={'xs'}>
              CONFIRME A SUA SENHA
              <Text size="sm" as="span" family="body">
                {formState.errors?.confirmPassword?.message}
              </Text>
            </InputHeader>

            <TextInputRoot
              variant={
                formState.errors.confirmPassword?.message ? 'denied' : 'default'
              }
              isShown
            >
              <TextInputIcon>
                <LockKey />
              </TextInputIcon>

              <TextInputInput
                placeholder="***************"
                {...register('confirmPassword')}
              />
            </TextInputRoot>
          </InputContainer>

          <ButtonRoot
            type="submit"
            align="center"
            disabled={formState.isSubmitting}
          >
            <ButtonLabel>Cadastrar</ButtonLabel>
          </ButtonRoot>
          <Text
            size="sm"
            family="body"
            css={{
              marginTop: '-$4',
              color: '$base700',
            }}
          >
            Ao clicar no botão você declara que aceita os termos de uso
          </Text>

          <Links>
            <Link href="/login">
              <Text as="a" size="xs">
                Já tenho cadastro
              </Text>
            </Link>
            {/* <Link href="/getuser">
              <Text as="a" size="xs">
                Possuo um código de acesso
              </Text>
            </Link> */}
          </Links>
        </RegisterFormContainer>
      </RegisterPageContainer>
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = await unstable_getServerSession(req, res, authOptions)
//   const loggedUser = await loginWithGoogleRequest(session?.user)

//   return {
//     props: {
//       session: {
//         ...session,
//         loggedUser,
//       },
//     },
//   }
// }
