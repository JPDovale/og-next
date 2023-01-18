import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button, Text, Textarea } from '@og-ui/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { IProjectResponse } from '../../../../../../api/responsesTypes/IProjcetResponse'
import { ResponseInfoApi } from '../../../../../../components/ResponseInfoApi'
import { TextInput } from '../../../../../../components/TextInput'
import { ProjectsContext } from '../../../../../../contexts/projects'
import { ProjectPageLayout } from '../../../../../../layouts/ProjectPageLayout'
import { EditContainer, Info } from './styles'
import {
  Chats,
  Crosshair,
  HeartBreak,
  Lightning,
  PencilLine,
  Person,
  RainbowCloud,
  SketchLogo,
  TreeStructure,
  UserCircleGear,
  Users,
  Warning,
} from 'phosphor-react'
import { ICreatePersonDTO } from '../../../../../../api/dtos/ICreatePersonDTO'
import { useWindowSize } from '../../../../../../hooks/useWindow'

const personFormSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  age: z.string(),
  history: z.string(),
})

type PersonFormData = z.infer<typeof personFormSchema>

export default function EditPersonPage() {
  const { projects, loading, persons, error, updatePerson } =
    useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId } = router.query

  const { register, handleSubmit, formState, watch, reset } =
    useForm<PersonFormData>({
      resolver: zodResolver(personFormSchema),
    })

  const name = watch('name')
  const lastName = watch('lastName')
  const age = watch('age')
  const history = watch('history')

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const person = persons.find((person) => person?.id === personId)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  async function handleUpdatePerson() {
    const updatedPerson: ICreatePersonDTO = {
      name: name || (person?.name as string),
      lastName: lastName || (person?.lastName as string),
      age: age || (person?.age as string),
      history: history || (person?.history as string),
      projectId: project.id,
    }

    await updatePerson(updatedPerson, person?.id as string)
    reset()
  }

  return (
    <ProjectPageLayout
      projectName={project?.name}
      projectId={`${id}`}
      paths={['Personagens', `${person?.name || 'Carregando...'}`, 'Edição']}
      loading={loading}
      inError={!loading && !person}
      isScrolling
    >
      <EditContainer onSubmit={handleSubmit(handleUpdatePerson)}>
        {error && <ResponseInfoApi error={error} />}

        <Info isCard columns={smallWindow ? 1 : 3}>
          <Text family="body" as="label">
            Nome
            <TextInput
              placeholder={person?.name || 'Carregando...'}
              label="name"
              register={register}
            />
          </Text>

          <Text family="body" as="label">
            Sobrenome
            <TextInput
              placeholder={person?.lastName || 'Carregando...'}
              label="lastName"
              register={register}
            />
          </Text>

          <Text family="body" as="label">
            Idade
            <TextInput
              placeholder={person?.age || 'Carregando...'}
              label="age"
              register={register}
            />
          </Text>
        </Info>

        <Info isCard>
          <Text family="body" as="label">
            História
            <Textarea
              placeholder={person?.history || 'Carregando...'}
              {...register('history')}
              css={{ fontSize: '$lg', minHeight: '430px' }}
            />
          </Text>
        </Info>

        <Button
          type="submit"
          label="Salvar alterações"
          icon={<PencilLine />}
          wid={smallWindow ? 'full' : 'middle'}
          align="center"
          disabled={
            !!(!name && !lastName && !age && !history) || formState.isSubmitting
          }
          css={{
            padding: '$3 $10',
            alignSelf: 'center',
            marginTop: '$4',
            marginBottom: '$8',
          }}
        />

        <Info isCard columns={2}>
          <Text family="body" as="label">
            <header>Data de criação</header>
            <Text size="sm">{person?.createAt || 'Carregando...'}</Text>
          </Text>

          <Text family="body" as="label">
            <header>Ultima alteração</header>
            <Text size="sm">{person?.updateAt || 'Carregando...'}</Text>
          </Text>
        </Info>

        <Info columns={smallWindow ? 2 : 3} isCard>
          <Text family="body" as="label">
            <header>
              <Crosshair />
              Objetivos criados
            </header>
            <Text>{person?.objectives.length || 0}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <RainbowCloud />
              Sonhos criados
            </header>
            <Text>{person?.dreams.length || 0}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <Warning />
              Medos criados
            </header>
            <Text>{person?.fears.length || 0}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <Person />
              Aparências criadas
            </header>
            <Text>{person?.appearance.length || 0}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <UserCircleGear />
              Personalidades criadas
            </header>
            <Text>{person?.personality.length || 0}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <Lightning />
              Poderes criados
            </header>
            <Text>{person?.powers.length || 0}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <HeartBreak />
              Traumas criados
            </header>
            <Text>{person?.traumas.length || 0}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <TreeStructure />
              Valores criados
            </header>
            <Text>{person?.values.length || 0}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <SketchLogo />
              Desejos criados
            </header>
            <Text>{person?.wishes.length || 0}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <Users />
              Casais
            </header>
            <Text>{person?.couples.length || 0}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <Chats />
              Comentários
            </header>
            <Text>{person?.comments.length || 0}</Text>
          </Text>
        </Info>
      </EditContainer>
    </ProjectPageLayout>
  )
}
