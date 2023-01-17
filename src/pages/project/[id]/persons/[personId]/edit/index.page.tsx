import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button, Text, Textarea } from '@og-ui/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { IProjectResponse } from '../../../../../../api/responsesTypes/IProjcetResponse'
import { Error } from '../../../../../../components/Error'
import { Loading } from '../../../../../../components/Loading'
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

  if (loading) return <Loading />
  if (!projects) return <Error />

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  if (!project || !persons) return <Error />

  const person = persons.find((person) => person.id === personId)

  if (!person) return <Error />

  const smallWindow = screen.width < 786

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
      paths={['Personagens', `${person?.name}`, 'Edição']}
      loading={loading}
      isScrolling
    >
      <EditContainer onSubmit={handleSubmit(handleUpdatePerson)}>
        {error && <ResponseInfoApi error={error} />}

        <Info isCard columns={smallWindow ? 1 : 3}>
          <Text family="body" as="label">
            Nome
            <TextInput
              placeholder={person?.name}
              label="name"
              register={register}
            />
          </Text>

          <Text family="body" as="label">
            Sobrenome
            <TextInput
              placeholder={person?.lastName}
              label="lastName"
              register={register}
            />
          </Text>

          <Text family="body" as="label">
            Idade
            <TextInput
              placeholder={person?.age}
              label="age"
              register={register}
            />
          </Text>
        </Info>

        <Info isCard>
          <Text family="body" as="label">
            História
            <Textarea
              placeholder={person?.history}
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
            <Text size="sm">{person?.createAt}</Text>
          </Text>

          <Text family="body" as="label">
            <header>Ultima alteração</header>
            <Text size="sm">{person?.updateAt}</Text>
          </Text>
        </Info>

        <Info columns={smallWindow ? 2 : 3} isCard>
          <Text family="body" as="label">
            <header>
              <Crosshair />
              Objetivos criados
            </header>
            <Text>{person.objectives.length}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <RainbowCloud />
              Sonhos criados
            </header>
            <Text>{person.dreams.length}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <Warning />
              Medos criados
            </header>
            <Text>{person.fears.length}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <Person />
              Aparências criadas
            </header>
            <Text>{person.appearance.length}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <UserCircleGear />
              Personalidades criadas
            </header>
            <Text>{person.personality.length}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <Lightning />
              Poderes criados
            </header>
            <Text>{person.powers.length}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <HeartBreak />
              Traumas criados
            </header>
            <Text>{person.traumas.length}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <TreeStructure />
              Valores criados
            </header>
            <Text>{person.values.length}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <SketchLogo />
              Desejos criados
            </header>
            <Text>{person.wishes.length}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <Users />
              Casais
            </header>
            <Text>{person.couples.length}</Text>
          </Text>

          <Text family="body" as="label">
            <header>
              <Chats />
              Comentários
            </header>
            <Text>{person.comments.length}</Text>
          </Text>
        </Info>
      </EditContainer>
    </ProjectPageLayout>
  )
}
