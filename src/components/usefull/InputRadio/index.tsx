import { Text } from '@components/usefull/Text'
import { RadioItem, RadioLabel, RadioRoot, RadioSelected } from './styles'

type IValue = { label: string; value: any }

type IInputRadioProps = {
  values: IValue[]
  setState: (newState: any) => void
  state: any
  isInLine?: boolean
  withColorInBackground?: boolean
}

export function InputRadio({
  values,
  setState,
  state,
  isInLine = false,
  withColorInBackground = false,
}: IInputRadioProps) {
  return (
    <RadioRoot
      onValueChange={(e) => setState(e)}
      isInLine={isInLine}
      withColorInBackground={withColorInBackground}
    >
      {values.map((value) => (
        <RadioLabel
          key={value.value}
          isSelected={value.value === state}
          isInLine={isInLine}
        >
          <RadioItem value={value.value}>
            <RadioSelected />
          </RadioItem>
          <Text as="span">{value.label}</Text>
        </RadioLabel>
      ))}
    </RadioRoot>
  )
}
