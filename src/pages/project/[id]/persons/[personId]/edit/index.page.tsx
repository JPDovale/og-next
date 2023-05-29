import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { EditContainer, Info } from './styles'
import {
  Crosshair,
  HeartBreak,
  Lightning,
  PencilLine,
  Person,
  RainbowCloud,
  SketchLogo,
  Trash,
  TreeStructure,
  UserCircleGear,
  Users,
  Warning,
} from 'phosphor-react'
import { NextSeo } from 'next-seo'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { useWindowSize } from '@hooks/useWindow'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { TextEditor } from '@components/TextEditor'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { usePerson } from '@hooks/usePerson'
import { getDate } from '@utils/dates/getDate'
import { IUpdatePersonDTO } from '@api/dtos/IUpdatePersonDTO'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { LabelInput } from '@components/usefull/LabelInput'
import { Checkbox } from '@components/usefull/Checkbox'
import { InterfaceContext } from '@contexts/interface'

const personFormSchema = z.object({
  name: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  age: z.coerce
    .number()
    .max(999999, 'A idade maxima permitida é 999999')
    .optional()
    .nullable(),
  history: z.string().optional().nullable(),
  bornMonth: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no mês.' })
    .min(0, { message: 'O mês precisa ser maior ou igual à 0' })
    .max(12, { message: 'Existem apenas 12 meses no ano' })
    .optional()
    .nullable(),
  bornDay: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no dia.' })
    .min(0, { message: 'O dia precisa ser maior ou igual à 0' })
    .max(31, { message: 'Existem apenas 31 dias no mês' })
    .optional()
    .nullable(),
  bornHour: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números na hora.' })
    .min(0, { message: 'A hora precisa ser maior ou igual à 0' })
    .max(24, { message: 'Existem apenas 24 horas no dia' })
    .optional()
    .nullable(),
  bornMinute: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no minuto.' })
    .min(0, { message: 'Os minutos precisam ser maior ou igual à 0' })
    .max(60, { message: 'Existem apenas 60 minutos em uma hora' })
    .optional()
    .nullable(),
  bornSecond: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no segundo.' })
    .min(0, { message: 'Os segundos precisam ser maior ou igual à 0' })
    .max(60, { message: 'Existem apenas 60 segundos em um minuto' })
    .optional()
    .nullable(),
})

type PersonFormData = z.infer<typeof personFormSchema>

export default function EditPersonPage() {
  const [unknownAge, setUnknownAge] = useState(false)

  const { setError } = useContext(InterfaceContext)

  const router = useRouter()
  const { id, personId } = router.query
  usePreventBack(`/project/${id}/persons/${personId}`)

  const { register, handleSubmit, formState, watch, reset, setValue } =
    useForm<PersonFormData>({
      resolver: zodResolver(personFormSchema),
    })

  const name = watch('name')
  const lastName = watch('lastName')
  const age = watch('age')
  const history = watch('history')
  const bornMonth = watch('bornMonth')
  const bornDay = watch('bornDay')
  const bornHour = watch('bornHour')
  const bornMinute = watch('bornMinute')
  const bornSecond = watch('bornSecond')

  const { project, projectName, permission } = useProject(id as string)
  const { person, personName, loadingPerson, callEvent } = usePerson(
    personId as string,
  )

  useEffect(() => {
    if (unknownAge) {
      setValue('age', null)
      setValue('bornMonth', null)
      setValue('bornDay', null)
      setValue('bornHour', null)
      setValue('bornMinute', null)
      setValue('bornSecond', null)
    }
  }, [unknownAge, setValue])

  const { smallWindow } = useWindowSize()

  const { GoBackButton } = usePreventBack(
    `/project/${project?.id}/persons/${person?.id}`,
  )

  async function handleUpdatePerson() {
    const updatedPerson: IUpdatePersonDTO = {
      name: name || undefined,
      lastName: lastName || undefined,
      age: age === null ? null : age || undefined,
      history: history === person?.history ? undefined : history,
      bornDay: bornDay?.toString() ? bornDay?.toString() : undefined,
      bornHour: bornHour?.toString() ? bornHour?.toString() : undefined,
      bornMinute: bornMinute?.toString() ? bornMinute?.toString() : undefined,
      bornMonth: bornMonth?.toString() ? bornMonth?.toString() : undefined,
      bornSecond: bornSecond?.toString() ? bornSecond?.toString() : undefined,
    }

    const { resolved, error } = await callEvent.update(updatedPerson)

    if (error) {
      setError(error)
      return
    }

    if (resolved) {
      reset()
    }
  }

  async function handleDeletePerson() {
    router.push(`/project/${id}/persons`)

    await callEvent.delete()
  }

  return (
    <>
      <NextSeo title={`${personName}-Editar | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens', `${personName}`, 'Edição']}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        isScrolling
      >
        <EditContainer onSubmit={handleSubmit(handleUpdatePerson)}>
          <GoBackButton topDistance={4} />

          <ContainerGrid padding={4} darkBackground>
            <ContainerGrid padding={0}>
              <LabelInput label="Nome" error={formState.errors.name?.message}>
                <TextInputRoot size="sm">
                  <TextInputInput
                    placeholder={person?.name}
                    {...register('name')}
                  />
                </TextInputRoot>
              </LabelInput>

              <LabelInput
                label="Sobrenome"
                error={formState.errors.lastName?.message}
              >
                <TextInputRoot size="sm">
                  <TextInputInput
                    placeholder={person?.last_name}
                    {...register('lastName')}
                  />
                </TextInputRoot>
              </LabelInput>

              <LabelInput label="Idade" error={formState.errors.age?.message}>
                <TextInputRoot size="sm">
                  <TextInputInput
                    placeholder={
                      person?.age ? person.age.toString() : 'Idade desconhecida'
                    }
                    {...register('age')}
                  />
                </TextInputRoot>
              </LabelInput>

              {person?.age && (
                <LabelInput label="Idade desconhecida">
                  <Checkbox
                    checked={unknownAge}
                    onCheckedChange={() => setUnknownAge(!unknownAge)}
                  />
                </LabelInput>
              )}
            </ContainerGrid>

            {project?.features.timeLines && (
              <ContainerGrid padding={0} columns={5}>
                <LabelInput
                  label="Mês do nascimento"
                  error={formState.errors?.bornMonth?.message}
                >
                  <TextInputRoot
                    size="sm"
                    variant={
                      formState.errors.bornMonth?.message ? 'denied' : 'default'
                    }
                  >
                    <TextInputInput
                      placeholder={
                        person?.age ? person?.born_month : 'Desconhecido'
                      }
                      {...register('bornMonth')}
                    />
                  </TextInputRoot>
                </LabelInput>

                <LabelInput
                  label="Dia do nascimento"
                  error={formState.errors?.bornDay?.message}
                >
                  <TextInputRoot
                    size="sm"
                    variant={
                      formState.errors.bornDay?.message ? 'denied' : 'default'
                    }
                  >
                    <TextInputInput
                      placeholder={
                        person?.age
                          ? person?.born_day.toString()
                          : 'Desconhecido'
                      }
                      {...register('bornDay')}
                    />
                  </TextInputRoot>
                </LabelInput>

                <LabelInput
                  label="Hora do nascimento"
                  error={formState.errors?.bornHour?.message}
                >
                  <TextInputRoot
                    size="sm"
                    variant={
                      formState.errors.bornHour?.message ? 'denied' : 'default'
                    }
                  >
                    <TextInputInput
                      placeholder={
                        person?.age
                          ? person?.born_hour.toString()
                          : 'Desconhecido'
                      }
                      {...register('bornHour')}
                    />
                  </TextInputRoot>
                </LabelInput>

                <LabelInput
                  label="Minuto do nascimento"
                  error={formState.errors?.bornMinute?.message}
                >
                  <TextInputRoot
                    size="sm"
                    variant={
                      formState.errors.bornMinute?.message
                        ? 'denied'
                        : 'default'
                    }
                  >
                    <TextInputInput
                      placeholder={
                        person?.age
                          ? person?.born_minute.toString()
                          : 'Desconhecido'
                      }
                      {...register('bornMinute')}
                    />
                  </TextInputRoot>
                </LabelInput>

                <LabelInput
                  label="Segundo do nascimento"
                  error={formState.errors?.bornSecond?.message}
                >
                  <TextInputRoot
                    size="sm"
                    variant={
                      formState.errors.bornSecond?.message
                        ? 'denied'
                        : 'default'
                    }
                  >
                    <TextInputInput
                      placeholder={
                        person?.age
                          ? person?.born_second.toString()
                          : 'Desconhecido'
                      }
                      {...register('bornSecond')}
                    />
                  </TextInputRoot>
                </LabelInput>
              </ContainerGrid>
            )}
          </ContainerGrid>

          <ContainerGrid padding={4} darkBackground>
            <Text family="body" as="label" css={{ color: '$base900' }}>
              História
              {/* <Textarea
                placeholder={person?.history || 'Carregando...'}
                {...register('history')}
                css={{ fontSize: '$lg', minHeight: '430px' }}
              /> */}
            </Text>
            <TextEditor
              initialValue={person?.history}
              setValue={(e) => setValue('history', e)}
              permission={permission}
            />
          </ContainerGrid>

          <ButtonRoot
            type="submit"
            wid={smallWindow ? 'full' : 'middle'}
            align="center"
            disabled={formState.isSubmitting}
            css={{
              padding: '$3 $10',
              alignSelf: 'center',
              marginTop: '$4',
              marginBottom: '$8',
            }}
          >
            <ButtonIcon>
              <PencilLine />
            </ButtonIcon>

            <ButtonLabel>Salvar alterações</ButtonLabel>
          </ButtonRoot>

          <Info isCard columns={2}>
            <Text family="body" as="label">
              <header>Data de criação</header>
              <Text size="sm">
                {person?.created_at
                  ? getDate(person.created_at)
                  : 'Carregando...'}
              </Text>
            </Text>

            <Text family="body" as="label">
              <header>Ultima alteração</header>
              <Text size="sm">
                {person?.updated_at
                  ? getDate(person.updated_at)
                  : 'Carregando...'}
              </Text>
            </Text>
          </Info>

          <Info columns={smallWindow ? 2 : 3} isCard>
            <Text family="body" as="label">
              <header>
                <Crosshair />
                Objetivos criados
              </header>
              <Text>{person?.objectives?.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <RainbowCloud />
                Sonhos criados
              </header>
              <Text>{person?.dreams?.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Warning />
                Medos criados
              </header>
              <Text>{person?.fears?.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Person />
                Aparências criadas
              </header>
              <Text>{person?.appearances?.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <UserCircleGear />
                Personalidades criadas
              </header>
              <Text>{person?.personalities?.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Lightning />
                Poderes criados
              </header>
              <Text>{person?.powers?.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <HeartBreak />
                Traumas criados
              </header>
              <Text>{person?.traumas?.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <TreeStructure />
                Valores criados
              </header>
              <Text>{person?.values?.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <SketchLogo />
                Desejos criados
              </header>
              <Text>{person?.wishes?.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Users />
                Casais
              </header>
              <Text>{person?.couples?.length || 0}</Text>
            </Text>
          </Info>
        </EditContainer>

        <ContainerGrid padding={4}>
          <InfoDefault title="Alerta">
            <Text css={{ color: '$fullError' }} weight="bold">
              Area de deleção do personagem...
            </Text>
          </InfoDefault>

          <Text size="lg" family="body" weight="bold">
            Ao clicar no botão você pagará o personagem... Isso não poderá ser
            desfeito
          </Text>

          <ButtonRoot
            align="center"
            css={{ background: '$fullError' }}
            onClick={handleDeletePerson}
          >
            <ButtonIcon>
              <Trash />
            </ButtonIcon>

            <ButtonLabel>Apagar</ButtonLabel>
          </ButtonRoot>
        </ContainerGrid>
      </ProjectPageLayout>
    </>
  )
}
