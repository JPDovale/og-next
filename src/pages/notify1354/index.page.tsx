import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Error } from '@components/usefull/Error'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@components/usefull/Textarea'
import { Share } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { NotifyContainer, NotifyForm } from './styles'
import { notifyUsersRequest, verifyRequest } from '@api/userRequest'
import { InterfaceContext } from '@contexts/interface'
import { Toast } from '@components/usefull/Toast'

const notifyBodySchema = z.object({
  title: z.string().min(1).max(1000),
  content: z.string().min(1).max(1000),
})

type notifyBody = z.infer<typeof notifyBodySchema>

export default function NotifyAllUsers() {
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState(false)
  const [successToastOpen, setSuccessToastOpen] = useState(false)

  const { setError } = useContext(InterfaceContext)

  const { handleSubmit, register, reset } = useForm<notifyBody>({
    resolver: zodResolver(notifyBodySchema),
  })

  async function verify() {
    const response = await verifyRequest()

    if (response.admin) {
      setAdmin(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    verify()
  }, [])

  if (loading || !admin) {
    return (
      <Error
        statusCode={404}
        errorMessage="Página não encontrada! Parece que você se perdeu, sonhador."
      />
    )
  }

  async function handleNotify(data: notifyBody) {
    const response = await notifyUsersRequest(data.title, data.content)

    if (response.error) {
      setError(response.error)
      return
    }

    if (response.ok) {
      reset()
      setSuccessToastOpen(true)
    }
  }

  return (
    <NotifyContainer>
      <Toast
        title="Notificação enviada"
        message="Todos os usuários foram notificados"
        open={successToastOpen}
        setOpen={setSuccessToastOpen}
      />
      <NotifyForm onSubmit={handleSubmit(handleNotify)}>
        <InfoDefault title="Title">
          <Textarea
            css={{
              width: '100%',
              maxHeight: '60px',
              overflow: 'hidden',
              resize: 'none',
            }}
            {...register('title')}
          />
        </InfoDefault>

        <InfoDefault title="Content">
          <Textarea
            css={{
              width: '100%',
              minHeight: '240px',
            }}
            {...register('content')}
          />
        </InfoDefault>

        <ButtonRoot type="submit" align="center">
          <ButtonIcon>
            <Share />
          </ButtonIcon>

          <ButtonLabel>Enviar</ButtonLabel>
        </ButtonRoot>
      </NotifyForm>
    </NotifyContainer>
  )
}
