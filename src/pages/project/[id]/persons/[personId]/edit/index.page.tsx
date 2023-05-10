import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
import { ToastError } from '@components/usefull/ToastError'
import { usePerson } from '@hooks/usePerson'
import { getDate } from '@utils/dates/getDate'
import { IError } from '@@types/errors/IError'
import { IUpdatePersonDTO } from '@api/dtos/IUpdatePersonDTO'
import { InfoDefault } from '@components/usefull/InfoDefault'

const personFormSchema = z.object({
  name: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  age: z.coerce.number().optional().nullable(),
  history: z.string().optional().nullable(),
})

type PersonFormData = z.infer<typeof personFormSchema>

export default function EditPersonPage() {
  const [error, setError] = useState<IError | null>(null)

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

  const { project, projectName, permission } = useProject(id as string)
  const { person, personName, loadingPerson, callEvent } = usePerson(
    personId as string,
  )

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const { GoBackButton } = usePreventBack(
    `/project/${project?.id}/persons/${person?.id}`,
  )

  async function handleUpdatePerson() {
    const updatedPerson: IUpdatePersonDTO = {
      name: name || person?.name,
      lastName: lastName || person?.last_name,
      age: age || person?.age,
      history: history || person?.history,
      birthHour: '00',
    }

    const { resolved, error } = await callEvent.update(updatedPerson)

    console.log(error)

    if (resolved) {
      reset()
    }

    if (error) {
      setError(error)
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

          <ToastError error={error} setError={setError} />

          <Info isCard columns={smallWindow ? 1 : 3}>
            <Text family="body" as="label">
              Nome
              <TextInputRoot>
                <TextInputInput
                  placeholder={person?.name}
                  {...register('name')}
                />
              </TextInputRoot>
            </Text>

            <Text family="body" as="label">
              Sobrenome
              <TextInputRoot>
                <TextInputInput
                  placeholder={person?.last_name || 'Carregando...'}
                  {...register('lastName')}
                />
              </TextInputRoot>
            </Text>

            <Text family="body" as="label">
              Idade
              <TextInputRoot>
                <TextInputInput
                  placeholder={person?.age.toString() || 'Carregando...'}
                  {...register('age')}
                />
              </TextInputRoot>
            </Text>
          </Info>

          <ContainerGrid darkBackground>
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
            disabled={
              !!(!name && !lastName && !age && !history) ||
              formState.isSubmitting
            }
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
