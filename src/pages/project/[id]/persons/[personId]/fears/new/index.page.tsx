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
import { useFears } from '@hooks/useFears'
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Anchor, Warning } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Fear } from './components/Fear'
import { NewFearForm } from './styles'

const newFearBodySchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O titulo precisa ter pelo menos 2 caracteres' })
    .max(90, { message: 'O titulo não pode ter mais de 90 caracteres' }),

  description: z
    .string()
    .min(2, { message: 'A descrição precisa ter pelo menos 2 caracteres' })
    .max(1000, { message: 'A descrição não pode ter mais de 1000 caracteres' }),
})

type newFearData = z.infer<typeof newFearBodySchema>

export default function NewFearPage() {
  const [fearSelected, setFearSelected] = useState<string | null>(null)
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id, personId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { person, personName, loadingPerson, callEvent } = usePerson(
    personId as string,
  )
  const { loadingFears, findFearWherePersonNotExisteIn } = useFears(
    id as string,
  )
  const fears = findFearWherePersonNotExisteIn(personId as string)
  const fear = fears.find((fear) => fear.id === fearSelected)

  const { handleSubmit, register, formState } = useForm<newFearData>({
    resolver: zodResolver(newFearBodySchema),
  })

  function handleSelectFear(id: string) {
    if (id === fearSelected) return setFearSelected(null)

    setFearSelected(id)
  }

  async function handleCreateFear(data: newFearData) {
    const { resolved, error } = await callEvent.createObject<newFearData>({
      path: 'fears',
      object: data,
    })

    if (resolved) {
      router.push(`/project/${id}/persons/${personId}`)
    }

    if (error) {
      setError(error)
    }
  }

  async function handleCreateReference() {
    if (!fearSelected) return

    const { resolved, error } = await callEvent.createObjectReference({
      path: 'fears',
      referenceId: fearSelected,
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
      <NextSeo title={`${personName}-Novo medo | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens', `${personName}`, 'Medo', 'Novo']}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        inErrorNotAuthorized={permission !== 'edit'}
        isScrolling
      >
        <ToastError error={error} setError={setError} />

        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            icon={<Warning size={40} />}
            label={
              fearSelected && fear
                ? `Medo selecionado: ${fear.title}`
                : 'Novo medo'
            }
            inTop
          />

          <Text weight="bold" family="body" size="xl">
            Selecione um medo criado anteriormente para reaproveitar:
          </Text>

          <ContainerGrid padding={0} columns={fears[0] ? 3 : 1}>
            {fears[0] ? (
              fears.map((fear) => (
                <Fear
                  selected={
                    fearSelected === null ? true : fearSelected === fear.id
                  }
                  fear={fear}
                  key={fear.id}
                  onClick={() => handleSelectFear(fear.id)}
                />
              ))
            ) : loadingFears ? (
              <ContainerGrid padding={0} css={{ minHeight: '380px' }}>
                <Loading autoAdapt />
              </ContainerGrid>
            ) : (
              <ListEmpty message="Nenhum medo criado anteriormente... Vamos criar o primeiro?" />
            )}
          </ContainerGrid>

          {!fearSelected ? (
            <NewFearForm onSubmit={handleSubmit(handleCreateFear)}>
              <Text weight="bold" size="xl" family="body">
                Está na hora de criar um nova medo para o seu personagem
              </Text>

              <ContainerGrid padding={0}>
                <LabelInput
                  error={formState.errors.title?.message}
                  label="Titulo do medo"
                >
                  <TextInputRoot>
                    <TextInputIcon>
                      <Warning />
                    </TextInputIcon>

                    <TextInputInput
                      placeholder="Titulo exemplo"
                      {...register('title')}
                    />
                  </TextInputRoot>
                </LabelInput>

                <LabelInput
                  error={formState.errors.description?.message}
                  label="Descrição do medo:"
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
                  <Warning />
                </ButtonIcon>

                <ButtonLabel>Criar medo</ButtonLabel>
              </ButtonRoot>
            </NewFearForm>
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
                  Atribuir &quot;{fear?.title}&quot; ao personagem {personName}
                </ButtonLabel>
              </ButtonRoot>
            </ContainerGrid>
          )}
        </ContainerGrid>
      </ProjectPageLayout>
    </>
  )
}
