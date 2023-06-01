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
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { useWishes } from '@hooks/useWishes'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Anchor, SketchLogo } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Wishe } from './components/Wishe'
import { NewWisheForm } from './styles'

const newWisheBodySchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O titulo precisa ter pelo menos 2 caracteres' })
    .max(90, { message: 'O titulo não pode ter mais de 90 caracteres' }),

  description: z
    .string()
    .min(2, { message: 'A descrição precisa ter pelo menos 2 caracteres' })
    .max(1000, { message: 'A descrição não pode ter mais de 1000 caracteres' }),
})

type newWisheData = z.infer<typeof newWisheBodySchema>

export default function NewWishePage() {
  const [wisheSelected, setWisheSelected] = useState<string | null>(null)
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id, personId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { person, personName, loadingPerson, callEvent } = usePerson(
    personId as string,
  )
  const { loadingWishes, findWisheWherePersonNotExisteIn } = useWishes(
    id as string,
  )
  const wishes = findWisheWherePersonNotExisteIn(personId as string)
  const wishe = wishes.find((wishe) => wishe.id === wisheSelected)

  const { handleSubmit, register, formState } = useForm<newWisheData>({
    resolver: zodResolver(newWisheBodySchema),
  })

  function handleSelectWishe(id: string) {
    if (id === wisheSelected) return setWisheSelected(null)

    setWisheSelected(id)
  }

  async function handleCreateWishe(data: newWisheData) {
    const { resolved, error } = await callEvent.createObject<newWisheData>({
      path: 'wishes',
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
    if (!wisheSelected) return

    const { resolved, error } = await callEvent.createObjectReference({
      path: 'wishes',
      referenceId: wisheSelected,
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
      <NextSeo title={`${personName}-Novo desejo | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens', `${personName}`, 'Desejo', 'Novo']}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        inErrorNotAuthorized={permission !== 'edit'}
        isScrolling
      >
        <ToastError error={error} setError={setError} />

        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            icon={<SketchLogo size={40} />}
            label={
              wisheSelected && wishe
                ? `Desejo selecionado: ${wishe.infos.title}`
                : 'Novo desejo'
            }
            inTop
          />

          <Text weight="bold" family="body" size="xl">
            Selecione um desejo criado anteriormente para reaproveitar:
          </Text>

          <ContainerGrid padding={0} columns={wishes[0] ? 3 : 1}>
            {wishes[0] ? (
              wishes.map((wishe) => (
                <Wishe
                  selected={
                    wisheSelected === null ? true : wisheSelected === wishe.id
                  }
                  wishe={wishe}
                  key={wishe.id}
                  onClick={() => handleSelectWishe(wishe.id)}
                />
              ))
            ) : loadingWishes ? (
              <ContainerGrid padding={0} css={{ minHeight: '380px' }}>
                <Loading autoAdapt />
              </ContainerGrid>
            ) : (
              <ListEmpty message="Nenhum desejo criado anteriormente... Vamos criar o primeiro?" />
            )}
          </ContainerGrid>

          {!wisheSelected ? (
            <NewWisheForm onSubmit={handleSubmit(handleCreateWishe)}>
              <Text weight="bold" size="xl" family="body">
                Está na hora de criar um nova desejo para o seu personagem
              </Text>

              <ContainerGrid padding={0}>
                <LabelInput
                  error={formState.errors.title?.message}
                  label="Titulo do desejo"
                >
                  <TextInputRoot>
                    <TextInputIcon>
                      <SketchLogo />
                    </TextInputIcon>

                    <TextInputInput
                      placeholder="Titulo exemplo"
                      {...register('title')}
                    />
                  </TextInputRoot>
                </LabelInput>

                <LabelInput
                  error={formState.errors.description?.message}
                  label="Descrição do desejo:"
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
                  <SketchLogo />
                </ButtonIcon>

                <ButtonLabel>Criar desejo</ButtonLabel>
              </ButtonRoot>
            </NewWisheForm>
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
                  Atribuir &quot;{wishe?.infos.title}&quot; ao personagem{' '}
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
