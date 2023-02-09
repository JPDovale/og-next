import { styled } from '@og-ui/react'

interface IProgressBarProps {
  actual: number
  final: number
}

export function ProgressBar({ actual, final }: IProgressBarProps) {
  const percentage = (actual / final) * 100

  return (
    <Bar>
      <Progress
        css={{
          width: `${percentage}%`,
        }}
      />
    </Bar>
  )
}

const Bar = styled('div', {
  width: '100%',
  height: '$5',
  marginTop: '$1',

  background: '$gray400',
  borderRadius: '$xs',
  boxShadow: '$default',
  overflow: 'hidden',
})

const Progress = styled('div', {
  height: '$5',

  borderRadius: '$xs',
  background: '$purple500',
  boxShadow: '$onActive',
})
