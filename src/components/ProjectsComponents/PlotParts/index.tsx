import { useProject } from '@hooks/useProject'

import { PlotPart } from './components/PlotPart'

import { PlotPartsContainer } from './styles'

interface IPlotPartsProps {
  projectId: string
  isPreview?: boolean
  columns?: 1 | 2 | 3 | 4
}

export function PlotParts({
  projectId,
  // book,
  isPreview = false,
  columns = 3,
}: IPlotPartsProps) {
  const { permission, project } = useProject(projectId)

  const isToProject = true
  const idObject = project?.id ?? ''

  return (
    <PlotPartsContainer isPreview={isPreview} columns={columns}>
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Ideia central"
        element={project?.one_phrase}
        disabled={permission !== 'edit' && !project?.one_phrase}
        keyValue={`${!isToProject ? 'plot/' : ''}onePhrase`}
      />

      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Premissa"
        element={project?.premise}
        disabled={permission !== 'edit' && !project?.premise}
        keyValue={`${!isToProject ? 'plot/' : ''}premise`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Narrador"
        element={project?.storyteller}
        disabled={permission !== 'edit' && !project?.storyteller}
        keyValue={`${!isToProject ? 'plot/' : ''}storyteller`}
      />
      {project && (
        <>
          <PlotPart
            isToProject={isToProject}
            idObject={idObject}
            isPreview={isPreview}
            permission={permission}
            to="Gênero literário"
            element={project.literary_genre}
            disabled={permission !== 'edit' && !project.literary_genre}
            keyValue={`${!isToProject ? 'plot/' : ''}literaryGenere`}
          />
          <PlotPart
            isToProject={isToProject}
            idObject={idObject}
            isPreview={isPreview}
            permission={permission}
            to="Subgênero"
            element={project.subgenre}
            disabled={permission !== 'edit' && !project.subgenre}
            keyValue={`${!isToProject ? 'plot/' : ''}subgenre`}
          />
        </>
      )}

      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Ambiente"
        element={project?.ambient}
        disabled={permission !== 'edit' && !project?.ambient}
        keyValue={`${!isToProject ? 'plot/' : ''}ambient`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Tempo em que se passa"
        element={project?.count_time}
        disabled={permission !== 'edit' && !project?.count_time}
        keyValue={`${!isToProject ? 'plot/' : ''}countTime`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Fato histórico"
        element={project?.historical_fact}
        disabled={permission !== 'edit' && !project?.historical_fact}
        keyValue={`${!isToProject ? 'plot/' : ''}historicalFact`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Detalhes"
        element={project?.details}
        disabled={permission !== 'edit' && !project?.details}
        keyValue={`${!isToProject ? 'plot/' : ''}details`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Resumo"
        element={project?.summary}
        disabled={permission !== 'edit' && !project?.summary}
        keyValue={`${!isToProject ? 'plot/' : ''}summary`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 1"
        element={project?.structure_act_1 || ''}
        disabled={permission !== 'edit' && !project?.structure_act_1}
        keyValue={`${!isToProject ? 'plot/' : ''}structure`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 2"
        element={project?.structure_act_2 || ''}
        disabled={permission !== 'edit' && !project?.structure_act_1}
        keyValue={`${!isToProject ? 'plot/' : ''}structure`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 3"
        element={project?.structure_act_3 || ''}
        disabled={permission !== 'edit' && !project?.structure_act_1}
        keyValue={`${!isToProject ? 'plot/' : ''}structure`}
      />
    </PlotPartsContainer>
  )
}
