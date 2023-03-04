import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { ModalContent } from '@components/usefull/ModalContent'
import { MultiStep } from '@components/usefull/MultiStep'
import { ProjectsContext } from '@contexts/projects'
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
import { NewBookStep4 } from '../NewBookStep4'
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
  literaryGenere: z
    .string()
    .min(1, { message: 'O campo é obrigatório.' })
    .max(200, {
      message: 'O gênero literário não pode ter mais de 100 caracteres.',
    }),
  words: z
    .string()
    .max(20, { message: 'Valor excede o limite aceito' })
    .regex(/^\d+$/, { message: 'Insira apenas números' })
    .optional(),
  writtenWords: z
    .string()
    .max(20, { message: 'Valor excede o limite aceito' })
    .regex(/^\d+$/, { message: 'Insira apenas números' })
    .optional(),
  generes: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, { message: 'O nome do gênero é obrigatório' })
          .max(150, {
            message: 'O gênero não pode ter mais de 150 caracteres',
          }),
      }),
    )
    .min(1, { message: 'O livro precisa ter pelo menos um subgênero' })
    .max(6, {
      message:
        'Não é aconselhável que um livro tenha muitos subgêneros, por esse motivo, limitamos o número de subgêneros para 6',
    }),
  isbn: z.string().max(200, { message: 'Seu isbn é inválido' }).optional(),
})

export type newBookFormData = z.infer<typeof newBookSchema>
type fieldNames =
  | 'title'
  | 'subtitle'
  | 'literaryGenere'
  | 'words'
  | 'writtenWords'
  | 'generes'
  | 'isbn'
  | `generes.${number}`
  | `generes.${number}.name`

interface IErrorsInFields {
  errorMessage?: string | undefined
  errorField?: fieldNames
}

interface INewBookModalProps {
  openToast: () => void
}

export function NewBookModal({ openToast }: INewBookModalProps) {
  const [step, setStep] = useState(1)

  const { createBook } = useContext(ProjectsContext)

  const {
    watch,
    clearErrors,
    handleSubmit,
    setValue,
    setError,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<newBookFormData>({
    resolver: zodResolver(newBookSchema),
  })

  const form = watch()

  const router = useRouter()
  const { id } = router.query

  const { project } = useProject(id as string)

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

      setError(error.errorField, { message: error.errorMessage })
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
        isValid = await validateFormToNextStep(['literaryGenere', 'isbn'])
        break
      }
      default:
        break
    }

    if (step >= 4 || !isValid) return

    setStep(step + 1)
  }

  async function handleCreateBook(data: newBookFormData) {
    const created = await createBook({ newBook: data, project })

    if (created) {
      router.push(`/project/${id}/books`)
      reset()
      setStep(1)
      openToast()
    }
  }

  return (
    <ModalContent>
      <NewBookContainer>
        <MultiStep size={4} currentStep={step} title="Novo livro" />

        <NewBookForm onSubmit={handleSubmit(handleCreateBook)}>
          {step === 1 && <NewBookStep1 register={register} errors={errors} />}
          {step === 2 && <NewBookStep2 register={register} errors={errors} />}
          {step === 3 && <NewBookStep3 register={register} errors={errors} />}
          {step === 4 && (
            <NewBookStep4
              errors={errors}
              generes={form.generes}
              setError={setError}
              setValue={setValue}
            />
          )}

          {step === 4 && (
            <ContainerGrid padding={0} columns={2}>
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

        {step !== 4 && (
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
