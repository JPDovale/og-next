import * as Dialog from '@radix-ui/react-dialog'

import { ModelCard } from '@components/ModelCard'
import { Package } from 'phosphor-react'
import { NewBoxModal } from '../NewBoxModal'
import { useState } from 'react'
import { Toast } from '@components/usefull/Toast'

export function CardModelNewBox() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <ModelCard icon={<Package />} title="Nova box" />
        </Dialog.Trigger>

        <NewBoxModal onSuccess={() => setSuccessToastOpen(true)} />
      </Dialog.Root>

      <Toast
        open={successToastOpen}
        setOpen={setSuccessToastOpen}
        title="Box criada"
        message="Parabéns! Você acabou de criar uma nova box! Acesse a aba 'boxes' para ver."
      />
    </>
  )
}
