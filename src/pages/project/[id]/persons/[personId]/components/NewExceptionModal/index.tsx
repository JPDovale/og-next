import { ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { LabelInput } from '@components/usefull/LabelInput'
import { ModalContent } from '@components/usefull/ModalContent'
import { Textarea } from '@components/usefull/Textarea'
import { InterfaceContext } from '@contexts/interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { NewExceptionForm } from './styles'

const newExceptionBodySchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O titulo precisa ter pelo menos 2 caracteres' })
    .max(90, { message: 'O titulo não pode ter mais de 90 caracteres' }),

  description: z
    .string()
    .min(2, { message: 'A descrição precisa ter pelo menos 2 caracteres' })
    .max(1000, { message: 'A descrição não pode ter mais de 1000 caracteres' }),
})

type newExceptionData = z.infer<typeof newExceptionBodySchema>

interface INewExceptionModalProps {
  onSubmit: (data: newExceptionData) => void
}

export function NewExceptionModal({ onSubmit }: INewExceptionModalProps) {
  const { theme } = useContext(InterfaceContext)

  const isDarkMode = theme === 'dark'

  const { handleSubmit, register, reset, formState } =
    useForm<newExceptionData>({
      resolver: zodResolver(newExceptionBodySchema),
    })

  function handleCreateException(data: newExceptionData) {
    reset()
    onSubmit(data)
  }

  return (
    <ModalContent title={`Nova exceção`}>
      <NewExceptionForm darkMode={isDarkMode}>
        <LabelInput
          error={formState.errors.title?.message}
          label="Titulo da exceção"
        >
          <TextInputRoot
            css={{ background: !isDarkMode ? '$gray500' : '', color: '$white' }}
          >
            <TextInputInput
              placeholder="Titulo exemplo"
              {...register('title')}
            />
          </TextInputRoot>
        </LabelInput>

        <LabelInput
          error={formState.errors.title?.message}
          label="Descrição da exceção"
        >
          <Textarea
            css={{ background: !isDarkMode ? '$gray500' : '', color: '$white' }}
            placeholder="Descrição exemplo"
            {...register('description')}
          />
        </LabelInput>

        <ButtonRoot
          align="center"
          variant="noShadow"
          type="button"
          onClick={handleSubmit(handleCreateException)}
        >
          <ButtonLabel>Criar exceção</ButtonLabel>
        </ButtonRoot>
      </NewExceptionForm>
    </ModalContent>
  )
}
