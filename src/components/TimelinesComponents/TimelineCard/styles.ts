import { styled } from '@styles/index'

export const TimeLineCardContainer = styled('div', {
  all: 'unset',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '240px',
  background: '$base900',
  borderRadius: '$md',
  overflowX: 'auto',
  boxShadow: '$onActive',
  cursor: 'pointer',

  '&:hover .center-line': {
    boxShadow: ' 0 0 80px 56px #0d8a53 ',
  },

  '&:focus .center-line': {
    boxShadow: ' 0 0 80px 56px #0d8a53 ',
  },

  variants: {
    isMain: {
      true: {},
      false: {
        height: '200px',
      },
    },
    isEmpty: {
      true: {
        height: '120px',
      },
      false: {},
    },
  },
})

export const CenterLine = styled('span', {
  background: '$white',
  padding: '1px',
  height: '1px',
  maxHeight: '1px',
  minWidth: '1000%',
  boxShadow: ' 0 0 40px 6px #8D5DF1 ',
  opacity: 0.9,
  transition: 'ease-in-out 250ms',
  variants: {
    isEmpty: {
      true: {
        opacity: 0.3,
      },
      false: {},
    },
  },
})

export const EventsTable = styled('div', {
  display: 'flex',
  position: 'absolute',
  height: '80%',
  marginLeft: '$40',
  maxWidth: '100%',
})

export const EventCard = styled('div', {
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  background: '$semiTransparentBack',
  padding: '$2',
  marginLeft: '-$20',

  height: '30%',
  maxWidth: '240px',
  minWidth: '240px',
  borderRadius: '$lg',
  backdropFilter: '$blur(12px)',
  boxShadow: '$default',

  variants: {
    toDown: {
      true: {
        alignSelf: 'end',
      },
      false: {},
    },
    importance: {
      1: {
        border: '$importance1 4px solid',
      },
      2: {
        border: '$importance2 4px solid',
      },
      3: {
        border: '$importance3 4px solid',
      },
      4: {
        border: '$importance4 4px solid',
      },
      5: {
        border: '$importance5 4px solid',
      },
      6: {
        border: '$importance6 4px solid',
      },
      7: {
        border: '$importance7 4px solid',
      },
      8: {
        border: '$importance8 4px solid',
      },
      9: {
        border: '$importance9 4px solid',
      },
      10: {
        border: '$importance10 4px solid',
      },
    },
    isMain: {
      true: {},
      false: {
        borderWidth: '2px',
      },
    },
  },
})

export const Conector = styled('span', {
  position: 'absolute',
  zIndex: 0,
  height: '82%',
  top: '100%',
  left: '50%',
  width: '4px',

  variants: {
    toDown: {
      true: {
        top: '-84%',
      },
      false: {},
    },
    importance: {
      1: {
        background: '$importance1',
      },
      2: {
        background: '$importance2',
      },
      3: {
        background: '$importance3',
      },
      4: {
        background: '$importance4',
      },
      5: {
        background: '$importance5',
      },
      6: {
        background: '$importance6',
      },
      7: {
        background: '$importance7',
      },
      8: {
        background: '$importance8',
      },
      9: {
        background: '$importance9',
      },
      10: {
        background: '$importance10',
      },
    },
    isMain: {
      true: {},
      false: {
        width: '2px',
        height: '80%',
      },
    },
  },
})

export const TimeLineEmptyMessage = styled('span', {
  zIndex: 3,

  left: '$20',
  padding: '$4',
  fontFamily: '$bodyText',
  fontSize: '$lg',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  position: 'absolute',
  background: '$semiTransparentBack',
  color: '$text100',
  borderRadius: '$lg',
  boxShadow: '$default',
  backdropFilter: '$blur(1px)',
})
