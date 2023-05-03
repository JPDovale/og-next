import { forwardRef, ReactNode } from 'react'
import { Text } from '../Text'

interface ILabelInputProps {
  label: string
  error?: string | null
  children: ReactNode
}

export const LabelInput = forwardRef<HTMLLabelElement, ILabelInputProps>(
  ({ label, error, children: input }, ref) => (
    <Text as="label">
      <Text
        family="body"
        size="sm"
        weight="bold"
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '$gray400',
        }}
      >
        {label}
        <Text
          as="span"
          family="body"
          weight="bold"
          size="sm"
          css={{ color: '$fullError', float: 'right' }}
        >
          {error}
        </Text>
      </Text>

      {input}
    </Text>
  ),
)

LabelInput.displayName = 'LabelInput'
