import * as Dialog from '@radix-ui/react-dialog'

import { ModelCard } from '@components/ModelCard'
import { UserCirclePlus } from 'phosphor-react'
import { NewPersonModal } from '../NewPersonModal'
import { Toast } from '@components/usefull/Toast'
import { useState } from 'react'

interface ICardModelNewPerson {
  disabled: boolean
}

export function CardModelNewPerson({ disabled }: ICardModelNewPerson) {
  const [successToastOpen, setSuccessToastOpen] = useState(false)

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <ModelCard
            icon={<UserCirclePlus />}
            title="Novo personagem"
            disabled={disabled}
          />
        </Dialog.Trigger>

        <NewPersonModal onSuccess={() => setSuccessToastOpen(true)} />
      </Dialog.Root>

      <Toast
        open={successToastOpen}
        setOpen={setSuccessToastOpen}
        title="Personagem criada"
        message="Parabéns! Você acabou de criar uma nova personagem! Acesse a aba de personagens para ver."
      />
    </>
  )
}
