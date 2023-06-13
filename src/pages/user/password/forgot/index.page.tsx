import { NextSeo } from 'next-seo'
import { useContext, useState } from 'react'
import Image from 'next/image'

import LogoToDown from '../../../../assets/logos/logo.png'
import {
  InputContainer,
  InputHeader,
  ForgotPasswordFormContainer,
  ForgotPasswordPageContainer,
  Links,
  CardForgotPassword,
} from './styles'
import { Text } from '@components/usefull/Text'
import { Envelope } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { InterfaceContext } from '@contexts/interface'
import { sendMailForgotPasswordRequest } from '@api/userRequest'
import { Toast } from '@components/usefull/Toast'

const resetPasswordFormSchema = z.object({
  email: z.string().email({ message: 'O email é invalido.' }),
})

type ForgotPasswordFormData = z.infer<typeof resetPasswordFormSchema>

export default function ForgotPasswordPage() {
  const [successTostOpen, setSuccessTostOpen] = useState(false)
  const { setError } = useContext(InterfaceContext)

  const { register, handleSubmit, formState, reset } =
    useForm<ForgotPasswordFormData>({
      resolver: zodResolver(resetPasswordFormSchema),
    })

  async function handleForgotPassword(data: ForgotPasswordFormData) {
    setSuccessTostOpen(false)
    setError(null)

    const response = await sendMailForgotPasswordRequest(data.email)

    if (response.error) {
      setError(response.error)
      return
    }

    if (response.ok) {
      reset()
      setSuccessTostOpen(true)
    }
  }

  return (
    <>
      <NextSeo title="Recuperação de senha | Magiscrita" />

      <ForgotPasswordPageContainer>
        <Toast
          open={successTostOpen}
          setOpen={setSuccessTostOpen}
          title="Email enviado"
          message="Foi enviado um email de recuperação de senha para você... Confira sua caixa de mensagem"
        />
        <CardForgotPassword>
          <Image className="logo" src={LogoToDown} alt="" />

          <Text size="3xl" family="headingText" className="logo">
            MagiScrita
          </Text>

          <Text size="lg" height="shorter" family="body" weight="bold">
            Esqueceu sua senha do MagiScrita? Não se preocupe, nós podemos
            ajudar! A recuperação de senha é rápida e fácil.
            <br />
            <br /> Basta fornecer o endereço de e-mail que você usou para criar
            sua conta. Em seguida, enviaremos um e-mail com um link para
            redefinir sua senha.
            <br />
            <br /> Certifique-se de verificar sua pasta de spam ou lixo
            eletrônico caso não encontre o e-mail de recuperação de senha em sua
            caixa de entrada. <br />
            <br />
            Ao clicar no link, você será redirecionado para uma página em que
            poderá criar uma nova senha segura. Lembre-se de criar uma senha
            forte, com pelo menos oito caracteres, incluindo letras, números e
            símbolos, para garantir a segurança de sua conta. <br />
            <br />
            Se tiver dificuldades para recuperar sua senha, entre em contato com
            nosso suporte ao cliente. Teremos prazer em ajudá-lo a recuperar o
            acesso à sua conta e voltar a escrever suas histórias no MagiScrita
            o mais rápido possível.
            <br />
            <br />
            Esperamos ter ajudado a recuperar sua senha e que você volte a usar
            nossa plataforma em breve. Aproveite todos os recursos e
            oportunidades que oferecemos para aprimorar suas habilidades de
            escrita e compartilhar suas histórias com a comunidade.
          </Text>
        </CardForgotPassword>

        <ForgotPasswordFormContainer
          onSubmit={handleSubmit(handleForgotPassword)}
        >
          <Text
            size="2xl"
            css={{ textTransform: 'uppercase' }}
            as="span"
            family="headingText"
          >
            Recuperação de senha
          </Text>

          <InputContainer>
            <InputHeader size={'xs'} weight="bold">
              Email
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

          <ButtonRoot
            type="submit"
            align="center"
            disabled={formState.isSubmitting}
          >
            <ButtonLabel>Enviar email de recuperação</ButtonLabel>
          </ButtonRoot>

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
