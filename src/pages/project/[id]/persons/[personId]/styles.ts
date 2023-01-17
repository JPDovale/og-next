import { Heading, styled } from '@og-ui/react'

export const HeaderPersonInfos = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',

  borderBottom: '1px solid $gray400',
  minHeight: '420px',
  height: '420px',
  maxHeight: '420px',

  '.image': {
    display: 'flex',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    minHeight: '320px',
    maxHeight: '420px',

    background: '$gray800',
    overflow: 'hidden',
    objectFit: 'cover',
    cursor: 'pointer',
  },

  '@media screen and (max-width: 768px)': {
    flexDirection: 'column',
    maxHeight: 'unset',

    '.image': {
      width: '100%',
      minHeight: '280px',
    },
  },
})

export const EditImgForm = styled('form', {
  display: 'flex',
  gap: '$10',
  zIndex: 3,
  visibility: 'hidden',
  justifyContent: 'space-between',
  width: '30%',
  marginLeft: '-40%',
  marginTop: '-20%',
  transition: 'all ease-in 250ms',

  '@media screen and (max-width: 768px)': {
    marginTop: '-60px',
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

export const InfosContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '60%',
  gap: '$4',
  padding: '$4 $10',
  maxHeight: '420px',

  zIndex: 1,
  height: '100%',

  background: '$gray900',

  '@media screen and (max-width: 768px)': {
    width: '100%',
  },

  '.goBack': {
    zIndex: 2,
    padding: '$2',
    position: 'absolute',

    top: '$2',
    right: '$2',

    svg: {
      width: 20,
      height: 20,
    },
  },
})

export const Infos = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  width: '100%',

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
  width: '100%',

  span: {
    color: '$base900',
  },
})

export const History = styled('div', {
  padding: '$4',

  '@media screen and (max-width: 768px)': {
    marginTop: '$40',
  },
})

export const HeadingPart = styled(Heading, {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  marginBottom: '$5',
  cursor: 'pointer',

  svg: {
    background: '$blue600',
    padding: '$2',
    boxShadow: '$default',
    borderRadius: '$xs',
  },
})

export const HistoryContent = styled('p', {
  padding: '$4',

  textAlign: 'justify',
  fontFamily: '$bodyText',
  fontWeight: 'bold',
  lineHeight: '$base',
  fontSize: '1.1rem',

  background: '$base300',
  boxShadow: '$onActive',
  borderRadius: '$xs',
  color: '$gray900',
})

export const ObjectContainer = styled('div', {
  padding: '$4',
})

export const ObjectivesContent = styled('div', {
  display: 'flex',

  flexDirection: 'column',
  gap: '$6',
})
