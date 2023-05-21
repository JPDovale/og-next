import { SliceSimulator } from '@slicemachine/adapter-next/simulator'
import { SliceZone } from '@prismicio/react'

// import { components } from '../../slices'

const SliceSimulatorPage = () => {
  const components = undefined

  return (
    <SliceSimulator
      sliceZone={(props) => <SliceZone {...props} components={components} />}
    />
  )
}

export default SliceSimulatorPage
