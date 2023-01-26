import { Button, keyframes, styled } from '@og-ui/react'

const loadingAnimation = keyframes({
  '0%': {
    backgroundPosition: '0% 50%',
  },
  '25%': {
    backgroundPosition: '50% 100%',
  },
  '50%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '50% 0%',
  },
})

export const Loading = styled('div', {
  background:
    'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(67,9,121,1) 10%, rgba(75,62,179,1) 20%, rgba(47,87,193,1) 30%, rgba(25,118,164,1) 40%, rgba(24,135,172,1) 50%, rgba(38,157,223,1) 60%, rgba(37,103,233,1) 70%, rgba(20,42,182,1) 80%, rgba(60,33,168,1) 90%, rgba(92,60,140,1) 100%)',
  backgroundSize: '900%',
  width: '100%',
  height: '1px',
  position: 'absolute',
  bottom: 0,
  left: 0,
  animation: `${loadingAnimation} 1500ms infinite ease-in-out`,
})

export const HeaderOptionsContainer = styled('header', {
  position: 'fixed',
  display: 'flex',
  zIndex: '1',
  justifyContent: 'space-between',

  padding: '$4 $8',

  boxShadow: '0 4px 8px #000000aa',
  borderTopLeftRadius: '48px',

  variants: {
    NavIsOpen: {
      true: {
        width: '74%',
        '@media screen and (max-width: 768px)': {
          width: '100%',
        },
      },
      false: {
        width: '100%',
      },
    },
    onPopUp: {
      true: {
        alignItems: 'flex-start',
        paddingTop: '$8',
        height: '100vh',
        opacity: 0.7,
        cursor: 'pointer',
        background: 'black',
      },
      false: {
        opacity: 1,
        background: '$gray800',
        transition: 'all 500ms',
      },
    },
  },

  defaultVariants: {
    NavIsOpen: true,
    onPopUp: false,
  },

  '@media screen and (max-width: 768px)': {
    borderRadius: '0',
  },
})

export const Title = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '$5',

  svg: {
    cursor: 'pointer',
    transition: 'ease-in-out 250ms',
  },

  variants: {
    NavIsOpen: {
      true: {
        svg: {
          transform: 'rotate(180deg)',
        },
      },
      false: {
        svg: {
          transform: 'rotate(0deg)',
        },
      },
    },
  },

  defaultVariants: {
    NavIsOpen: true,
  },

  '@media screen and (max-width: 768px)': {
    span: { fontSize: '$sm' },
    svg: { width: 20 },
  },
})

export const Options = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '$4',

  width: '60%',

  'svg, .avatar': {
    cursor: 'pointer',
  },

  '.icon-button': {
    position: 'relative',
    lineHeight: 0,

    border: 0,
    outline: 0,
    color: '$base100',
    background: '$transparent',
    borderRadius: '$xs',

    '&:focus': {
      boxShadow: '$inFocus',
    },
    '&:last-child': {
      borderRadius: '$full',
    },
  },

  '@media screen and (max-width: 768px)': {
    svg: { width: 20 },
    display: 'none',
  },
})

export const AddNewProjectButton = styled(Button, {
  borderRadius: '$full',
  padding: '$3',

  '@media screen and (max-width: 768px)': {
    padding: '$2',
  },
})

export const QueryContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',

  gap: '$4',

  lineHeight: 0,

  transition: 'ease-in-out 250ms',

  '.icon-button': {
    lineHeight: 0,

    border: 0,
    outline: 0,
    color: '$base100',
    background: '$transparent',
    borderRadius: '$xs',

    '&:focus': {
      boxShadow: '$inFocus',
    },
    '&:last-child': {
      borderRadius: '$full',
    },
  },

  div: {
    width: '100%',
    '@media screen and (max-width: 768px)': {
      position: 'absolute',
      left: 10,
      top: '110%',
      padding: '$2',
    },
  },

  variants: {
    onQuery: {
      true: {
        width: '100%',
        '@media screen and (max-width: 768px)': {
          width: 16,
        },
      },
      false: { width: 16 },
    },
  },

  defaultVariants: {
    onQuery: false,
  },
})

export const NewNotificationAlert = styled('div', {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  top: -8,
  right: -8,
  width: 20,
  height: 20,
  borderRadius: '$full',

  background: '$purple200',

  p: {
    lineHeight: 0,
  },

  variants: {
    inRight: {
      true: {
        left: -14,
        top: -8,
        right: 'unset',

        width: 18,
        height: 18,
      },
    },
  },
})
