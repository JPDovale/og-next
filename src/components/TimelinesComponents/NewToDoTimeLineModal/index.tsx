import { useContext, useState } from 'react'
import { ModalContent } from '@components/usefull/ModalContent'
import { InterfaceContext } from '@contexts/interface'
import { z } from 'zod'
import { LabelInput } from '@components/usefull/LabelInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { Textarea } from '@components/usefull/Textarea'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { FilePlus } from 'phosphor-react'
import { IError } from '@@types/errors/IError'
import { ToastError } from '@components/usefull/ToastError'
import { Toast } from '@components/usefull/Toast'
import { NewToDoTimeLineForm } from './styles'
import { useToDoTimeLines } from '@hooks/useToDoTimeLines'

const newTimeLineFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O titulo precisa ter pelo menos 2 caracteres' })
    .max(160, { message: ' O titulo não pode ter mais de 160 caracteres' }),
  description: z
    .string()
    .min(2, { message: 'A descrição precisa ter pelo menos 2 caracteres' })
    .max(600, { message: ' A descrição não pode ter mais de 600 caracteres' }),
  startDate: z.coerce.date({
    invalid_type_error: 'Insira uma date de inicio valida',
  }),
  endDate: z.coerce.date({
    invalid_type_error: 'Insira uma date de fim valida',
  }),
})

type INewTimeLineFormaData = z.infer<typeof newTimeLineFormSchema>

export function NewToDoTimeLineModal() {
  const [error, setError] = useState<IError | null>(null)
  const [successToastOpen, setSuccessToastOpen] = useState(false)

  const { theme } = useContext(InterfaceContext)
  const isDarkMode = theme === 'dark'

  const { callEvent } = useToDoTimeLines()

  const { formState, handleSubmit, register, reset } =
    useForm<INewTimeLineFormaData>({
      resolver: zodResolver(newTimeLineFormSchema),
    })

  async function handleCreateNewTimeLine(data: INewTimeLineFormaData) {
    const { resolved, error } = await callEvent.createToDoTimeLine(data)

    if (error) {
      setError(error)
      return
    }

    if (resolved) {
      reset()
      setSuccessToastOpen(true)
    }
  }

  return (
    <ModalContent title="Novo evento na linha do tempo" sizeWid="lg">
      <ToastError error={error} setError={setError} />

      <Toast
        open={successToastOpen}
        setOpen={setSuccessToastOpen}
        title="Linha de tempo criada"
        message="Você acabou de criar uma nova linha de tempo"
      />
      <NewToDoTimeLineForm
        darkMode={isDarkMode}
        onSubmit={handleSubmit(handleCreateNewTimeLine)}
      >
        <LabelInput label="Titulo:" error={formState.errors.title?.message}>
          <TextInputRoot
            size="sm"
            css={{ background: !isDarkMode ? '$base700' : '' }}
          >
            <TextInputInput
              css={{ color: isDarkMode ? '$white' : '' }}
              placeholder="Titulo do evento"
              {...register('title')}
            />
          </TextInputRoot>
        </LabelInput>

        <LabelInput
          label="Descrição:"
          error={formState.errors.description?.message}
        >
          <Textarea
            css={{
              background: !isDarkMode ? '$base700' : '',
              color: isDarkMode ? '$white' : '',
            }}
            placeholder="Descrição do evento"
            {...register('description')}
          />
        </LabelInput>

        <ContainerGrid columns={2} padding={0}>
          <LabelInput
            label="Data de inicio:"
            error={formState.errors.startDate?.message}
          >
            <TextInputRoot
              size="sm"
              css={{ background: !isDarkMode ? '$base700' : '' }}
            >
              <TextInputInput
                type="date"
                css={{ color: isDarkMode ? '$white' : '' }}
                {...register('startDate')}
              />
            </TextInputRoot>
          </LabelInput>

          <LabelInput
            label="Data de fim:"
            error={formState.errors.endDate?.message}
          >
            <TextInputRoot
              size="sm"
              css={{ background: !isDarkMode ? '$base700' : '' }}
            >
              <TextInputInput
                type="date"
                css={{ color: isDarkMode ? '$white' : '' }}
                {...register('endDate')}
              />
            </TextInputRoot>
          </LabelInput>
        </ContainerGrid>

        <ButtonRoot align="center" wid="full" variant="noShadow" size="sm">
          <ButtonIcon>
            <FilePlus />
          </ButtonIcon>

          <ButtonLabel>Criar linha do tempo</ButtonLabel>
        </ButtonRoot>
      </NewToDoTimeLineForm>
    </ModalContent>
  )
}
