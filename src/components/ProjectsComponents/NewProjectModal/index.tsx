import { ButtonIcon, ButtonLabel } from '@components/usefull/Button'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { FilePlus } from 'phosphor-react'
import { useContext, useState } from 'react'
// import { InputRadio } from '../../../InputRadio'
import { NewProjectForm, Submit } from './styles'
import { ModalContent } from '@components/usefull/ModalContent'
import { Toast } from '@components/usefull/Toast'
import { useProjects } from '@hooks/useProjects'
import { IError } from '@@types/errors/IError'
import { ToastError } from '@components/usefull/ToastError'
import { InterfaceContext } from '@contexts/interface'
import { LabelInput } from '@components/usefull/LabelInput'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { SelectFeatures } from '../SelectFeatures'
import { IKeysOfFeatures } from '@api/responsesTypes/IProjectResponse'
import { z } from 'zod'
import { ICreateProjectDTO } from '@api/dtos/ICreateProjectDTO'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { TimeChristSelect } from '@components/usefull/TimeChristSelelct'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// const typesOfProjects = [
//   { label: 'Book', value: 'book' },
//   { label: 'RPG', value: 'rpg' },
//   { label: 'Gameplay', value: 'gameplay' },
//   { label: 'RoadMap', value: 'roadMap' },
// ]

interface INewProjectModalProps {
  onSuccessCreateProject: () => void
}

const newProjectFormSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome do projeto precisa ter pelo menos 2 caracteres')
    .max(60, 'O nome do projeto não pode ter mais de 60 caracteres'),
  features: z.object({
    books: z.boolean().default(false),
    citys: z.boolean().default(false),
    familys: z.boolean().default(false),
    institutions: z.boolean().default(false),
    languages: z.boolean().default(false),
    nations: z.boolean().default(false),
    persons: z.boolean().default(true),
    planets: z.boolean().default(false),
    plot: z.boolean().default(true),
    powers: z.boolean().default(false),
    races: z.boolean().default(false),
    religions: z.boolean().default(false),
    timeLines: z.boolean().default(false),
  }),
  initialDate: z.coerce
    .number({
      invalid_type_error: 'Coloque apenas números',
    })
    .optional(),
  timeChrist: z.enum(['A.C.', 'D.C.']).default('D.C.'),
})

type INewProjectFormaData = z.infer<typeof newProjectFormSchema>

export function NewProjectModal({
  onSuccessCreateProject,
}: INewProjectModalProps) {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [error, setError] = useState<IError | null>(null)

  const {
    register,
    watch,
    handleSubmit,
    setError: setErrorForm,
    setValue,
    formState,
  } = useForm<INewProjectFormaData>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      features: {
        books: false,
        citys: false,
        familys: false,
        institutions: false,
        languages: false,
        nations: false,
        persons: true,
        planets: false,
        plot: true,
        powers: false,
        races: false,
        religions: false,
        timeLines: false,
      },
      timeChrist: 'D.C.',
    },
  })

  const featuresToUse = watch('features')
  const timeChrist = watch('timeChrist')

  const { loadingProjects, callEvent } = useProjects()
  const { theme } = useContext(InterfaceContext)

  const isDarkMode = theme === 'dark'

  async function handleChangeFeatures(
    featureName: IKeysOfFeatures,
    value: boolean,
  ) {
    const featuresValue = {
      ...featuresToUse,
      [featureName]: value,
    }

    setValue('features', featuresValue)
  }

  function handleSetTimeChrist(time: 'A.C.' | 'D.C.') {
    setValue('timeChrist', time)
  }

  async function handleNewProject(data: INewProjectFormaData) {
    if (data.features.timeLines && !data.initialDate) {
      setErrorForm('initialDate', {
        message:
          'Você precisa definir o ano em que a história se passa para continuar',
      })
      return
    }

    const newProject: ICreateProjectDTO = {
      name: data.name,
      private: false,
      type: 'book',
      features: featuresToUse,
      timeLine: featuresToUse.timeLines
        ? {
            initialDate: data.initialDate!,
            timeChrist: data.timeChrist!,
          }
        : undefined,
    }

    console.log(newProject)

    const { resolved, error } = await callEvent.createProject(newProject)

    if (error) {
      setError(error)
      return
    }

    if (resolved) {
      setSuccessToastOpen(true)
      onSuccessCreateProject()
    }
  }

  return (
    <ModalContent title="Novo projeto">
      <Toast
        setOpen={setSuccessToastOpen}
        open={successToastOpen}
        title="Projeto criado"
        message="Você acabou de criar um novo projeto... Acesse seus projetos para ver"
      />

      <ToastError error={error} setError={setError} />

      <NewProjectForm
        onSubmit={handleSubmit(handleNewProject)}
        darkMode={isDarkMode}
      >
        <LabelInput
          label="Nome do projeto"
          error={formState.errors.name?.message}
        >
          <TextInputRoot
            size="sm"
            css={{ background: !isDarkMode ? '$base700' : '' }}
            variant={formState.errors.name ? 'denied' : 'default'}
          >
            <TextInputInput
              css={{ color: isDarkMode ? '$white' : '' }}
              placeholder="Insira o nome do projeto"
              {...register('name')}
            />
          </TextInputRoot>
        </LabelInput>

        <InfoDefault
          size="sm"
          title="Quais modelos você deseja usar no seu novo projeto?"
        >
          <SelectFeatures
            css={{ marginTop: '$4' }}
            columns={8}
            features={featuresToUse}
            setFeature={handleChangeFeatures}
          />
        </InfoDefault>

        {featuresToUse?.timeLines && (
          <ContainerGrid
            padding={0}
            css={{ display: 'flex', alignItems: 'center' }}
          >
            <LabelInput
              label="Ano em que a história se passa"
              error={formState.errors.initialDate?.message}
            >
              <TextInputRoot
                size="sm"
                css={{ background: !isDarkMode ? '$base700' : '' }}
                variant={formState.errors.initialDate ? 'denied' : 'default'}
              >
                <TextInputInput
                  css={{ color: isDarkMode ? '$white' : '' }}
                  placeholder="Insira o ano em que a história se passa"
                  {...register('initialDate')}
                />
              </TextInputRoot>
            </LabelInput>

            <InfoDefault
              css={{ width: '30%' }}
              title="Antes ou depois de Cristo?"
            >
              <TimeChristSelect
                value={timeChrist}
                setValue={handleSetTimeChrist}
                activeThemeVerification
              />
            </InfoDefault>
          </ContainerGrid>
        )}

        {/* <Input as="label" size="xs">
            Selecione o tipo do projeto {type}
            <Text
              as="span"
              size="xxs"
              css={{
                color: '$errorDefault',
              }}
            >
              {errorIn === 'type' &&
                'Você precisa definir um tipo para continuar'}
            </Text>
            <InputRadio values={typesOfProjects} setState={setType} />
          </Input> */}
        {/* <Input as="label" size="xs">
            O projeto é privado {isPrivate}
            <InputRadio
              values={[
                { label: 'Sim', value: true },
                { label: 'Não', value: false },
              ]}
              setState={setIsPrivate}
            />
          </Input>
          {isPrivate === true && (
            <Input as="label" size="xs">
              Senha do projeto
              <TextInputRoot
                placeholder="Insira uma senha para o projeto"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Input>
          )} */}
        <Submit
          disabled={loadingProjects}
          align="center"
          wid="full"
          variant="noShadow"
          size="sm"
        >
          <ButtonIcon>
            <FilePlus />
          </ButtonIcon>

          <ButtonLabel>Criar projeto</ButtonLabel>
        </Submit>
      </NewProjectForm>
    </ModalContent>
  )
}
