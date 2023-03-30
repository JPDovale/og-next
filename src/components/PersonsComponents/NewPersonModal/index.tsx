import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { ModalContent } from '@components/usefull/ModalContent'
import { Text } from '@components/usefull/Text'
import { Textarea } from '@components/usefull/Textarea'
import { ProjectsContext } from '@contexts/projects'
import { UserContext } from '@contexts/user'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowDown,
  Calendar,
  CircleWavyCheck,
  IdentificationCard,
  PlusCircle,
} from 'phosphor-react'
import { useContext, useState } from 'react'
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
  age: z.string().regex(/^([0-9]+)$/, {
    message: 'Coloque apenas números na idade do personagem.',
  }),
  birthHour: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números na hora.' })
    // .regex(/^([0-9]+)$/, {
    //   message: 'Coloque apenas números na hora.',
    // })
    .min(0, { message: 'A hora precisa ser maior ou igual à 0' })
    .max(24, { message: 'Existem apenas 24 horas no dia' })
    .optional()
    .nullable(),
  birthMinute: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no minuto.' })
    // .regex(/^([0-9]+)$/, {
    //   message: 'Coloque apenas números no minuto.',
    // })
    .min(0, { message: 'Os minutos precisam ser maior ou igual à 0' })
    .max(60, { message: 'Existem apenas 60 minutos em uma hora' })
    .optional()
    .nullable(),
  birthSecond: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no segundo.' })
    // .regex(/^([0-9]+)$/, {
    //   message: 'Coloque apenas números no segundo.',
    // })
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
  const { createNewPerson, projects } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const { register, handleSubmit, formState, reset, setError } =
    useForm<NewPersonFormData>({
      resolver: zodResolver(newPersonFormSchema),
      defaultValues: {
        birthHour: 0,
        birthMinute: 0,
        birthSecond: 0,
      },
    })

  const infosProjectSelected = projects.find(
    (project) => project.id === projectSelected,
  )

  const projectsEditablePerUser = projects.map((project) => {
    const userPermission = project.users.find((u) => u.id === user?.id)

    if (userPermission?.permission !== 'edit') {
      return undefined
    }

    return project
  })

  async function handleNewPerson(data: NewPersonFormData) {
    if (!projectId && !projectSelected) {
      setError('name', { message: 'Selecione um projeto' })
      setError('lastName', { message: 'Selecione um projeto' })
      setError('age', { message: 'Selecione um projeto' })
      setError('history', { message: 'Selecione um projeto' })
      setError('birthHour', { message: 'Selecione um projeto' })
      setError('birthMinute', { message: 'Selecione um projeto' })
      setError('birthSecond', { message: 'Selecione um projeto' })

      return
    }

    const birthHour = data.birthHour?.toString().padStart(2, '0') || '00'
    const birthMinute = data.birthMinute?.toString().padStart(2, '0') || '00'
    const birthSecond = data.birthSecond?.toString().padStart(2, '0') || '00'

    const birthInHour = `${birthHour}:${birthMinute}:${birthSecond}`

    const newPerson = {
      name: data.name,
      lastName: data.lastName,
      age: data.age,
      history: data.history,
      projectId: projectId || projectSelected,
      birthHour: birthInHour,
    }

    const success = await createNewPerson(newPerson)

    if (!success) return

    onSuccess && onSuccess()
    reset()
  }

  return (
    <ModalContent
      sizeWid="lg"
      title={`Novo personagem ${
        !projectId &&
        ` --> ${
          infosProjectSelected
            ? infosProjectSelected.name
            : 'Selecione um projeto'
        }`
      }`}
    >
      <NewPersonForm onSubmit={handleSubmit(handleNewPerson)}>
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
                  <SelectTrigger aria-label="Projetos">
                    <SelectIcon>
                      <ArrowDown />
                    </SelectIcon>

                    <SelectValue placeholder="Selecione um projeto" />
                  </SelectTrigger>

                  <SelectPortal>
                    <SelectContent>
                      <SelectScrollUpButton />

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

          <Text as="label">
            <Text
              family="body"
              size="sm"
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              Nome
              <Text
                as="span"
                family="body"
                size="sm"
                css={{ color: '$errorDefault', float: 'right' }}
              >
                {formState.errors?.name?.message}
              </Text>
            </Text>

            <TextInputRoot
              variant={formState.errors.name?.message ? 'denied' : 'default'}
            >
              <TextInputIcon>
                <IdentificationCard weight="bold" />
              </TextInputIcon>

              <TextInputInput
                placeholder="Nome do personagem"
                {...register('name')}
              />
            </TextInputRoot>
          </Text>

          <Text as="label">
            <Text
              family="body"
              size="sm"
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              Sobrenome
              <Text
                as="span"
                family="body"
                size="sm"
                css={{ color: '$errorDefault', float: 'right' }}
              >
                {formState.errors?.lastName?.message}
              </Text>
            </Text>

            <TextInputRoot
              variant={
                formState.errors.lastName?.message ? 'denied' : 'default'
              }
            >
              <TextInputIcon>
                <IdentificationCard weight="bold" />
              </TextInputIcon>

              <TextInputInput
                placeholder="Sobrenome do personagem"
                {...register('lastName')}
              />
            </TextInputRoot>
          </Text>

          <Text as="label">
            <Text
              family="body"
              size="sm"
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              Idade
              <Text
                as="span"
                family="body"
                size="sm"
                css={{ color: '$errorDefault', float: 'right' }}
              >
                {formState.errors?.age?.message}
              </Text>
            </Text>

            <TextInputRoot
              variant={formState.errors.age?.message ? 'denied' : 'default'}
            >
              <TextInputIcon>
                <Calendar weight="bold" />
              </TextInputIcon>

              <TextInputInput
                placeholder="Idade do personagem"
                {...register('age')}
              />
            </TextInputRoot>
          </Text>

          <ContainerGrid padding={0} columns={3}>
            <Text as="label">
              <Text
                family="body"
                size="sm"
                css={{ display: 'flex', justifyContent: 'space-between' }}
              >
                Hora do nascimento
                <Text
                  as="span"
                  family="body"
                  size="sm"
                  css={{ color: '$errorDefault', float: 'right' }}
                >
                  {formState.errors?.birthHour?.message}
                </Text>
              </Text>

              <TextInputRoot
                variant={
                  formState.errors.birthHour?.message ? 'denied' : 'default'
                }
              >
                <TextInputInput
                  placeholder="Hora do nascimento"
                  {...register('birthHour')}
                />
              </TextInputRoot>
            </Text>

            <Text as="label">
              <Text
                family="body"
                size="sm"
                css={{ display: 'flex', justifyContent: 'space-between' }}
              >
                Minuto do nascimento
                <Text
                  as="span"
                  family="body"
                  size="sm"
                  css={{ color: '$errorDefault', float: 'right' }}
                >
                  {formState.errors?.birthMinute?.message}
                </Text>
              </Text>

              <TextInputRoot
                variant={
                  formState.errors.birthMinute?.message ? 'denied' : 'default'
                }
              >
                <TextInputInput
                  placeholder="Minuto do nascimento"
                  {...register('birthMinute')}
                />
              </TextInputRoot>
            </Text>

            <Text as="label">
              <Text
                family="body"
                size="sm"
                css={{ display: 'flex', justifyContent: 'space-between' }}
              >
                Segundo do nascimento
                <Text
                  as="span"
                  family="body"
                  size="sm"
                  css={{ color: '$errorDefault', float: 'right' }}
                >
                  {formState.errors?.birthSecond?.message}
                </Text>
              </Text>

              <TextInputRoot
                variant={
                  formState.errors.birthSecond?.message ? 'denied' : 'default'
                }
              >
                <TextInputInput
                  placeholder="Segundo do nascimento"
                  {...register('birthSecond')}
                />
              </TextInputRoot>
            </Text>
          </ContainerGrid>
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
              css={{ width: '100%' }}
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
