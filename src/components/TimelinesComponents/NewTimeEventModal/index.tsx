import { useContext, useState } from 'react'
import { ModalContent } from '@components/usefull/ModalContent'
import { InterfaceContext } from '@contexts/interface'
import { z } from 'zod'
import { ButtonImportance, NewTimeEventForm } from './styles'
import { LabelInput } from '@components/usefull/LabelInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { Textarea } from '@components/usefull/Textarea'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { TimeChristSelect } from '@components/usefull/TimeChristSelelct'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { FilePlus } from 'phosphor-react'
import { useProject } from '@hooks/useProject'
import { IError } from '@@types/errors/IError'
import { ToastError } from '@components/usefull/ToastError'
import { Toast } from '@components/usefull/Toast'

const newTimeEventFormSchema = z.object({
  happenedYear: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no mês.' })
    .max(1000000000000, { message: 'Existem apenas 12 meses no ano' }),
  happenedMonth: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no mês.' })
    .min(1, { message: 'O mês precisa ser maior que 0' })
    .max(12, { message: 'Existem apenas 12 meses no ano' }),
  happenedDay: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no dia.' })
    .min(1, { message: 'O dia precisa ser maior ou que 0' })
    .max(31, { message: 'Existem apenas 31 dias no mês' }),
  happenedHour: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números na hora.' })
    .min(0, { message: 'A hora precisa ser maior ou igual à 0' })
    .max(24, { message: 'Existem apenas 24 horas no dia' })
    .optional()
    .nullable(),
  happenedMinute: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no minuto.' })
    .min(0, { message: 'Os minutos precisam ser maior ou igual à 0' })
    .max(60, { message: 'Existem apenas 60 minutos em uma hora' })
    .optional()
    .nullable(),
  happenedSecond: z.coerce
    .number({ invalid_type_error: 'Coloque apenas números no segundo.' })
    .min(0, { message: 'Os segundos precisam ser maior ou igual à 0' })
    .max(60, { message: 'Existem apenas 60 segundos em um minuto' })
    .optional()
    .nullable(),
  timeChrist: z.enum(['A.C.', 'D.C.']).default('D.C.'),
  title: z
    .string()
    .min(2, { message: 'O titulo precisa ter pelo menos 2 caracteres' })
    .max(160, { message: ' O titulo não pode ter mais de 160 caracteres' }),
  description: z
    .string()
    .min(2, { message: 'a descrição precisa ter pelo menos 2 caracteres' })
    .max(600, { message: ' a descrição não pode ter mais de 600 caracteres' }),
  importance: z
    .enum(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
    .default('5'),
})

type INewTimeEventFormaData = z.infer<typeof newTimeEventFormSchema>
type IImportance = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'

interface INewTimeEventModal {
  projectId: string
}

export function NewTimeEventModal({ projectId }: INewTimeEventModal) {
  const [error, setError] = useState<IError | null>(null)
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const { theme } = useContext(InterfaceContext)
  const isDarkMode = theme === 'dark'

  const { callEvent } = useProject(projectId)

  const { formState, handleSubmit, register, watch, setValue, reset } =
    useForm<INewTimeEventFormaData>({
      resolver: zodResolver(newTimeEventFormSchema),
      defaultValues: {
        happenedYear: 0,
        happenedHour: 0,
        happenedMinute: 0,
        happenedSecond: 0,
        importance: '5',
        timeChrist: 'D.C.',
      },
    })
  const timeChrist = watch('timeChrist')
  const importance = watch('importance')

  async function handleCreateNewTimeEvent(data: INewTimeEventFormaData) {
    const { resolved, error } = await callEvent.createTimeEventOnMainTimeLien(
      data,
    )

    if (resolved) {
      reset()
      setSuccessToastOpen(true)
    }

    if (error) {
      setError(error)
    }
  }

  return (
    <ModalContent title="Novo evento na linha do tempo" sizeWid="lg">
      <ToastError error={error} setError={setError} />

      <Toast
        open={successToastOpen}
        setOpen={setSuccessToastOpen}
        title="Evento criado"
        message="Você acabou de criar um evento na sua linha do tempo"
      />
      <NewTimeEventForm
        darkMode={isDarkMode}
        onSubmit={handleSubmit(handleCreateNewTimeEvent)}
      >
        <LabelInput label="Titulo:" error={formState.errors.title?.message}>
          <TextInputRoot
            size="sm"
            css={{ background: !isDarkMode ? '$base700' : '' }}
          >
            <TextInputInput
              css={{ color: isDarkMode ? '$white' : '' }}
              placeholder="Titulo do evento"
              {...register('title')}
            />
          </TextInputRoot>
        </LabelInput>

        <LabelInput
          label="Descrição:"
          error={formState.errors.description?.message}
        >
          <Textarea
            css={{
              background: !isDarkMode ? '$base700' : '',
              color: isDarkMode ? '$white' : '',
            }}
            placeholder="Descrição do evento"
            {...register('description')}
          />
        </LabelInput>

        <ContainerGrid padding={0} columns={2}>
          <InfoDefault title="Antes ou depois de Cristo?">
            <TimeChristSelect
              value={timeChrist}
              setValue={(newTimeChrist) =>
                setValue('timeChrist', newTimeChrist)
              }
              activeThemeVerification
            />
          </InfoDefault>

          <InfoDefault title="Defina a importância do evento">
            <ContainerGrid padding={0} columns={10}>
              {Array.from({
                length: 10,
              }).map((_, i) => (
                <ButtonImportance
                  key={i}
                  type="button"
                  align="center"
                  size="xs"
                  variant={importance === `${i + 1}` ? 'active' : 'noShadow'}
                  onClick={() =>
                    setValue('importance', `${i + 1}` as IImportance)
                  }
                  importance={`${i + 1}` as IImportance}
                >
                  <ButtonLabel>{i + 1}</ButtonLabel>
                </ButtonImportance>
              ))}
            </ContainerGrid>
          </InfoDefault>
        </ContainerGrid>

        <ContainerGrid padding={0} columns={3}>
          <LabelInput
            label="Ano:"
            error={formState.errors.happenedYear?.message}
          >
            <TextInputRoot
              size="xs"
              variant="noShadow"
              css={{ background: !isDarkMode ? '$base700' : '' }}
            >
              <TextInputInput
                css={{ color: isDarkMode ? '$white' : '' }}
                placeholder="Ano"
                {...register('happenedYear')}
              />
            </TextInputRoot>
          </LabelInput>

          <LabelInput
            label="Mês:"
            error={formState.errors.happenedMonth?.message}
          >
            <TextInputRoot
              size="xs"
              variant="noShadow"
              css={{ background: !isDarkMode ? '$base700' : '' }}
            >
              <TextInputInput
                css={{ color: isDarkMode ? '$white' : '' }}
                placeholder="Mês"
                {...register('happenedMonth')}
              />
            </TextInputRoot>
          </LabelInput>

          <LabelInput
            label="Dia:"
            error={formState.errors.happenedDay?.message}
          >
            <TextInputRoot
              size="xs"
              variant="noShadow"
              css={{ background: !isDarkMode ? '$base700' : '' }}
            >
              <TextInputInput
                css={{ color: isDarkMode ? '$white' : '' }}
                placeholder="Dia"
                {...register('happenedDay')}
              />
            </TextInputRoot>
          </LabelInput>

          <LabelInput
            label="Hora: (opcional)"
            error={formState.errors.happenedHour?.message}
          >
            <TextInputRoot
              size="xs"
              variant="noShadow"
              css={{ background: !isDarkMode ? '$base700' : '' }}
            >
              <TextInputInput
                css={{ color: isDarkMode ? '$white' : '' }}
                placeholder="Hora"
                {...register('happenedHour')}
              />
            </TextInputRoot>
          </LabelInput>

          <LabelInput
            label="Minuto: (opcional)"
            error={formState.errors.happenedMinute?.message}
          >
            <TextInputRoot
              size="xs"
              variant="noShadow"
              css={{ background: !isDarkMode ? '$base700' : '' }}
            >
              <TextInputInput
                css={{ color: isDarkMode ? '$white' : '' }}
                placeholder="Minuto"
                {...register('happenedMinute')}
              />
            </TextInputRoot>
          </LabelInput>

          <LabelInput
            label="Segundo: (opcional)"
            error={formState.errors.happenedSecond?.message}
          >
            <TextInputRoot
              size="xs"
              variant="noShadow"
              css={{ background: !isDarkMode ? '$base700' : '' }}
            >
              <TextInputInput
                css={{ color: isDarkMode ? '$white' : '' }}
                placeholder="Segundo"
                {...register('happenedSecond')}
              />
            </TextInputRoot>
          </LabelInput>
        </ContainerGrid>

        <ButtonRoot align="center" wid="full" variant="noShadow" size="sm">
          <ButtonIcon>
            <FilePlus />
          </ButtonIcon>

          <ButtonLabel>Criar evento na linha do tempo</ButtonLabel>
        </ButtonRoot>
      </NewTimeEventForm>
    </ModalContent>
  )
}
