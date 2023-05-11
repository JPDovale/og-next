import { IError } from '@@types/errors/IError'
import { AvatarWeb } from '@components/usefull/Avatar'
import { Avatares } from '@components/usefull/Avatares'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { InputRadio } from '@components/usefull/InputRadio'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { LabelInput } from '@components/usefull/LabelInput'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { Text } from '@components/usefull/Text'
import { Textarea } from '@components/usefull/Textarea'
import { ToastError } from '@components/usefull/ToastError'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Users, UserSquare, UserSwitch } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { NewCoupleForm } from './styles'

const newCoupleBodySchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O titulo precisa ter pelo menos 2 caracteres' })
    .max(90, { message: 'O titulo não pode ter mais de 90 caracteres' }),

  description: z
    .string()
    .min(2, { message: 'A descrição precisa ter pelo menos 2 caracteres' })
    .max(1000, { message: 'A descrição não pode ter mais de 1000 caracteres' }),

  coupleId: z.string().uuid(),
  untilEnd: z.boolean({ description: 'Esse campo é obrigatório!' }),
})

type newCoupleData = z.infer<typeof newCoupleBodySchema>

export default function NewCouplePage() {
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id, personId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission, findManyPersons, findPerson } = useProject(
    id as string,
  )
  const { person, personName, loadingPerson, callEvent } = usePerson(
    personId as string,
  )

  const { handleSubmit, register, watch, formState, setValue } =
    useForm<newCoupleData>({
      resolver: zodResolver(newCoupleBodySchema),
    })

  const coupleId = watch('coupleId')
  const untilEnd = watch('untilEnd')

  const personsToPossibleApplyInCouple = findManyPersons(
    [coupleId, person?.id || ''],
    {
      reverse: true,
    },
  )

  const { person: personAppliedInPerson } = findPerson(coupleId)

  function handleSelectPersonToCouple(personId: string) {
    if (personId === coupleId) return
    setValue('coupleId', personId)
  }

  function handleUpdateUntilEnd(newState: any) {
    const newUntilEnd = newState as boolean

    if (newUntilEnd === untilEnd) return

    setValue('untilEnd', newUntilEnd)
  }

  async function handleCreateCouple(data: newCoupleData) {
    const { resolved, error } = await callEvent.createObject<newCoupleData>({
      path: 'couples',
      object: data,
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
      <NextSeo title={`${personName}-Novo casal | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens', `${personName}`, 'Casal', 'Novo']}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        inErrorNotAuthorized={permission !== 'edit'}
        isScrolling
      >
        <ToastError error={error} setError={setError} />

        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart icon={<Users size={40} />} label="Novo casal" inTop />

          <NewCoupleForm onSubmit={handleSubmit(handleCreateCouple)}>
            <LabelInput
              error={formState.errors.title?.message}
              label="Titulo do casal"
            >
              <TextInputRoot>
                <TextInputIcon>
                  <Users />
                </TextInputIcon>

                <TextInputInput
                  placeholder="Titulo exemplo"
                  {...register('title')}
                />
              </TextInputRoot>
            </LabelInput>

            <LabelInput
              error={formState.errors.description?.message}
              label="Descrição do casal:"
            >
              <Textarea
                placeholder="Descrição exemplo"
                resizable
                {...register('description')}
              />
            </LabelInput>

            <ContainerGrid padding={0} columns={2}>
              <InfoDefault title="Casal selecionado">
                <ContainerGrid padding={4} darkBackground>
                  {personAppliedInPerson ? (
                    <>
                      <ContainerGrid padding={0} css={{ display: 'flex' }}>
                        <AvatarWeb
                          size="5xl"
                          src={personAppliedInPerson.image_url ?? undefined}
                        />

                        <ContainerGrid padding={0}>
                          <ContainerGrid padding={0} columns={2}>
                            <InfoDefault size="lg" title="Nome:">
                              <Text
                                family="body"
                                size="xl"
                                height="shorter"
                                weight="bold"
                              >
                                {personAppliedInPerson.name}
                              </Text>
                            </InfoDefault>

                            <InfoDefault size="lg" title="Idade:">
                              <Text
                                family="body"
                                size="xl"
                                height="shorter"
                                weight="bold"
                              >
                                {personAppliedInPerson?.age}
                              </Text>
                            </InfoDefault>
                          </ContainerGrid>

                          <InfoDefault size="lg" title="História:">
                            <Text
                              family="body"
                              size="xl"
                              height="shorter"
                              weight="bold"
                            >
                              {`${personAppliedInPerson?.history.slice(
                                0,
                                280,
                              )}...`}
                            </Text>
                          </InfoDefault>
                        </ContainerGrid>
                      </ContainerGrid>
                      <LabelInput
                        error={formState.errors.untilEnd?.message}
                        label="Ficarão juntos até o fim da história?"
                      >
                        <InputRadio
                          state={untilEnd}
                          setState={handleUpdateUntilEnd}
                          values={[
                            {
                              label: 'Sim',
                              value: true,
                            },
                            {
                              label: 'Não',
                              value: false,
                            },
                          ]}
                        />
                      </LabelInput>
                    </>
                  ) : (
                    <ListEmpty
                      icon={<Users size={24} />}
                      message="Nenhum personagem foi selecionado ainda"
                    />
                  )}
                </ContainerGrid>
              </InfoDefault>

              <InfoDefault title="Personagens possíveis para selecionar">
                <ContainerGrid darkBackground>
                  {personsToPossibleApplyInCouple &&
                  personsToPossibleApplyInCouple[0] ? (
                    <Avatares
                      firstButtonFunction={handleSelectPersonToCouple}
                      firstButtonIcon={<UserSwitch />}
                      persons={personsToPossibleApplyInCouple}
                      size="xsm"
                      columns={10}
                      listEmptyMessage=""
                    />
                  ) : (
                    <ListEmpty
                      icon={<UserSquare size={24} />}
                      message="Nenhum personagem que possa ser adicionado foi criado ainda"
                      isInLine
                    />
                  )}
                </ContainerGrid>
              </InfoDefault>
            </ContainerGrid>

            <ButtonRoot type="submit" align="center">
              <ButtonIcon>
                <Users />
              </ButtonIcon>

              <ButtonLabel>Criar casal</ButtonLabel>
            </ButtonRoot>
          </NewCoupleForm>
        </ContainerGrid>
      </ProjectPageLayout>
    </>
  )
}
