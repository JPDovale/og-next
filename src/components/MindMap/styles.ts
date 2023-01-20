import { styled } from '@og-ui/react'

export const MindMapContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  height: '100%',
  background: '$purple100',
  backgroundImage: `radial-gradient($purple100 0.5px, $purple900 0.5px)`,
  backgroundSize: '15px 15px',

  '&:active': {
    cursor: 'move',
  },
})

export const MindMapContent = styled('div', {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  gap: '$40',

  // width: '100%',
  // height: '100%',
})

export const ProjectContent = styled('div', {
  position: 'relative',
  minWidth: '600px',
  minHeight: '600px',
})

export const PersonsContent = styled('div', {
  minWidth: '2200px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '$40',

  '@media screen and (max-width: 768px)': {
    minWidth: '700px',
  },
})

export const Persons = styled('div', {
  background: '$gray700',
  borderRadius: '$md',
  boxShadow: '$default',

  padding: '$4',

  variants: {
    inRef: {
      true: {
        padding: '$1',
        boxShadow: 'none',
      },
    },
  },
})

export const PersonsHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})

export const TagsOfProject = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  background: '$gray700',
  borderRadius: '$md',
  boxShadow: '$default',

  padding: '$6',

  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})

export const Tag = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  background: '$gray900',

  padding: '$4',
  borderRadius: '$md',

  p: {
    display: 'flex',
    flexDirection: 'column',

    span: {
      color: '$base900',
      marginTop: '-$2',
    },
  },
})

export const References = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '$2',

  '@media screen and (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
})

export const Reference = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  background: '$gray600',
  borderRadius: '$sm',

  padding: '$2',

  span: {
    color: '$base800',
  },
})

export const ButtonColapse = styled('button', {
  all: 'unset',
  lineHeight: 0,

  cursor: 'pointer',
  transition: 'ease-in-out',

  variants: {
    isColapse: {
      true: {
        rotate: '180deg',
      },
    },
  },
})
