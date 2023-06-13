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
        element={project?.plot?.onePhrase}
        disabled={permission !== 'edit' && !project?.plot?.onePhrase}
        keyValue={`${!isToProject ? 'plot/' : ''}onePhrase`}
      />

      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Premissa"
        element={project?.plot?.premise}
        disabled={permission !== 'edit' && !project?.plot?.premise}
        keyValue={`${!isToProject ? 'plot/' : ''}premise`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Narrador"
        element={project?.plot.storyteller}
        disabled={permission !== 'edit' && !project?.plot.storyteller}
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
            element={project.plot.literaryGenre}
            disabled={permission !== 'edit' && !project.plot.literaryGenre}
            keyValue={`${!isToProject ? 'plot/' : ''}literaryGenere`}
          />
          <PlotPart
            isToProject={isToProject}
            idObject={idObject}
            isPreview={isPreview}
            permission={permission}
            to="Subgênero"
            element={project.plot.subgenre}
            disabled={permission !== 'edit' && !project.plot.subgenre}
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
        element={project?.plot.ambient}
        disabled={permission !== 'edit' && !project?.plot.ambient}
        keyValue={`${!isToProject ? 'plot/' : ''}ambient`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Tempo em que se passa"
        element={project?.plot.countTime}
        disabled={permission !== 'edit' && !project?.plot.countTime}
        keyValue={`${!isToProject ? 'plot/' : ''}countTime`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Fato histórico"
        element={project?.plot.historicalFact}
        disabled={permission !== 'edit' && !project?.plot.historicalFact}
        keyValue={`${!isToProject ? 'plot/' : ''}historicalFact`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Detalhes"
        element={project?.plot.details}
        disabled={permission !== 'edit' && !project?.plot.details}
        keyValue={`${!isToProject ? 'plot/' : ''}details`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Resumo"
        element={project?.plot.summary}
        disabled={permission !== 'edit' && !project?.plot.summary}
        keyValue={`${!isToProject ? 'plot/' : ''}summary`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 1"
        element={project?.plot.structure.act1 || ''}
        disabled={permission !== 'edit' && !project?.plot.structure.act1}
        keyValue={`${!isToProject ? 'plot/' : ''}structure`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 2"
        element={project?.plot.structure.act2 || ''}
        disabled={permission !== 'edit' && !project?.plot.structure.act1}
        keyValue={`${!isToProject ? 'plot/' : ''}structure`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 3"
        element={project?.plot.structure.act3 || ''}
        disabled={permission !== 'edit' && !project?.plot.structure.act1}
        keyValue={`${!isToProject ? 'plot/' : ''}structure`}
      />
    </PlotPartsContainer>
  )
}
