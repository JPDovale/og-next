import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Textarea } from '@og-ui/react'
import { Share } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Error } from '../../components/Error'
import { InfoDefault } from '../../components/usefull/InfoDefault'
import { notifyUsersFunction } from '../../contexts/user/functions/notifyUsersFunction'
import { verifyFunction } from '../../contexts/user/functions/verifyFunction'
import { NotifyContainer, NotifyForm } from './styles'

const notifyBodySchema = z.object({
  title: z.string().min(1).max(1000),
  content: z.string().min(1).max(1000),
})

type notifyBody = z.infer<typeof notifyBodySchema>

export default function NotifyAllUsers() {
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState(false)

  const { handleSubmit, register, reset } = useForm<notifyBody>({
    resolver: zodResolver(notifyBodySchema),
  })

  async function verify() {
    const response = await verifyFunction()

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
    await notifyUsersFunction(data.title, data.content)
    reset()
  }

  return (
    <NotifyContainer>
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

        <Button type="submit" label="Send" icon={<Share />} align="center" />
      </NotifyForm>
    </NotifyContainer>
  )
}
