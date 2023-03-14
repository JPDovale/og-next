import { ToastError } from '@components/usefull/ToastError'
import { ProjectsContext } from '@contexts/projects'
import { useBox } from '@hooks/useBox'
import { DashboardPageLayout } from '@layouts/DashboardPageLayout'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function BoxPage() {
  const { loading, error, setError } = useContext(ProjectsContext)

  const router = useRouter()
  const { boxId } = router.query

  const { findBox } = useBox()
  const box = findBox(boxId as string)

  return (
    <DashboardPageLayout loading={loading} window={`Box: ${box?.name}`}>
      <ToastError error={error} setError={setError} />
    </DashboardPageLayout>
  )
}
