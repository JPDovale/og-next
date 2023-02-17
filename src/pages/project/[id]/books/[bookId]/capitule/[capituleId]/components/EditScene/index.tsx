import { IUpdateSceneRequest } from '@api/booksRequests/types/IUpdateSceneRequest'
import { ICapitule, IScene } from '@api/responsesTypes/IBooksResponse'
import { Avatares } from '@components/usefull/Avatares'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { ProjectsContext } from '@contexts/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProject } from '@hooks/useProject'
import { Button, Checkbox, Heading, Text, Textarea } from '@og-ui/react'
import {
  FileArrowDown,
  UserCircleMinus,
  UserCirclePlus,
  X,
} from 'phosphor-react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { InputContainer } from '../../styles'
import { EditSceneContainer, AvataresContainer, CloseButton } from './styles'

interface IEditSceneProps {
  capitule: ICapitule
  scene: IScene
  bookId: string
  projectId: string
  onClose: () => void
}

const editSceneSchema = z.object({
  objective: z
    .string()
    .max(600, {
      message: 'O objetivo do capítulo não pode exceder 600 caracteres',
    })
    .optional(),
  act1: z
    .string()
    .max(10000, { message: 'O campo não pode exceder 10000 caracteres' })
    .regex(/^[^<>{}\\]+$/, { message: 'Não coloque caracteres especiais' })
    .optional(),
  act2: z
    .string()
    .max(10000, { message: 'O campo não pode exceder 10000 caracteres' })
    .regex(/^[^<>{}\\]+$/, { message: 'Não coloque caracteres especiais' })
    .optional(),
  act3: z
    .string()
    .max(10000, { message: 'O campo não pode exceder 10000 caracteres' })
    .regex(/^[^<>{}\\]+$/, { message: 'Não coloque caracteres especiais' })
    .optional(),
  persons: z
    .array(z.string().min(6).max(100))
    .min(1, { message: 'Você precisa selecionar pelo menos um personagem!' }),
  writtenWords: z
    .string()
    .regex(/^([0-9]+)$/, {
      message: 'Coloque apenas números na idade do personagem.',
    })
    .max(10, { message: 'O valor é muito grande. Sugestão: Crie outras cenas' })
    .optional(),
  complete: z.boolean(),
})

type editSceneBodyData = z.infer<typeof editSceneSchema>

export function EditScene({
  projectId,
  bookId,
  capitule,
  scene,
  onClose,
}: IEditSceneProps) {
  const [formUpdated, setFormUpdated] = useState(false)

  const { updateScene } = useContext(ProjectsContext)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<editSceneBodyData>({
    resolver: zodResolver(editSceneSchema),
    defaultValues: {
      act1: scene.structure.act1,
      act2: scene.structure.act2,
      act3: scene.structure.act3,
      objective: scene.objective,
      persons: scene.persons || [],
      writtenWords: scene.writtenWords || '0',
      complete: scene.complete,
    },
  })
  const selectedPersonsIds = watch('persons')
  const complete = watch('complete')

  const { personsThisProject, findManyPersons } = useProject(projectId)

  const selectedPersons = findManyPersons(selectedPersonsIds as string[])
  const unselectedPersons = findManyPersons(selectedPersonsIds as string[], {
    reverse: true,
  })

  async function handleUpdateScene(data: editSceneBodyData) {
    const updatedScene: IUpdateSceneRequest = {
      bookId,
      capituleId: capitule.id,
      complete: data.complete,
      persons: data.persons,
      sceneId: scene.id,
      objective: data.objective,
      structure: {
        act1: data.act1,
        act2: data.act2,
        act3: data.act3,
      },
      writtenWords: data.writtenWords,
    }

    const isUpdated = await updateScene(updatedScene)

    if (isUpdated) {
      onClose()
    }
  }

  function handleSelectPerson(id: string) {
    const ids = selectedPersonsIds || []

    setFormUpdated(true)
    setValue('persons', [...ids, id])
  }

  function handleRemovePerson(id: string) {
    const filteredPersonsIds = selectedPersonsIds?.filter((i) => i !== id) || []

    setFormUpdated(true)
    setValue('persons', [...filteredPersonsIds])
  }

  function handleUpdateComplete() {
    const updatedComplete = !complete

    setValue('complete', updatedComplete)
    setFormUpdated(true)

    if (updatedComplete) {
      setValue('writtenWords', scene.writtenWords)
    } else {
      setValue('writtenWords', '0')
    }
  }

  return (
    <EditSceneContainer onSubmit={handleSubmit(handleUpdateScene)}>
      <Heading size="sm">Cena {scene.sequence}</Heading>
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

      <InputContainer>
        <Text family="body" size="sm">
          Marcar como concluído
          <Text as="span" family="body" size="sm">
            {errors.objective?.message}
          </Text>
        </Text>

        <Checkbox
          checked={complete}
          onCheckedChange={() => handleUpdateComplete()}
        />
      </InputContainer>

      {complete && (
        <InputContainer>
          <Text family="body" size="sm">
            Palavras escritas
            <Text as="span" family="body" size="sm">
              {errors.writtenWords?.message}
            </Text>
          </Text>

          <Textarea
            css={{ width: '100%', boxShadow: 'none' }}
            {...register('writtenWords')}
          />
        </InputContainer>
      )}

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
        label="Atualizar cena"
        align="center"
        disabled={isSubmitting || (!isDirty && !formUpdated)}
        css={{ padding: '$3', boxShadow: 'none' }}
        icon={<FileArrowDown />}
      />
    </EditSceneContainer>
  )
}
