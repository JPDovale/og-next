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
import { useDreams } from '@hooks/useDreams'
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Anchor, RainbowCloud } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Dream } from './components/Dream'
import { NewDreamForm } from './styles'

const newDreamBodySchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O titulo precisa ter pelo menos 2 caracteres' })
    .max(90, { message: 'O titulo não pode ter mais de 90 caracteres' }),

  description: z
    .string()
    .min(2, { message: 'A descrição precisa ter pelo menos 2 caracteres' })
    .max(1000, { message: 'A descrição não pode ter mais de 1000 caracteres' }),
})

type newDreamData = z.infer<typeof newDreamBodySchema>

export default function NewDreamPage() {
  const [dreamSelected, setDreamSelected] = useState<string | null>(null)
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id, personId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { person, personName, loadingPerson, callEvent } = usePerson(
    personId as string,
  )
  const { loadingDreams, findDreamWherePersonNotExisteIn } = useDreams(
    id as string,
  )
  const dreams = findDreamWherePersonNotExisteIn(personId as string)
  const dream = dreams.find((dream) => dream.id === dreamSelected)

  const { handleSubmit, register, formState } = useForm<newDreamData>({
    resolver: zodResolver(newDreamBodySchema),
  })

  function handleSelectDream(id: string) {
    if (id === dreamSelected) return setDreamSelected(null)

    setDreamSelected(id)
  }

  async function handleCreateDream(data: newDreamData) {
    const { resolved, error } = await callEvent.createObject<newDreamData>({
      path: 'dreams',
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
    if (!dreamSelected) return

    const { resolved, error } = await callEvent.createObjectReference({
      path: 'dreams',
      referenceId: dreamSelected,
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
      <NextSeo title={`${personName}-Novo sonho | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens', `${personName}`, 'Sonho', 'Novo']}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        inErrorNotAuthorized={permission !== 'edit'}
        isScrolling
      >
        <ToastError error={error} setError={setError} />

        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            icon={<RainbowCloud size={40} />}
            label={
              dreamSelected && dream
                ? `Sonho selecionado: ${dream.infos.title}`
                : 'Novo sonho'
            }
            inTop
          />

          <Text weight="bold" family="body" size="xl">
            Selecione um sonho criado anteriormente para reaproveitar:
          </Text>

          <ContainerGrid padding={0} columns={dreams[0] ? 3 : 1}>
            {dreams[0] ? (
              dreams.map((dream) => (
                <Dream
                  selected={
                    dreamSelected === null ? true : dreamSelected === dream.id
                  }
                  dream={dream}
                  key={dream.id}
                  onClick={() => handleSelectDream(dream.id)}
                />
              ))
            ) : loadingDreams ? (
              <ContainerGrid padding={0} css={{ minHeight: '380px' }}>
                <Loading autoAdapt />
              </ContainerGrid>
            ) : (
              <ListEmpty message="Nenhum sonho criado anteriormente... Vamos criar o primeiro?" />
            )}
          </ContainerGrid>

          {!dreamSelected ? (
            <NewDreamForm onSubmit={handleSubmit(handleCreateDream)}>
              <Text weight="bold" size="xl" family="body">
                Está na hora de criar um nova sonho para o seu personagem
              </Text>

              <ContainerGrid padding={0}>
                <LabelInput
                  error={formState.errors.title?.message}
                  label="Titulo do sonho"
                >
                  <TextInputRoot>
                    <TextInputIcon>
                      <RainbowCloud />
                    </TextInputIcon>

                    <TextInputInput
                      placeholder="Titulo exemplo"
                      {...register('title')}
                    />
                  </TextInputRoot>
                </LabelInput>

                <LabelInput
                  error={formState.errors.description?.message}
                  label="Descrição do sonho:"
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
                  <RainbowCloud />
                </ButtonIcon>

                <ButtonLabel>Criar sonho</ButtonLabel>
              </ButtonRoot>
            </NewDreamForm>
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
                  Atribuir &quot;{dream?.infos.title}&quot; ao personagem{' '}
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
