import * as Dialog from '@radix-ui/react-dialog'

import { ModelCard } from '@components/ModelCard'
import { FilePlus } from 'phosphor-react'
import { NewProjectModal } from '../NewProjectModal'
import { useState } from 'react'

export function CardModelNewProject() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <Dialog.Root open={modalIsOpen} onOpenChange={setModalIsOpen}>
      <Dialog.Trigger asChild>
        <ModelCard icon={<FilePlus />} title="Novo projeto" />
      </Dialog.Trigger>

      <NewProjectModal onSuccessCreateProject={() => setModalIsOpen(false)} />
    </Dialog.Root>
  )
}
