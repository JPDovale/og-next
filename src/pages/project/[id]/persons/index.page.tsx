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

import {
  FastAccessPersons,
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

import { NextSeo } from 'next-seo'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useWindowSize } from '@hooks/useWindow'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { DefaultError } from '@components/usefull/DefaultError'
import { TextInput } from '@components/usefull/TextInput'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { CardPerson } from '@components/PersonsComponents/CardPerson'
import { Avatares } from '@components/usefull/Avatares'

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

  const { loading, createNewPerson, error, setError } =
    useContext(ProjectsContext)

  const { register, handleSubmit, formState, reset } =
    useForm<NewPersonFormData>({
      resolver: zodResolver(newPersonFormSchema),
    })

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}`)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const { project, projectName, queryPerson } = useProject(id as string)
  const finalPersonsToShow = queryPerson(query)

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
    <>
      <NextSeo title={`${projectName}-Personagens | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
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
            label={
              !formIsVisible ? (smallWindow ? '' : 'Criar personagem') : ''
            }
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
                    variant={
                      formState.errors.age?.message ? 'denied' : 'default'
                    }
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

        <FastAccessPersons>
          <Text size="xs">Acesso rápido:</Text>
          <Avatares
            size={smallWindow ? 'xsm' : 'sm'}
            columns={12}
            listEmptyMessage={
              loading ? 'Carregando...' : 'Nenhum personagem foi criado ainda'
            }
            persons={finalPersonsToShow}
            isClickable
          />
        </FastAccessPersons>

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
    </>
  )
}
