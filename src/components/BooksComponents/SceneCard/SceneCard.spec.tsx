import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, vitest } from 'vitest'
import { SceneCard } from '.'

vitest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        query: {
          id: 'testProjectId',
        },
      }
    },
  }
})

vitest.mock('@hooks/useProject', () => {
  return {
    useProject(projectId: string) {
      return {
        useBook(bookId: string) {
          return {
            findCapitule(capituleId: string) {
              return {
                capitule: {
                  scenes: [],
                },
              }
            },
          }
        },
      }
    },
  }
})

interface IRenderComponentProps {
  complete?: boolean
}

function renderComponent({ complete }: IRenderComponentProps) {
  const setEditSceneMocked = vitest.fn()

  render(
    <SceneCard
      bookId="testBookId"
      capituleId="testCapituleId"
      persons={[]}
      scene={{
        complete: complete ?? false,
        id: 'testSceneId',
        objective: 'testObjective',
        persons: [],
        sequence: '1',
        structure: {
          act1: 'test',
          act2: 'the',
          act3: 'component',
        },
      }}
      setOnEditScene={setEditSceneMocked}
    />,
  )

  return { setEditSceneMocked }
}

describe('Scene card', () => {
  it('renders correctly', async () => {
    renderComponent({})

    const element = screen.getByTestId('scene-card')

    expect(element).toBeInTheDocument()
  })

  it('should be able to select scene to edit', async () => {
    const { setEditSceneMocked } = renderComponent({})

    const buttonEdit = screen.getByTestId('edit-scene-button')
    fireEvent.click(buttonEdit)

    expect(setEditSceneMocked).toHaveBeenCalledWith('testSceneId')
  })

  it('should be able render check box to select to complete scene when scene is incomplete', async () => {
    renderComponent({ complete: false })

    const checkBoxComplete = screen.getByTestId('check-complete')

    expect(checkBoxComplete).toBeInTheDocument()
  })

  it('should be able not render check box to select to complete scene when scene is complete', async () => {
    renderComponent({ complete: true })

    const checkBoxComplete = screen.queryByTestId('check-complete')

    expect(checkBoxComplete).not.toBeInTheDocument()
  })

  it('should be able chance default render to alternative form to mark as complete when check this', async () => {
    renderComponent({})

    const checkBoxComplete = screen.getByTestId('check-complete')
    fireEvent.click(checkBoxComplete)

    const formChecked = screen.getByTestId('alternative-form')
    const buttonReorder = screen.queryByTestId('reorder-scenes-button')
    const buttonDelete = screen.queryByTestId('delete-scene-button')

    expect(checkBoxComplete).toBeInTheDocument()
    expect(formChecked).toBeInTheDocument()
    expect(buttonReorder).not.toBeInTheDocument()
    expect(buttonDelete).not.toBeInTheDocument()
  })

  it('should be able chance default render to alternative form to delete scene when check this', async () => {
    renderComponent({})

    const buttonDelete = screen.getByTestId('delete-scene-button')
    fireEvent.click(buttonDelete)

    const alternativeDeleteForm = screen.getByTestId('alternative-delete-form')

    expect(alternativeDeleteForm).toBeInTheDocument()
  })

  it('should be able chance default render to alternative form to reorder scenes when check this', async () => {
    renderComponent({})

    const buttonReorder = screen.getByTestId('reorder-scenes-button')
    fireEvent.click(buttonReorder)

    const alternativeDeleteForm = screen.getByTestId('alternative-reorder-form')

    expect(alternativeDeleteForm).toBeInTheDocument()
  })
})
