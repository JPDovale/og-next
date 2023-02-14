import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, Text, Textarea } from '@og-ui/react'
import { FilePlus, UserCircleMinus, UserCirclePlus, X } from 'phosphor-react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ICreateSceneRequest } from '../../../../../../../../../api/booksRequests/types/ICreateSceneRequest'
import { ICapitule } from '../../../../../../../../../api/responsesTypes/IBooksResponse'
import { Avatares } from '../../../../../../../../../components/Avatares'
import { ContainerGrid } from '../../../../../../../../../components/usefull/ContainerGrid'
import { ProjectsContext } from '../../../../../../../../../contexts/projects'
import { useProject } from '../../../../../../../../../hooks/useProject'
import { InputContainer } from '../../styles'
import { AddSceneContainer, AvataresContainer, CloseButton } from './styles'

interface IAddSceneProps {
  capitule: ICapitule
  bookId: string
  projectId: string
  onClose: () => void
}

const createSceneSchema = z.object({
  objective: z.string().min(1, { message: 'O campo é obrigatório!' }).max(600, {
    message: 'O objetivo do capítulo não pode exceder 600 caracteres',
  }),
  act1: z
    .string()
    .min(1, { message: 'O campo é obrigatório!' })
    .max(10000, { message: 'O campo não pode exceder 10000 caracteres' })
    .regex(/^[^<>{}\\]+$/, { message: 'Não coloque caracteres especiais' }),
  act2: z
    .string()
    .min(1, { message: 'O campo é obrigatório!' })
    .max(10000, { message: 'O campo não pode exceder 10000 caracteres' })
    .regex(/^[^<>{}\\]+$/, { message: 'Não coloque caracteres especiais' }),
  act3: z
    .string()
    .min(1, { message: 'O campo é obrigatório!' })
    .max(10000, { message: 'O campo não pode exceder 10000 caracteres' })
    .regex(/^[^<>{}\\]+$/, { message: 'Não coloque caracteres especiais' }),
  persons: z
    .array(z.string().min(6).max(100))
    .min(1, { message: 'Você precisa selecionar pelo menos um personagem!' }),
})

type createSceneBodyData = z.infer<typeof createSceneSchema>

export function AddScene({
  projectId,
  bookId,
  capitule,
  onClose,
}: IAddSceneProps) {
  const { createScene } = useContext(ProjectsContext)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<createSceneBodyData>({
    resolver: zodResolver(createSceneSchema),
  })
  const selectedPersonsIds = watch('persons')

  const { personsThisProject, findManyPersons } = useProject(projectId)

  const selectedPersons = findManyPersons(selectedPersonsIds)
  const unselectedPersons = findManyPersons(selectedPersonsIds, {
    reverse: true,
  })

  async function handleCreateScene(data: createSceneBodyData) {
    const newScene: ICreateSceneRequest = {
      bookId,
      capituleId: capitule.id!,
      objective: data.objective,
      persons: data.persons,
      structure: {
        act1: data.act1,
        act2: data.act2,
        act3: data.act3,
      },
    }

    const isCreated = await createScene(newScene)
    if (isCreated) {
      onClose()
    }
  }

  function handleSelectPerson(id: string) {
    const ids = selectedPersonsIds || []

    setValue('persons', [...ids, id])
  }

  function handleRemovePerson(id: string) {
    const filteredPersonsIds = selectedPersonsIds.filter((i) => i !== id)

    setValue('persons', [...filteredPersonsIds])
  }

  return (
    <AddSceneContainer onSubmit={handleSubmit(handleCreateScene)}>
      <Heading size="sm">Cena {capitule.scenes?.length! + 1}</Heading>
      <CloseButton type="button" onClick={onClose}>
        <X size={24} />
      </CloseButton>

      <InputContainer>
        <Text family="body" size="sm">
          Objetivo da cena
          <Text as="span" family="body" size="sm">
            {errors.objective?.message}
          </Text>
        </Text>

        <Textarea
          css={{ width: '100%', boxShadow: 'none' }}
          {...register('objective')}
        />
      </InputContainer>

      <ContainerGrid columns={3}>
        <InputContainer>
          <Text family="body" size="sm">
            Estrutura da cena: Ato 1
            <Text as="span" family="body" size="sm">
              {errors.act1?.message}
            </Text>
          </Text>

          <Textarea
            css={{ width: '100%', boxShadow: 'none' }}
            {...register('act1')}
          />
        </InputContainer>

        <InputContainer>
          <Text family="body" size="sm">
            Estrutura da cena: Ato 2
            <Text as="span" family="body" size="sm">
              {errors.act2?.message}
            </Text>
          </Text>

          <Textarea
            css={{ width: '100%', boxShadow: 'none' }}
            {...register('act2')}
          />
        </InputContainer>

        <InputContainer>
          <Text family="body" size="sm">
            Estrutura da cena: Ato 3
            <Text as="span" family="body" size="sm">
              {errors.act3?.message}
            </Text>
          </Text>

          <Textarea
            css={{ width: '100%', boxShadow: 'none' }}
            {...register('act3')}
          />
        </InputContainer>
      </ContainerGrid>

      <AvataresContainer>
        <Text family="body" size="sm" css={{ marginBottom: '-$8' }}>
          Selecione os personagens presentes na cena:
        </Text>

        <Avatares
          size="xsm"
          listEmptyMessage={
            personsThisProject && personsThisProject[0]
              ? 'Você selecionou todos os personagens já criados'
              : 'Você ainda não criou nenhum personagem'
          }
          persons={unselectedPersons}
          columns={12}
          functionInternalButton={handleSelectPerson}
          internalButtonIcon={<UserCirclePlus />}
        />
      </AvataresContainer>

      <AvataresContainer>
        <Text family="body" size="sm" css={{ marginBottom: '-$8' }}>
          Personagens presentes na cena:
          <Text as="span" family="body" size="sm">
            {errors.persons?.message}
          </Text>
        </Text>

        <Avatares
          listEmptyMessage="Você ainda não selecionou nenhum personagem"
          persons={selectedPersons}
          columns={12}
          functionInternalButton={(id) => handleRemovePerson(id)}
          internalButtonIcon={<UserCircleMinus />}
        />
      </AvataresContainer>

      <Button
        type="submit"
        label="Criar cena"
        align="center"
        disabled={isSubmitting || !isDirty}
        css={{ padding: '$3', boxShadow: 'none' }}
        icon={<FilePlus />}
      />
    </AddSceneContainer>
  )
}
