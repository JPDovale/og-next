import { IError } from '@@types/errors/IError'
import { ICreateBookDTO } from '@api/dtos/booksDTOS/ICreateBookDTO'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { ModalContent } from '@components/usefull/ModalContent'
import { MultiStep } from '@components/usefull/MultiStep'
import { ToastError } from '@components/usefull/ToastError'
import { InterfaceContext } from '@contexts/interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProject } from '@hooks/useProject'
import { useRouter } from 'next/router'
import { ArrowLeft, ArrowRight } from 'phosphor-react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { NewBookStep1 } from '../NewBookStep1'
import { NewBookStep2 } from '../NewBookStep2'
import { NewBookStep3 } from '../NewBookStep3'
import { NewBookContainer, NewBookForm } from './styles'

const newBookSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'O campo é obrigatório.' })
    .max(100, { message: 'O titulo não pode ter mais de 100 caracteres.' }),
  subtitle: z
    .string()
    .max(100, { message: 'O subtitulo não pode ter mais de 100 caracteres.' })
    .optional(),
  literaryGenre: z
    .string()
    .min(1, { message: 'O campo é obrigatório.' })
    .max(200, {
      message: 'O gênero literário não pode ter mais de 100 caracteres.',
    }),
  words: z.coerce
    .number({ description: 'Insira apenas números' })
    .max(10000000, { message: 'Valor excede o limite aceito' })
    .optional(),
  writtenWords: z.coerce
    .number({ description: 'Insira apenas números' })
    .max(10000000, { message: 'Valor excede o limite aceito' })
    .optional(),
  isbn: z.string().max(200, { message: 'Seu isbn é inválido' }).optional(),
})

export type newBookFormData = z.infer<typeof newBookSchema>
type fieldNames =
  | 'title'
  | 'subtitle'
  | 'literaryGenre'
  | 'words'
  | 'writtenWords'
  | 'isbn'

interface IErrorsInFields {
  errorMessage?: string | undefined
  errorField?: fieldNames
}

interface INewBookModalProps {
  openToast: () => void
  onSuccess: () => void
}

export function NewBookModal({ openToast, onSuccess }: INewBookModalProps) {
  const { theme } = useContext(InterfaceContext)
  const [error, setError] = useState<IError | null>(null)
  const [step, setStep] = useState(1)

  const {
    clearErrors,
    handleSubmit,
    setError: setErrorForm,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<newBookFormData>({
    resolver: zodResolver(newBookSchema),
  })

  const router = useRouter()
  const { id } = router.query

  const { callEvent, usersWithPermissionEdit, project } = useProject(
    id as string,
  )

  const isDarkMode = theme === 'dark'

  async function validateFormToNextStep(
    fields: fieldNames[],
  ): Promise<boolean> {
    const validate = await control._executeSchema(fields)

    const errorsInFields: IErrorsInFields[] = fields.map((field) => {
      const errorExiste = validate.errors[field]

      if (!errorExiste)
        return {
          errorField: undefined,
          errorMessage: undefined,
        }

      return { errorField: field, errorMessage: errorExiste.message as string }
    })

    errorsInFields.forEach((error) => {
      if (!error?.errorMessage || !error?.errorField) return

      setErrorForm(error.errorField, { message: error.errorMessage })
    })

    const isValid = !errorsInFields.find(
      (error) =>
        error.errorField !== undefined && error.errorMessage !== undefined,
    )
    return isValid
  }

  function previousStep() {
    if (step <= 1) return

    setStep(step - 1)
  }

  async function nextStep() {
    clearErrors()
    let isValid: boolean = false

    switch (step) {
      case 1: {
        isValid = await validateFormToNextStep(['title', 'subtitle'])
        break
      }
      case 2: {
        isValid = await validateFormToNextStep(['words', 'writtenWords'])
        break
      }
      case 3: {
        isValid = await validateFormToNextStep(['literaryGenre', 'isbn'])
        break
      }
      default:
        break
    }

    if (step >= 4 || !isValid) return

    setStep(step + 1)
  }

  async function handleCreateBook(data: newBookFormData) {
    const newBook: ICreateBookDTO = {
      literaryGenre: data.literaryGenre,
      title: data.title,
      subtitle: data.subtitle,
      authors: [{ user_id: project!.user.id }],
      isbn: data.isbn,
      words: data.words,
      writtenWords: data.writtenWords,
    }

    usersWithPermissionEdit.map((user) =>
      newBook.authors.push({ user_id: user.id }),
    )

    const { resolved, error } = await callEvent.createBook(newBook)

    if (error) {
      setError(error)
    }

    if (resolved) {
      reset()
      setStep(1)
      openToast()
      onSuccess()
    }
  }

  return (
    <ModalContent>
      <ToastError error={error} setError={setError} />

      <NewBookContainer darkMode={isDarkMode}>
        <MultiStep size={3} currentStep={step} title="Novo livro" />

        <NewBookForm onSubmit={handleSubmit(handleCreateBook)}>
          {step === 1 && (
            <NewBookStep1
              isDarkMode={isDarkMode}
              register={register}
              errors={errors}
            />
          )}
          {step === 2 && (
            <NewBookStep2
              isDarkMode={isDarkMode}
              register={register}
              errors={errors}
            />
          )}
          {step === 3 && (
            <NewBookStep3
              isDarkMode={isDarkMode}
              register={register}
              errors={errors}
            />
          )}

          {step === 3 && (
            <ContainerGrid css={{ marginTop: '$4' }} padding={0} columns={2}>
              <ButtonRoot
                type="button"
                size="xs"
                variant="noShadow"
                align="center"
                onClick={previousStep}
              >
                <ButtonIcon>
                  <ArrowLeft />
                </ButtonIcon>

                <ButtonLabel>Anterior</ButtonLabel>
              </ButtonRoot>

              <ButtonRoot
                type="submit"
                wid="full"
                align="center"
                size="xs"
                variant="noShadow"
                disabled={isSubmitting}
                onClick={() => clearErrors()}
              >
                <ButtonLabel>Criar livro</ButtonLabel>
              </ButtonRoot>
            </ContainerGrid>
          )}
        </NewBookForm>

        {step !== 3 && (
          <ContainerGrid padding={0} columns={2}>
            <ButtonRoot
              disabled={step === 1}
              size="xs"
              variant="noShadow"
              align="center"
              onClick={previousStep}
            >
              <ButtonIcon>
                <ArrowLeft />
              </ButtonIcon>

              <ButtonLabel>Anterior</ButtonLabel>
            </ButtonRoot>

            <ButtonRoot
              size="xs"
              variant="noShadow"
              align="center"
              onClick={nextStep}
            >
              <ButtonLabel>Próximo</ButtonLabel>

              <ButtonIcon>
                <ArrowRight />
              </ButtonIcon>
            </ButtonRoot>
          </ContainerGrid>
        )}
      </NewBookContainer>
    </ModalContent>
  )
}
