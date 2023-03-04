import * as Popover from '@radix-ui/react-popover'
import { styled } from '@styles/index'

export const UserOptionsPopoverContainer = styled(Popover.Content, {
  zIndex: 2,
  position: 'static',

  maxWidth: '100vw',

  background: '$gray900',
  borderRadius: '$sm',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  border: '2px solid $purple400',
})

export const PopoverArrow = styled(Popover.Arrow, {
  fill: '$purple400',
})

export const PopoverClose = styled(Popover.Close, {
  position: 'absolute',
  zIndex: 2,

  top: '$3',
  right: '$3',

  lineHeight: 0,

  border: 0,
  outline: 0,
  borderRadius: '$full',
  background: 'transparent',
  cursor: 'pointer',
  color: '$base100',

  '&:active': {
    svg: {
      scale: '95%',
    },
  },
})

export const UserInfos = styled('div', {
  display: 'flex',
  gap: '$3',

  padding: '$3 $5',
  borderBottom: '0.5px solid $base900',

  span: {
    color: '$base700',
  },
})

export const Options = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  padding: '$5',
})
