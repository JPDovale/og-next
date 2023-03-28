import * as Dialog from '@radix-ui/react-dialog'

import { ModelCard } from '@components/ModelCard'
import { FilePlus } from 'phosphor-react'
import { NewProjectModal } from '../NewProjectModal'

export function CardModelNewProject() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ModelCard icon={<FilePlus />} title="Novo projeto" />
      </Dialog.Trigger>

      <NewProjectModal />
    </Dialog.Root>
  )
}
