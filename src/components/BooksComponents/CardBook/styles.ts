import { Box, styled } from '@og-ui/react'

export const CardBookContainer = styled(Box, {
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',

  padding: 0,
  minHeight: 460,
  width: '100%',

  background: '$gray900',
  borderRadius: '$sm',
  boxShadow: '$default',
  cursor: 'pointer',
})

export const PreviewContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',

  minHeight: 460,

  variants: {
    isPreview: {
      false: {
        gridTemplateColumns: '1fr 3fr',

        '@media screen and (min-width: 1700px)': {
          minHeight: 640,
        },
      },
    },
  },

  '@media screen and (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
  },
})

export const ImageContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '$sm 0 0 $sm',
  borderRight: '0.3px $base900 solid',
  overflow: 'hidden',

  img: {
    width: '100%',
    minHeight: '100%',
    objectFit: 'cover',
    borderRadius: '$sm 0 0 $sm',
  },

  '@media screen and (max-width: 768px)': {
    minHeight: 400,
    maxHeight: 400,

    border: 'none',
    borderBottom: '0.3px $base900 solid',
    borderRadius: '$sm $sm 0 0',

    img: {
      borderRadius: '$sm $sm 0 0',
    },
  },
})

export const InfosContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  width: '100%',
  padding: '$4',
})

export const InfoContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',

  width: '100%',

  variants: {
    columns: {
      2: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },

      3: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },

      4: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    },
  },
})

export const Info = styled('div', {
  width: '100%',

  span: {
    color: '$gray300',
  },
})

export const PlotBook = styled('div', {
  padding: '$4',

  borderTop: '0.3px $base900 solid',
})
