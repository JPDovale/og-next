import { IError } from '@@types/errors/IError'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { HeadingPart } from '@components/usefull/HeadingPart'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { LabelInput } from '@components/usefull/LabelInput'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { Loading } from '@components/usefull/Loading'
import { Text } from '@components/usefull/Text'
import { Textarea } from '@components/usefull/Textarea'
import { ToastError } from '@components/usefull/ToastError'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppearances } from '@hooks/useAppearances'
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Anchor, Person } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Appearance } from './components/Appearance'
import { NewAppearanceForm } from './styles'

const newAppearanceBodySchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O titulo precisa ter pelo menos 2 caracteres' })
    .max(90, { message: 'O titulo não pode ter mais de 90 caracteres' }),

  description: z
    .string()
    .min(2, { message: 'A descrição precisa ter pelo menos 2 caracteres' })
    .max(1000, { message: 'A descrição não pode ter mais de 1000 caracteres' }),
})

type newAppearanceData = z.infer<typeof newAppearanceBodySchema>

export default function NewAppearancePage() {
  const [appearanceSelected, setAppearanceSelected] = useState<string | null>(
    null,
  )
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id, personId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { person, personName, loadingPerson, callEvent } = usePerson(
    personId as string,
  )
  const { loadingAppearances, findAppearanceWherePersonNotExisteIn } =
    useAppearances(id as string)
  const appearances = findAppearanceWherePersonNotExisteIn(personId as string)
  const appearance = appearances.find(
    (appearance) => appearance.id === appearanceSelected,
  )

  const { handleSubmit, register, formState } = useForm<newAppearanceData>({
    resolver: zodResolver(newAppearanceBodySchema),
  })

  function handleSelectAppearance(id: string) {
    if (id === appearanceSelected) return setAppearanceSelected(null)

    setAppearanceSelected(id)
  }

  async function handleCreateAppearance(data: newAppearanceData) {
    const { resolved, error } = await callEvent.createObject<newAppearanceData>(
      {
        path: 'appearances',
        object: data,
      },
    )

    if (resolved) {
      router.push(`/project/${id}/persons/${personId}`)
    }

    if (error) {
      setError(error)
    }
  }

  async function handleCreateReference() {
    if (!appearanceSelected) return

    const { resolved, error } = await callEvent.createObjectReference({
      path: 'appearances',
      referenceId: appearanceSelected,
    })

    if (resolved) {
      router.push(`/project/${id}/persons/${personId}`)
    }

    if (error) {
      setError(error)
    }
  }

  return (
    <>
      <NextSeo title={`${personName}-Nova aparência | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens', `${personName}`, 'Aparência', 'Nova']}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        inErrorNotAuthorized={permission !== 'edit'}
        isScrolling
      >
        <ToastError error={error} setError={setError} />
        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            icon={<Person size={40} />}
            label={
              appearanceSelected && appearance
                ? `Aparência selecionada: ${appearance.infos.title}`
                : 'Nova aparência'
            }
            inTop
          />

          <Text weight="bold" family="body" size="xl">
            Selecione uma aparência criada anteriormente para reaproveitar:
          </Text>

          <ContainerGrid padding={0} columns={appearances[0] ? 3 : 1}>
            {appearances[0] ? (
              appearances.map((appearance) => (
                <Appearance
                  selected={
                    appearanceSelected === null
                      ? true
                      : appearanceSelected === appearance.id
                  }
                  appearance={appearance}
                  key={appearance.id}
                  onClick={() => handleSelectAppearance(appearance.id)}
                />
              ))
            ) : loadingAppearances ? (
              <ContainerGrid padding={0} css={{ minHeight: '380px' }}>
                <Loading autoAdapt />
              </ContainerGrid>
            ) : (
              <ListEmpty message="Nenhuma aparência criada anteriormente... Vamos criar a primeira?" />
            )}
          </ContainerGrid>

          {!appearanceSelected ? (
            <NewAppearanceForm onSubmit={handleSubmit(handleCreateAppearance)}>
              <Text weight="bold" size="xl" family="body">
                Está na hora de criar uma nova aparência para o seu personagem
              </Text>

              <ContainerGrid padding={0}>
                <LabelInput
                  error={formState.errors.title?.message}
                  label="Titulo do aparência"
                >
                  <TextInputRoot>
                    <TextInputIcon>
                      <Person />
                    </TextInputIcon>

                    <TextInputInput
                      placeholder="Titulo exemplo"
                      {...register('title')}
                    />
                  </TextInputRoot>
                </LabelInput>

                <LabelInput
                  error={formState.errors.description?.message}
                  label="Descrição do aparência:"
                >
                  <Textarea
                    placeholder="Descrição exemplo"
                    resizable
                    {...register('description')}
                  />
                </LabelInput>
              </ContainerGrid>

              <ButtonRoot type="submit" align="center">
                <ButtonIcon>
                  <Person />
                </ButtonIcon>

                <ButtonLabel>Criar aparência</ButtonLabel>
              </ButtonRoot>
            </NewAppearanceForm>
          ) : (
            <ContainerGrid>
              <ButtonRoot
                onClick={handleCreateReference}
                align="center"
                type="button"
              >
                <ButtonIcon>
                  <Anchor />
                </ButtonIcon>
                <ButtonLabel>
                  Atribuir &quot;{appearance?.infos.title}&quot; ao personagem{' '}
                  {personName}
                </ButtonLabel>
              </ButtonRoot>
            </ContainerGrid>
          )}
        </ContainerGrid>
      </ProjectPageLayout>
    </>
  )
}
