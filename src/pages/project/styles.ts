import { Heading, styled } from '@og-ui/react'

export const HeaderProjectInfos = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  borderBottom: '1px solid $gray400',
  height: '420px',
  maxHeight: '420px',
  width: '100%',

  '@media screen and (max-width: 768px)': {
    flexDirection: 'column',
    maxHeight: 'unset',
  },
})

export const ImageContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  height: '100%',
  overflow: 'hidden',

  '.image': {
    display: 'flex',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',

    background: '$gray800',
    overflow: 'hidden',
    objectFit: 'cover',
    cursor: 'pointer',
  },

  '@media screen and (max-width: 768px)': {
    width: '100%',

    '.image': {
      width: '100%',
    },
  },
})

export const InfosContainer = styled('div', {
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  height: '100%',
  gap: '$4',
  padding: '$4',
  maxHeight: '420px',

  background: '$gray900',

  '@media screen and (max-width: 768px)': {
    width: '100%',
  },
})

export const Infos = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '$4',

  variants: {
    columns: {
      1: {
        gridTemplateColumns: '1fr',
      },
      3: {
        gridTemplateColumns: '1fr 1fr 1fr',
      },
      4: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
      },
    },
  },
})

export const Info = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  span: {
    color: '$base900',
  },
})

export const PlotProjectContainer = styled('div', {
  padding: '$4',
})

export const HeadingPart = styled(Heading, {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  marginTop: '$8',
  marginBottom: '$5',
  cursor: 'pointer',

  svg: {
    background: '$blue600',
    padding: '$2',
    boxShadow: '$default',
    borderRadius: '$xs',
  },
})

export const EditImgForm = styled('form', {
  display: 'flex',
  gap: '$10',
  zIndex: 3,
  visibility: 'hidden',
  justifyContent: 'space-between',
  width: '40%',
  marginLeft: '-50%',
  marginTop: '-20%',
  transition: 'ease-in 250ms',

  '@media screen and (max-width: 768px)': {
    marginTop: '-60px',
    marginBottom: '$4',
    width: '95%',
    marginLeft: '0',
  },

  variants: {
    visible: {
      true: {
        visibility: 'visible',

        '@media screen and (max-width: 768px)': {
          marginTop: '$5',
        },
      },
    },
  },
})

export const Input = styled('label', {
  display: 'flex',
  justifyContent: 'center',
  padding: '$4',
  borderRadius: '$sm',
  width: '50%',
  fontSize: '$sm',
  fontFamily: 'sans-serif',
  boxShadow: '$default',
  gap: '$2',

  background: '$purple600',

  input: {
    position: 'absolute',
    visibility: 'hidden',
  },
})

export const PersonsContainer = styled('div', {
  display: 'grid',
  gap: '$8',

  gridTemplateColumns: '1fr 1fr 1fr 1fr',

  '@media screen and (min-width: 1700px)': {
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  },

  '@media screen and (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
  },
})
