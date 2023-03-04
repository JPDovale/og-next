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
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, IdentificationCard, PlusCircle } from 'phosphor-react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { NewPersonForm } from './styles'

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
  history: z
    .string()
    .min(1, { message: 'Coloque a história do personagem para prosseguir.' }),
})

type NewPersonFormData = z.infer<typeof newPersonFormSchema>

interface INewPersonModalProps {
  projectId: string
  onSuccess: () => void
}

export function NewPersonModal({ onSuccess, projectId }: INewPersonModalProps) {
  const { createNewPerson } = useContext(ProjectsContext)

  const { register, handleSubmit, formState, reset } =
    useForm<NewPersonFormData>({
      resolver: zodResolver(newPersonFormSchema),
    })

  async function handleNewPerson(data: NewPersonFormData) {
    const newPerson = {
      name: data.name,
      lastName: data.lastName,
      age: data.age,
      history: data.history,
      projectId,
    }

    const success = await createNewPerson(newPerson)

    if (!success) return

    onSuccess()
    reset()
  }

  return (
    <ModalContent sizeWid="lg" title="Novo personagem">
      <NewPersonForm onSubmit={handleSubmit(handleNewPerson)}>
        <ContainerGrid padding={0} columns={3}>
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
