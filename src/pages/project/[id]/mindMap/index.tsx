// import { MindMap } from '@components/ProjectsComponents/MindMap'
// import { Loading } from '@components/usefull/Loading'
// import { ProjectsContext } from '@contexts/projects'
// import { useProject } from '@hooks/useProject'
// import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
// import { NextSeo } from 'next-seo'
// import { useRouter } from 'next/router'
// import { useContext } from 'react'

// import { MindMapPageContainer } from './styles'

// export default function MindMapPage() {
//   const { loading } = useContext(ProjectsContext)

//   const router = useRouter()
//   const { id } = router.query

//   const { project, projectName } = useProject(id as string)

//   return (
//     <>
//       <NextSeo title={`${projectName}-Mind map view | Magiscrita`} noindex />

//       <ProjectPageLayout
//         projectName={projectName}
//         projectId={`${id}`}
//         paths={['Mind map view']}
//         loading={loading}
//         inError={!loading && !project}
//         isFullScreen
//       >
//         <MindMapPageContainer>
//           {loading ? <Loading /> : <MindMap />}
//         </MindMapPageContainer>
//       </ProjectPageLayout>
//     </>
//   )
// }
