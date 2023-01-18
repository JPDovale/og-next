import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button, Text, Textarea } from '@og-ui/react'
import { useRouter } from 'next/router'
import {
  Calendar,
  IdentificationCard,
  MagnifyingGlass,
  PlusCircle,
  UserFocus,
  UserPlus,
  X,
} from 'phosphor-react'
import { useContext, useState } from 'react'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { DefaultError } from '../../../../components/DefaultError'
import { InterfaceContext } from '../../../../contexts/interface'
import { ProjectsContext } from '../../../../contexts/projects'
import { ProjectPageLayout } from '../../../../layouts/ProjectPageLayout'
import { orderElements } from '../../../../services/orderElements'
import {
  InfosBasics,
  InputForm,
  InputHeader,
  NewInfosPerson,
  NewPersonForm,
  NewPersonFormContainer,
  PersonsContainer,
  QueryInput,
  QueryInputContainer,
  ShowFormButton,
} from './styles'
import { TextInput } from '../../../../components/TextInput'
import { CardPerson } from '../../../../components/CardPerson'
import { ListEmpty } from '../../../../components/ListEmpty'
import { Avatares } from '../../../../components/Avatares'
import { useWindowSize } from '../../../../hooks/useWindow'

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

export default function PersonsPage() {
  const [formIsVisible, setFormIsVisible] = useState(false)
  const [success, setSuccess] = useState('')
  const [query, setQuery] = useState('')

  const { projects, loading, persons, createNewPerson, error, setError } =
    useContext(ProjectsContext)
  const { orderBy } = useContext(InterfaceContext)

  const { register, handleSubmit, formState, reset } =
    useForm<NewPersonFormData>({
      resolver: zodResolver(newPersonFormSchema),
    })

  const router = useRouter()
  const { id } = router.query

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const personsThisProject = persons?.filter(
    (person) => person.defaultProject === project?.id,
  )

  const personsOrd = orderElements(
    personsThisProject,
    orderBy,
  ) as IPersonsResponse[]

  const finalPersonsToShow = query
    ? personsOrd?.filter(
        (person) =>
          person.name.includes(query) || person.lastName.includes(query),
      )
    : personsOrd

  async function handleNewPerson(data: NewPersonFormData) {
    const newPerson = {
      name: data.name,
      lastName: data.lastName,
      age: data.age,
      history: data.history,
      projectId: project.id,
    }

    const success = await createNewPerson(newPerson)

    if (!success) return

    reset()

    setFormIsVisible(false)
    setSuccess('Personagem criado com sucesso!')
    setTimeout(() => setSuccess(''), 5000)
  }

  return (
    <ProjectPageLayout
      projectName={project?.name}
      projectId={`${id}`}
      paths={['Personagens']}
      loading={loading}
      inError={!loading && !project}
      isScrolling
    >
      {error && (
        <DefaultError
          close={() => setError(undefined)}
          title={error.title}
          message={error.message}
        />
      )}

      <NewPersonFormContainer>
        <ShowFormButton
          formIsVisible={formIsVisible}
          icon={
            formIsVisible ? <X weight="bold" /> : <UserPlus weight="bold" />
          }
          label={!formIsVisible ? 'Criar personagem' : ''}
          wid="hug"
          onClick={() => setFormIsVisible(!formIsVisible)}
        />

        <QueryInputContainer formIsVisible={formIsVisible}>
          <QueryInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<MagnifyingGlass size={24} />}
            placeholder="Encontre um personagem"
          />
        </QueryInputContainer>

        <Text
          size="md"
          css={{
            color: '$successDefault',
          }}
          weight="bold"
          family="body"
        >
          {success}
        </Text>

        <NewPersonForm
          onSubmit={handleSubmit(handleNewPerson)}
          formIsVisible={formIsVisible}
        >
          {formIsVisible && (
            <>
              <Text css={{ marginBottom: '-$10', color: '$base700' }} size="xs">
                Todos os personagens:
              </Text>
              <Avatares
                size={smallWindow ? 'xsm' : 'sm'}
                columns={18}
                listEmptyMessage="Nenhum personagem foi criado ainda"
                persons={personsOrd}
              />
            </>
          )}

          <NewInfosPerson>
            <InfosBasics>
              <InputForm as="label" size="xs" formIsVisible={formIsVisible}>
                <InputHeader size={'xs'}>
                  NOME
                  <Text size="sm" as="span" family="body">
                    {formState.errors?.name?.message}
                  </Text>
                </InputHeader>

                <TextInput
                  label="name"
                  register={register}
                  variant={
                    formState.errors.name?.message ? 'denied' : 'default'
                  }
                  icon={<IdentificationCard weight="bold" />}
                  placeholder="Nome do personagem"
                />
              </InputForm>

              <InputForm as="label" size="xs" formIsVisible={formIsVisible}>
                <InputHeader size={'xs'}>
                  SOBRENOME
                  <Text size="sm" as="span" family="body">
                    {formState.errors?.lastName?.message}
                  </Text>
                </InputHeader>

                <TextInput
                  label="lastName"
                  register={register}
                  variant={
                    formState.errors.lastName?.message ? 'denied' : 'default'
                  }
                  icon={<IdentificationCard weight="bold" />}
                  placeholder="Sobrenome do personagem"
                />
              </InputForm>

              <InputForm as="label" size="xs" formIsVisible={formIsVisible}>
                <InputHeader size={'xs'}>
                  IDADE
                  <Text size="sm" as="span" family="body">
                    {formState.errors?.age?.message}
                  </Text>
                </InputHeader>

                <TextInput
                  label="age"
                  register={register}
                  variant={formState.errors.age?.message ? 'denied' : 'default'}
                  icon={<Calendar weight="bold" />}
                  placeholder="Idade do personagem"
                />
              </InputForm>
            </InfosBasics>

            <InputForm as="label" size="xs" formIsVisible={formIsVisible}>
              <InputHeader size={'xs'}>
                HISTÓRIA
                <Text size="sm" as="span" family="body">
                  {formState.errors?.history?.message}
                </Text>
              </InputHeader>
              <Textarea
                variant={
                  formState.errors.history?.message ? 'denied' : 'default'
                }
                placeholder="História do personagem"
                {...register('history')}
              />
            </InputForm>
          </NewInfosPerson>

          <Button
            label="Criar"
            type="submit"
            icon={<PlusCircle weight="bold" />}
            align="center"
            disabled={formState.isSubmitting}
          />
        </NewPersonForm>
      </NewPersonFormContainer>

      <PersonsContainer>
        {finalPersonsToShow[0] ? (
          finalPersonsToShow.map((person) => {
            return <CardPerson key={person.id} person={person} isNotPreview />
          })
        ) : (
          <ListEmpty
            isLoading={loading}
            message="Você ainda não criou nenhum personagem para esse projeto."
            icon={<UserFocus size={loading ? 0 : 90} />}
          />
        )}
      </PersonsContainer>
    </ProjectPageLayout>
  )
}
