import { NextSeo } from 'next-seo'
import { useContext, useState } from 'react'
import Image from 'next/image'

import LogoToDown from '../../../../assets/logos/logoOG.png'
import {
  CardResetPassword,
  InputContainer,
  InputHeader,
  Links,
  ResetPasswordFormContainer,
  ResetPasswordPageContainer,
} from './styles'
import { Text } from '@components/usefull/Text'
import { Eye, EyeClosed, LockKey } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { InterfaceContext } from '@contexts/interface'
import { recoveryPasswordRequest } from '@api/userRequest'
import { Toast } from '@components/usefull/Toast'

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
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [successToasOpen, setSuccessToastOpen] = useState(false)
  const { setError } = useContext(InterfaceContext)

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
    setSuccessToastOpen(false)
    setError(null)

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

    const response = await recoveryPasswordRequest(data.password, token)

    if (response.error) {
      setError(response.error)
      return
    }

    if (response.ok) {
      setSuccessToastOpen(true)
      reset()
    }
  }

  return (
    <>
      <NextSeo title="Recuperação de senha | Magiscrita" />

      <ResetPasswordPageContainer>
        <Toast
          open={successToasOpen}
          setOpen={setSuccessToastOpen}
          title="Senha alterada"
          message="Sua senha foi alterada com sucesso! Faça login novamente para acessar a sua conta"
        />

        <CardResetPassword>
          <Image className="logo" src={LogoToDown} alt="" />
          <Text size="3xl" family="headingText" className="logo">
            MagiScrita
          </Text>

          <Text size="lg" height="shorter" family="body" weight="bold">
            Ótimo, você está prestes a criar uma nova senha para sua conta no
            MagiScrita! Para garantir a segurança da sua conta, recomendamos que
            você escolha uma senha forte e segura.
            <br />
            <br />
            Para criar sua nova senha, insira-a nos campos correspondentes na
            página de redefinição de senha. Certifique-se de escolher uma senha
            com pelo menos oito caracteres, incluindo letras, números e
            símbolos.
            <br />
            <br /> Lembre-se de que sua nova senha deve ser diferente de
            qualquer outra senha que você tenha usado anteriormente e que é
            importante mantê-la em segurança. Não compartilhe sua senha com
            ninguém e evite usá-la em outros sites ou serviços. <br />
            <br />
            Depois de criar sua nova senha, você poderá fazer login em sua conta
            do MagiScrita e continuar a escrever e compartilhar suas histórias
            com a comunidade. Lembre-se de que você sempre pode entrar em
            contato com nosso suporte ao cliente se precisar de ajuda para
            recuperar o acesso à sua conta.
            <br />
            <br />
            Obrigado por usar o MagiScrita e esperamos que você aproveite todas
            as oportunidades que oferecemos para melhorar suas habilidades de
            escrita e se conectar com outros escritores apaixonados. Agora, crie
            sua nova senha segura e comece a escrever!
          </Text>
        </CardResetPassword>

        <ResetPasswordFormContainer
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <Text
            size="2xl"
            css={{ textTransform: 'uppercase' }}
            as="span"
            family="headingText"
          >
            Criar nova senha
          </Text>

          <InputContainer>
            <InputHeader size={'xs'} weight="bold">
              NOVA SENHA
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
              CONFIRMAR NOVA SENHA
              <Text size="sm" as="span" family="body">
                {formState.errors?.confirmPassword?.message}
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
            <ButtonLabel>Redefinir senha</ButtonLabel>
          </ButtonRoot>
          <Links>
            <Link href="/login">
              <Text as="span" size="xs" weight="bold">
                Voltar para o login
              </Text>
            </Link>
          </Links>
        </ResetPasswordFormContainer>
      </ResetPasswordPageContainer>
    </>
  )
}
