import { NextSeo } from 'next-seo'
import { useContext } from 'react'
import Image from 'next/image'

import Back from '../../../../assets/back.svg'
import LogoToDown from '../../../../assets/logos/logoToDown.svg'
import Logo from '../../../../assets/logos/logo.svg'
import {
  BackgroundResetPassword,
  InputContainer,
  InputHeader,
  Links,
  ResetPasswordFormContainer,
  ResetPasswordPageContainer,
} from './styles'
import { Button, Text } from '@og-ui/react'
import { ResponseInfoApi } from '../../../../components/ResponseInfoApi'
import { UserContext } from '../../../../contexts/user'
import { LockKey } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from '../../../../components/TextInput'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

const resetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'A senha precisa conter mais de 6 letras' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'A senha precisa conter mais de 6 letras' }),
})

type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>

export default function ResetPasswordPage() {
  const { error, setError, recoveryPassword, success } = useContext(UserContext)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState,
    setError: setFormError,
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
  })

  async function handleResetPassword(data: ResetPasswordFormData) {
    if (data.password !== data.confirmPassword) {
      return setFormError('confirmPassword', {
        message: 'As senhas são diferentes.',
      })
    }

    const token = router.query.token as string
    if (!token) {
      return setError({
        title: 'Erro ao processar as informações',
        message:
          'Tem algo de errado com o link de reset. Caso necessário peça outro link.',
      })
    }

    await recoveryPassword(data.password, token)

    reset()
  }

  return (
    <>
      <NextSeo title="Recuperação de senha | Ognare" />

      <ResetPasswordPageContainer>
        <Image className="logo" src={LogoToDown} alt="" />
        <Image className="logo2" src={Logo} alt="" />
        <BackgroundResetPassword src={Back} alt="" priority />

        <ResetPasswordFormContainer
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <Text size={'xl'} as="span" spacing={'maximum'} weight="bold">
            Reset de senha
          </Text>

          {error && <ResponseInfoApi error={error} />}
          {success && <ResponseInfoApi success={success} />}

          <InputContainer>
            <InputHeader size={'xs'}>
              NOVA SENHA
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
              type="password"
            />
          </InputContainer>

          <InputContainer>
            <InputHeader size={'xs'}>
              CONFIRMAR NOVA SENHA
              <Text size="sm" as="span" family="body">
                {formState.errors?.confirmPassword?.message}
              </Text>
            </InputHeader>

            <TextInput
              label="confirmPassword"
              register={register}
              type="password"
              variant={
                formState.errors.password?.message ? 'denied' : 'default'
              }
              icon={<LockKey />}
              placeholder="***************"
            />
          </InputContainer>

          <Button
            type="submit"
            label="Redefinir senha"
            align="center"
            disabled={formState.isSubmitting}
          />
          <Links>
            <Link href="/login">
              <Text as="span" size="xs">
                Voltar para o login
              </Text>
            </Link>
          </Links>
        </ResetPasswordFormContainer>
      </ResetPasswordPageContainer>
    </>
  )
}