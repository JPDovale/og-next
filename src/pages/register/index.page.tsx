import { zodResolver } from '@hookform/resolvers/zod'
import {
  CardRegister,
  InputContainer,
  InputHeader,
  Links,
  RegisterFormContainer,
  RegisterPageContainer,
} from './styles'

import { useForm } from 'react-hook-form'

import LogoToDown from '../../assets/logos/logo.png'
import Image from 'next/image'
import { Text } from '@components/usefull/Text'
import Link from 'next/link'
import {
  At,
  Envelope,
  Eye,
  EyeClosed,
  // GoogleLogo,
  LockKey,
  UserCircle,
} from 'phosphor-react'
import { z } from 'zod'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
// import { signIn, useSession } from 'next-auth/react'
// import { unstable_getServerSession } from 'next-auth'
// import { loginWithGoogleRequest } from '../../api/userRequest'
// import { authOptions } from '../api/auth/[...nextauth].api'
// import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import { ICreateUserDTO } from '@api/dtos/ICreateUserDTO'
import {
  // ButtonIcon,
  ButtonLabel,
  ButtonRoot,
} from '@components/usefull/Button'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { createUserRequest } from '@api/userRequest'
import { InterfaceContext } from '@contexts/interface'
import { GetStaticProps } from 'next'
// import { getSession, signIn } from 'next-auth/react'

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
  const [isShowPassword, setIsShowPassword] = useState(false)
  const { setError } = useContext(InterfaceContext)

  const {
    handleSubmit,
    register,
    formState,
    setError: setErrorForm,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  async function handleCreateUser(data: RegisterFormData) {
    if (data.password !== data.confirmPassword) {
      return setErrorForm('confirmPassword', {
        message: 'As senhas não correspondem',
      })
    }

    const newUser: ICreateUserDTO = { ...data }
    const response = await createUserRequest({
      email: data.email,
      password: data.password,
      name: newUser.name,
      username: newUser.username,
    })

    if (response.error) {
      setError(response.error)
    }

    if (response.ok) {
      router.push('/projects')
    }
  }

  // async function handleLoginWithGoogle() {
  //   const session = await getSession()

  //   if (session?.user) {
  //     return router.push('/projects')
  //   }

  //   return await signIn('google')
  // }

  return (
    <>
      <NextSeo title="Crie uma conta | Magiscrita" />

      <RegisterPageContainer>
        <CardRegister>
          <Image className="logo" src={LogoToDown} alt="Magiscrita" />

          <Text size="3xl" family="headingText" className="logo">
            MagiScrita
          </Text>

          <Text size="lg" height="shorter" family="body" weight="bold">
            Excelente! Está animado para começar a escrever e compartilhar suas
            histórias no MagiScrita? Para começar, você precisará criar uma
            conta em nossa plataforma. Não se preocupe, é rápido e fácil.
            <br />
            <br /> Para se cadastrar, basta preencher o formulário de inscrição
            com suas informações pessoais e clicar no botão
            &quot;Cadastrar&quot;. Você precisará fornecer seu nome completo,
            endereço de e-mail e uma senha segura para acessar sua conta. Não se
            preocupe, todas as informações que você fornecer serão mantidas em
            segurança em nosso sistema.
            <br />
            <br /> Depois de criar sua conta, você terá acesso a todas as
            funcionalidades da plataforma MagiScrita. Você poderá criar e salvar
            seus escritos, compartilhar suas histórias com outros membros da
            comunidade, participar de desafios criativos, interagir com outros
            escritores e receber feedback valioso sobre suas obras. <br />
            <br />
            Além disso, ao se cadastrar no MagiScrita, você também terá acesso
            exclusivo a recursos de escrita, como artigos sobre técnicas de
            escrita, dicas para melhorar suas habilidades literárias e
            informações sobre eventos e workshops que podem ajudá-lo a aprimorar
            ainda mais sua escrita.
            <br />
            <br />
            Então, não perca mais tempo e crie sua conta no MagiScrita agora
            mesmo! Estamos ansiosos para recebê-lo em nossa comunidade de
            escritores talentosos e apaixonados. Junte-se a nós e comece a
            escrever histórias incríveis!
          </Text>
        </CardRegister>

        <RegisterFormContainer onSubmit={handleSubmit(handleCreateUser)}>
          <Text
            size="2xl"
            css={{ textTransform: 'uppercase' }}
            as="span"
            family="headingText"
          >
            Efetue seu cadastro
          </Text>

          {/* <InputContainer>
            <ButtonRoot
              type="button"
              size="sm"
              align="center"
              onClick={handleLoginWithGoogle}
            >
              <ButtonIcon>
                <GoogleLogo weight="bold" />
              </ButtonIcon>

              <ButtonLabel>Fazer cadastro com o google</ButtonLabel>
            </ButtonRoot>
          </InputContainer> */}

          <InputContainer>
            <InputHeader size={'xs'} weight="bold">
              NOME COMPLETO
              <Text size="sm" as="span" family="body">
                {formState.errors?.name?.message}
              </Text>
            </InputHeader>

            <TextInputRoot
              size="sm"
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
            <InputHeader size={'xs'} weight="bold">
              NOME DE USUÁRIO
              <Text size="sm" as="span" family="body">
                {formState.errors?.username?.message}
              </Text>
            </InputHeader>

            <TextInputRoot
              size="sm"
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
            <InputHeader size={'xs'} weight="bold">
              E-MAIL VÁLIDO
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

          <InputContainer>
            <InputHeader size={'xs'} weight="bold">
              CONFIRME A SUA SENHA
              <Text size="sm" as="span" family="body">
                {formState.errors?.confirmPassword?.message}
              </Text>
            </InputHeader>

            <TextInputRoot
              size="sm"
              variant={
                formState.errors.confirmPassword?.message ? 'denied' : 'default'
              }
            >
              <TextInputIcon>
                <LockKey />
              </TextInputIcon>

              <TextInputInput
                type={isShowPassword ? 'text' : 'password'}
                placeholder="***************"
                {...register('confirmPassword')}
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
            <ButtonLabel>Cadastrar</ButtonLabel>
          </ButtonRoot>
          <Text
            size="sm"
            family="body"
            css={{
              marginTop: '-$4',
            }}
          >
            Ao clicar no botão você declara que aceita os termos de uso
          </Text>

          <Links>
            <Link href="/login">
              <Text as="a" size="xs" weight="bold">
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
