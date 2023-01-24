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
import { Button, Text } from '@og-ui/react'
import { ResponseInfoApi } from '../../../../components/ResponseInfoApi'
import { UserContext } from '../../../../contexts/user'
import { LockKey } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from '../../../../components/TextInput'
import Link from 'next/link'

const resetPasswordFormSchema = z.object({
  email: z.string().email({ message: 'O email é invalido.' }),
})

type ForgotPasswordFormData = z.infer<typeof resetPasswordFormSchema>

export default function ForgotPasswordPage() {
  const { error, success, sendMailForgotPassword, setSuccess, setError } =
    useContext(UserContext)

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
        <BackgroundForgotPassword src={Back} alt="" priority />

        <ForgotPasswordFormContainer
          onSubmit={handleSubmit(handleForgotPassword)}
        >
          <Text size={'xl'} as="span" spacing={'maximum'} weight="bold">
            Recuperação de senha
          </Text>

          {error && <ResponseInfoApi error={error} />}
          {success && <ResponseInfoApi success={success} />}

          <InputContainer>
            <InputHeader size={'xs'}>
              Email
              <Text size="sm" as="span" family="body">
                {formState.errors?.email?.message}
              </Text>
            </InputHeader>

            <TextInput
              label="email"
              register={register}
              variant={formState.errors.email?.message ? 'denied' : 'default'}
              icon={<LockKey />}
              placeholder="exemplo@exemplo.com"
              type="email"
            />
          </InputContainer>

          <Button
            type="submit"
            label="Enviar email de recuperação"
            align="center"
            disabled={formState.isSubmitting}
          />
          <Text
            family="body"
            spacing="minimus"
            size="sm"
            weight="regular"
            css={{ color: '$base700' }}
          >
            Um e-mail de recuperação de senha será enviada para você com as
            instruções para alterar a sua senha.
            <br />
            <br />
            Caso você não tenha fornecido um e-mail valido durante a criação da
            sua conta, infelizmente não poderemos verificar sua conta.
          </Text>

          <Links>
            <Link href="/login">
              <Text as="span" size="xs">
                Voltar para o login
              </Text>
            </Link>
            <Link href="/register">
              <Text as="span" size="xs">
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
