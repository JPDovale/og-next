import { NextSeo } from 'next-seo'
import { useContext } from 'react'
import Image from 'next/image'

import Back from '../../../../assets/back.svg'
import LogoToDown from '../../../../assets/logos/logoToDown.svg'
import Logo from '../../../../assets/logos/logo.svg'
import {
  BackgroundForgotPassword,
  InputContainer,
  InputHeader,
  ForgotPasswordFormContainer,
  ForgotPasswordPageContainer,
  Links,
} from './styles'
import { Text } from '@components/usefull/Text'
import { LockKey } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { ResponseInfoApi } from '@components/usefull/ResponseInfoApi'
import { UserContext } from '@contexts/user'
import { ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { InterfaceContext } from '@contexts/interface'

const resetPasswordFormSchema = z.object({
  email: z.string().email({ message: 'O email é invalido.' }),
})

type ForgotPasswordFormData = z.infer<typeof resetPasswordFormSchema>

export default function ForgotPasswordPage() {
  const { error, success, sendMailForgotPassword, setSuccess, setError } =
    useContext(UserContext)
  const { theme } = useContext(InterfaceContext)

  const { register, handleSubmit, formState, reset } =
    useForm<ForgotPasswordFormData>({
      resolver: zodResolver(resetPasswordFormSchema),
    })

  async function handleForgotPassword(data: ForgotPasswordFormData) {
    setSuccess(undefined)
    setError(undefined)

    await sendMailForgotPassword(data.email)

    reset()
  }

  return (
    <>
      <NextSeo title="Recuperação de senha | Ognare" />

      <ForgotPasswordPageContainer>
        <Image className="logo" src={LogoToDown} alt="" />
        <Image className="logo2" src={Logo} alt="" />
        <BackgroundForgotPassword
          src={Back}
          alt=""
          priority
          darkMode={theme === 'dark'}
        />

        <ForgotPasswordFormContainer
          onSubmit={handleSubmit(handleForgotPassword)}
        >
          <Text size={'xl'} as="span" spacing={'maximum'} weight="bold">
            Recuperação de senha
          </Text>

          {error && <ResponseInfoApi error={error} />}
          {success && <ResponseInfoApi success={success} />}

          <InputContainer>
            <InputHeader size={'xs'} weight="bold">
              Email
              <Text size="sm" as="span" family="body">
                {formState.errors?.email?.message}
              </Text>
            </InputHeader>

            <TextInputRoot
              variant={formState.errors.email?.message ? 'denied' : 'default'}
            >
              <TextInputIcon>
                <LockKey />
              </TextInputIcon>

              <TextInputInput
                placeholder="exemplo@exemplo.com"
                {...register('email')}
              />
            </TextInputRoot>
          </InputContainer>

          <ButtonRoot
            type="submit"
            align="center"
            disabled={formState.isSubmitting}
          >
            <ButtonLabel>Enviar email de recuperação</ButtonLabel>
          </ButtonRoot>
          <Text family="body" spacing="minimus" size="sm" weight="regular">
            Um e-mail de recuperação de senha será enviada para você com as
            instruções para alterar a sua senha.
            <br />
            <br />
            Caso você não tenha fornecido um e-mail valido durante a criação da
            sua conta, infelizmente não poderemos verificar sua conta.
          </Text>

          <Links>
            <Link href="/login">
              <Text as="span" size="xs" weight="bold">
                Voltar para o login
              </Text>
            </Link>
            <Link href="/register">
              <Text as="span" size="xs" weight="bold">
                Ainda não teno uma conta
              </Text>
            </Link>
            {/* <Link href="/getuser">
              <Text as="span" size="xs">
                Possuo um código de acesso
              </Text>
            </Link> */}
          </Links>
        </ForgotPasswordFormContainer>
      </ForgotPasswordPageContainer>
    </>
  )
}
