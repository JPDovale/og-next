import { RadioItem, RadioLabel, RadioRoot, RadioSelected } from './styles'

type IValue = { label: string; value: any }

type IInputRadioProps = {
  values: IValue[]
  setState: (newState: any) => void
}

export function InputRadio({ values, setState }: IInputRadioProps) {
  return (
    <RadioRoot onValueChange={(e) => setState(e)}>
      {values.map((value) => (
        <RadioLabel key={value.value}>
          <RadioItem value={value.value}>
            <RadioSelected />
          </RadioItem>
          {value.label}
        </RadioLabel>
      ))}
    </RadioRoot>
  )
}
