import { IError } from '@@types/errors/IError'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Checkbox } from '@components/usefull/Checkbox'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { LabelInput } from '@components/usefull/LabelInput'
import { ModalContent } from '@components/usefull/ModalContent'
import { Text } from '@components/usefull/Text'
import { Textarea } from '@components/usefull/Textarea'
import { ToastError } from '@components/usefull/ToastError'
import { InterfaceContext } from '@contexts/interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProject } from '@hooks/useProject'
import { useProjects } from '@hooks/useProjects'
import {
  ArrowDown,
  Calendar,
  CaretUp,
  CircleWavyCheck,
  IdentificationCard,
  PlusCircle,
} from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  NewPersonForm,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from './styles'

const newPersonFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'O nome precisa ter pelo menos dois caracteres' })
    .max(100, { message: 'O nome não pode ter mais de 100 caracteres' }),
  lastName: z
    .string()
    .min(2, { message: 'O sobrenome precisa ter pelo menos dois caracteres' })
    .max(100, { message: 'O sobrenome não pode ter mais de 100 caracteres' }),
  age: z.coerce
    .number({
      invalid_type_error: 'Coloque apenas números na idade do personagem.',
    })
    .max(1000000000000)
    .nullable(),
  bornMonth: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no mês.' })
    .min(0, { message: 'O mês precisa ser maior ou igual à 0' })
    .max(12, { message: 'Existem apenas 12 meses no ano' })
    .optional()
    .nullable(),
  bornDay: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no dia.' })
    .min(0, { message: 'O dia precisa ser maior ou igual à 0' })
    .max(31, { message: 'Existem apenas 31 dias no mês' })
    .optional()
    .nullable(),
  bornHour: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números na hora.' })
    .min(0, { message: 'A hora precisa ser maior ou igual à 0' })
    .max(24, { message: 'Existem apenas 24 horas no dia' })
    .optional()
    .nullable(),
  bornMinute: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no minuto.' })
    .min(0, { message: 'Os minutos precisam ser maior ou igual à 0' })
    .max(60, { message: 'Existem apenas 60 minutos em uma hora' })
    .optional()
    .nullable(),
  bornSecond: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no segundo.' })
    .min(0, { message: 'Os segundos precisam ser maior ou igual à 0' })
    .max(60, { message: 'Existem apenas 60 segundos em um minuto' })
    .optional()
    .nullable(),
  history: z
    .string()
    .min(1, { message: 'Coloque a história do personagem para prosseguir.' }),
})

type NewPersonFormData = z.infer<typeof newPersonFormSchema>

interface INewPersonModalProps {
  projectId?: string
  onSuccess?: () => void
}

export function NewPersonModal({ onSuccess, projectId }: INewPersonModalProps) {
  const [projectSelected, setProjectSelected] = useState('')
  const [unknownAge, setUnknownAge] = useState(false)
  const [error, setError] = useState<IError | null>(null)

  const { theme } = useContext(InterfaceContext)

  const isDarkMode = theme === 'dark'

  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue,
    setError: setErrorForm,
  } = useForm<NewPersonFormData>({
    resolver: zodResolver(newPersonFormSchema),
    defaultValues: {
      bornMonth: 0,
      bornDay: 0,
      bornHour: 0,
      bornMinute: 0,
      bornSecond: 0,
    },
  })

  const { projectsEditablePerUser } = useProjects()
  const { project, callEvent } = useProject(projectId ?? projectSelected)

  async function handleNewPerson(data: NewPersonFormData) {
    if (!projectId && !projectSelected) {
      setErrorForm('name', { message: 'Selecione um projeto' })
      setErrorForm('lastName', { message: 'Selecione um projeto' })
      setErrorForm('age', { message: 'Selecione um projeto' })
      setErrorForm('history', { message: 'Selecione um projeto' })
      setErrorForm('bornMonth', { message: 'Selecione um projeto' })
      setErrorForm('bornDay', { message: 'Selecione um projeto' })
      setErrorForm('bornHour', { message: 'Selecione um projeto' })
      setErrorForm('bornMinute', { message: 'Selecione um projeto' })
      setErrorForm('bornSecond', { message: 'Selecione um projeto' })

      return
    }

    const bornMonth = data.bornMonth?.toString().padStart(2, '0') || '00'
    const bornDay = data.bornDay?.toString().padStart(2, '0') || '00'
    const bornHour = data.bornHour?.toString().padStart(2, '0') || '00'
    const bornMinute = data.bornMinute?.toString().padStart(2, '0') || '00'
    const bornSecond = data.bornSecond?.toString().padStart(2, '0') || '00'

    const newPerson = {
      name: data.name,
      lastName: data.lastName,
      age: data.age,
      history: data.history,
      projectId: projectId || projectSelected,
      bornMonth,
      bornDay,
      bornHour,
      bornMinute,
      bornSecond,
    }

    const { resolved, error } = await callEvent.createPerson(newPerson)

    if (error) {
      setError(error)
    }

    if (!resolved) return

    onSuccess && onSuccess()
    reset()
  }

  useEffect(() => {
    if (unknownAge) {
      setValue('age', null)
    }
  }, [unknownAge, setValue])

  return (
    <ModalContent
      sizeWid="lg"
      title={`Novo personagem ${
        !projectId && ` --> ${project ? project.name : 'Selecione um projeto'}`
      }`}
    >
      <ToastError error={error} setError={setError} />
      <NewPersonForm
        onSubmit={handleSubmit(handleNewPerson)}
        darkMode={isDarkMode}
      >
        <ContainerGrid padding={0} columns={1}>
          {!projectId && (
            <Text as="label">
              <Text
                family="body"
                size="sm"
                css={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                }}
              >
                Projeto
                <SelectRoot onValueChange={(e) => setProjectSelected(e)}>
                  <SelectTrigger aria-label="Projetos" darkMode={isDarkMode}>
                    <SelectIcon>
                      <ArrowDown />
                    </SelectIcon>

                    <SelectValue placeholder="Selecione um projeto" />
                  </SelectTrigger>

                  <SelectPortal>
                    <SelectContent darkMode={isDarkMode}>
                      <SelectScrollUpButton asChild>
                        <CaretUp fontWeight="bold" size={18} />
                      </SelectScrollUpButton>

                      <SelectViewport>
                        {projectsEditablePerUser.map((project) => {
                          if (!project) return ''

                          return (
                            <SelectItem key={project.id} value={project.id}>
                              <SelectItemText>{project.name}</SelectItemText>

                              <SelectItemIndicator>
                                <CircleWavyCheck />
                              </SelectItemIndicator>
                            </SelectItem>
                          )
                        })}
                      </SelectViewport>
                    </SelectContent>
                  </SelectPortal>
                </SelectRoot>
              </Text>
            </Text>
          )}

          <LabelInput label="Nome" error={formState.errors.name?.message}>
            <TextInputRoot
              size="sm"
              variant={formState.errors.name?.message ? 'denied' : 'default'}
              css={{ background: !isDarkMode ? '$base600' : '' }}
            >
              <TextInputIcon>
                <IdentificationCard weight="bold" />
              </TextInputIcon>

              <TextInputInput
                placeholder="Nome do personagem"
                {...register('name')}
              />
            </TextInputRoot>
          </LabelInput>

          <LabelInput
            label="Sobrenome"
            error={formState.errors.lastName?.message}
          >
            <TextInputRoot
              size="sm"
              variant={
                formState.errors.lastName?.message ? 'denied' : 'default'
              }
              css={{ background: !isDarkMode ? '$base600' : '' }}
            >
              <TextInputIcon>
                <IdentificationCard weight="bold" />
              </TextInputIcon>

              <TextInputInput
                placeholder="Sobrenome do personagem"
                {...register('lastName')}
              />
            </TextInputRoot>
          </LabelInput>

          <ContainerGrid padding={0} css={{ justifyContent: 'start' }}>
            <LabelInput label="Idade" error={formState.errors.age?.message}>
              <TextInputRoot
                size="sm"
                variant={formState.errors.age?.message ? 'denied' : 'default'}
                css={{ background: !isDarkMode ? '$base600' : '' }}
              >
                <TextInputIcon>
                  <Calendar weight="bold" />
                </TextInputIcon>

                <TextInputInput
                  disabled={unknownAge}
                  placeholder={unknownAge ? '??????' : 'Idade do personagem'}
                  {...register('age')}
                />
              </TextInputRoot>
            </LabelInput>

            <LabelInput label="Idade desconhecida">
              <Checkbox
                checked={unknownAge}
                onCheckedChange={() => setUnknownAge(!unknownAge)}
              />
            </LabelInput>
          </ContainerGrid>

          {project?.features.timeLines && (
            <ContainerGrid padding={0} columns={5}>
              <LabelInput
                label="Mês do nascimento (opcional)"
                error={formState.errors?.bornMonth?.message}
              >
                <TextInputRoot
                  size="sm"
                  variant={
                    formState.errors.bornMonth?.message ? 'denied' : 'default'
                  }
                  css={{ background: !isDarkMode ? '$base600' : '' }}
                >
                  <TextInputInput
                    placeholder="Mês do nascimento"
                    {...register('bornMonth')}
                  />
                </TextInputRoot>
              </LabelInput>

              <LabelInput
                label="
                Dia do nascimento (opcional)
                "
                error={formState.errors?.bornDay?.message}
              >
                <TextInputRoot
                  size="sm"
                  variant={
                    formState.errors.bornDay?.message ? 'denied' : 'default'
                  }
                  css={{ background: !isDarkMode ? '$base600' : '' }}
                >
                  <TextInputInput
                    placeholder="Dia do nascimento"
                    {...register('bornDay')}
                  />
                </TextInputRoot>
              </LabelInput>

              <LabelInput
                label="Hora do nascimento (opcional)"
                error={formState.errors?.bornHour?.message}
              >
                {' '}
                <TextInputRoot
                  size="sm"
                  variant={
                    formState.errors.bornHour?.message ? 'denied' : 'default'
                  }
                  css={{ background: !isDarkMode ? '$base600' : '' }}
                >
                  <TextInputInput
                    placeholder="Hora do nascimento"
                    {...register('bornHour')}
                  />
                </TextInputRoot>{' '}
              </LabelInput>

              <LabelInput
                label="Minuto do nascimento (opcional)"
                error={formState.errors?.bornMinute?.message}
              >
                {' '}
                <TextInputRoot
                  size="sm"
                  variant={
                    formState.errors.bornMinute?.message ? 'denied' : 'default'
                  }
                  css={{ background: !isDarkMode ? '$base600' : '' }}
                >
                  <TextInputInput
                    placeholder="Minuto do nascimento"
                    {...register('bornMinute')}
                  />
                </TextInputRoot>
              </LabelInput>

              <LabelInput
                label="Segundo do nascimento (opcional)"
                error={formState.errors?.bornSecond?.message}
              >
                <TextInputRoot
                  size="sm"
                  variant={
                    formState.errors.bornSecond?.message ? 'denied' : 'default'
                  }
                  css={{ background: !isDarkMode ? '$base600' : '' }}
                >
                  <TextInputInput
                    placeholder="Segundo do nascimento"
                    {...register('bornSecond')}
                  />
                </TextInputRoot>
              </LabelInput>
            </ContainerGrid>
          )}
        </ContainerGrid>

        <ContainerGrid padding={0}>
          <Text as="label">
            <Text
              family="body"
              size="sm"
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              História
              <Text
                as="span"
                family="body"
                size="sm"
                css={{ color: '$errorDefault', float: 'right' }}
              >
                {formState.errors?.history?.message}
              </Text>
            </Text>

            <Textarea
              css={{ width: '100%', background: !isDarkMode ? '$base600' : '' }}
              variant={formState.errors.history?.message ? 'denied' : 'default'}
              placeholder="História do personagem"
              {...register('history')}
            />
          </Text>
        </ContainerGrid>

        <ButtonRoot
          size="sm"
          type="submit"
          align="center"
          disabled={formState.isSubmitting}
        >
          <ButtonIcon>
            <PlusCircle weight="bold" />
          </ButtonIcon>

          <ButtonLabel>Criar</ButtonLabel>
        </ButtonRoot>
      </NewPersonForm>
    </ModalContent>
  )
}
