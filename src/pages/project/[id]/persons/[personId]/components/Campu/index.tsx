import { useRouter } from 'next/router'
import { PlusCircle } from 'phosphor-react'
import { ReactNode } from 'react'
import { GenericCardObject } from '../../../../../../../components/GenericCardObject'
import { ListEmpty } from '../../../../../../../components/ListEmpty'
import { CampuContainer, CampuContent, HeadingCampu } from './styles'

interface ISubObject {
  title: string
  description: string
}

interface IObjectOfCampu {
  id?: string
  title: string
  description: string
  consequences?: ISubObject[]
  exceptions?: ISubObject[]
}

interface ICampuProps {
  icon: ReactNode
  title: string
  keyIndex: string
  objectOfCampu: IObjectOfCampu[]
  columns?: 1 | 2 | 3
  withSubObjects?: 'consequências' | 'exceções' | undefined
  isUniqueRelational?: boolean
  permission: 'view' | 'edit' | 'comment' | undefined
}

export function Campu({
  icon,
  title,
  keyIndex,
  objectOfCampu,
  columns = 3,
  withSubObjects,
  isUniqueRelational = false,
  permission,
}: ICampuProps) {
  const router = useRouter()
  const { id, personId } = router.query

  return (
    <CampuContainer>
      <HeadingCampu size="sm">
        {icon}
        {title}:
        {permission === 'edit' && (
          <PlusCircle
            size={40}
            onClick={() =>
              router.replace(
                `/project/${id}/persons/${personId}/${keyIndex}/new`,
              )
            }
          />
        )}
      </HeadingCampu>

      <CampuContent columns={columns} isEmpty={!objectOfCampu[0]}>
        {objectOfCampu && objectOfCampu[0] ? (
          objectOfCampu.map((personality) => {
            const subObjects =
              personality.consequences || personality.exceptions

            return (
              <GenericCardObject
                permission={permission}
                to={keyIndex}
                key={personality.id}
                object={personality}
                withSubObjects={withSubObjects && withSubObjects}
                subObjects={withSubObjects && subObjects}
                isUniqueRelational={isUniqueRelational}
              />
            )
          })
        ) : (
          <ListEmpty
            icon={icon}
            message={`Nenhum(a) ${title} foi adicionado(a) ainda`}
          />
        )}
      </CampuContent>
    </CampuContainer>
  )
}
