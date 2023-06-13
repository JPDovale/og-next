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
import { zodResolver } from '@hookform/resolvers/zod'
import { usePowers } from '@hooks/usePowers'
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Anchor, Lightning } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Power } from './components/Power'
import { NewPowerForm } from './styles'
import { IError } from '@@types/errors/IError'
import { ToastError } from '@components/usefull/ToastError'

const newPowerBodySchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O titulo precisa ter pelo menos 2 caracteres' })
    .max(90, { message: 'O titulo não pode ter mais de 90 caracteres' }),

  description: z
    .string()
    .min(2, { message: 'A descrição precisa ter pelo menos 2 caracteres' })
    .max(1000, { message: 'A descrição não pode ter mais de 1000 caracteres' }),
})

type newPowerData = z.infer<typeof newPowerBodySchema>

export default function NewPowerPage() {
  const [powerSelected, setPowerSelected] = useState<string | null>(null)
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id, personId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { person, personName, loadingPerson, callEvent } = usePerson(
    personId as string,
  )
  const { loadingPowers, findPowerWherePersonNotExisteIn } = usePowers(
    id as string,
  )
  const powers = findPowerWherePersonNotExisteIn(personId as string)
  const power = powers.find((power) => power.id === powerSelected)

  const { handleSubmit, register, formState } = useForm<newPowerData>({
    resolver: zodResolver(newPowerBodySchema),
  })

  function handleSelectPower(id: string) {
    if (id === powerSelected) return setPowerSelected(null)

    setPowerSelected(id)
  }

  async function handleCreatePower(data: newPowerData) {
    const { resolved, error } = await callEvent.createObject<newPowerData>({
      path: 'powers',
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
    if (!powerSelected) return

    const { resolved, error } = await callEvent.createObjectReference({
      path: 'powers',
      referenceId: powerSelected,
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
      <NextSeo title={`${personName}-Novo poder | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens', `${personName}`, 'Poder', 'Novo']}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        inErrorNotAuthorized={permission !== 'edit'}
        isScrolling
      >
        <ToastError error={error} setError={setError} />

        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            icon={<Lightning size={40} />}
            label={
              powerSelected && power
                ? `Poder selecionado: ${power.infos.title}`
                : 'Novo poder'
            }
            inTop
          />

          <Text weight="bold" family="body" size="xl">
            Selecione um poder criado anteriormente para reaproveitar:
          </Text>

          <ContainerGrid padding={0} columns={powers[0] ? 3 : 1}>
            {powers[0] ? (
              powers.map((power) => (
                <Power
                  selected={
                    powerSelected === null ? true : powerSelected === power.id
                  }
                  power={power}
                  key={power.id}
                  onClick={() => handleSelectPower(power.id)}
                />
              ))
            ) : loadingPowers ? (
              <ContainerGrid padding={0} css={{ minHeight: '380px' }}>
                <Loading autoAdapt />
              </ContainerGrid>
            ) : (
              <ListEmpty message="Nenhum poder criado anteriormente... Vamos criar o primeiro?" />
            )}
          </ContainerGrid>

          {!powerSelected ? (
            <NewPowerForm onSubmit={handleSubmit(handleCreatePower)}>
              <Text weight="bold" size="xl" family="body">
                Está na hora de criar um nova poder para o seu personagem
              </Text>

              <ContainerGrid padding={0}>
                <LabelInput
                  error={formState.errors.title?.message}
                  label="Titulo do poder"
                >
                  <TextInputRoot>
                    <TextInputIcon>
                      <Lightning />
                    </TextInputIcon>

                    <TextInputInput
                      placeholder="Titulo exemplo"
                      {...register('title')}
                    />
                  </TextInputRoot>
                </LabelInput>

                <LabelInput
                  error={formState.errors.description?.message}
                  label="Descrição do poder:"
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
                  <Lightning />
                </ButtonIcon>

                <ButtonLabel>Criar poder</ButtonLabel>
              </ButtonRoot>
            </NewPowerForm>
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
                  Atribuir &quot;{power?.infos.title}&quot; ao personagem{' '}
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
