import * as Avatar from '@radix-ui/react-avatar'
import { UserCircle } from 'phosphor-react'
import { styled } from '@og-ui/react'

interface IAvatarProps {
  src: string | undefined
  size?: 'md' | 'sm' | 'xsm' | 'lg' | '2xl' | '4xl' | 'full'
  selected?: boolean
  error?: boolean
  whitShadow?: boolean
}

export function AvatarWeb({
  src,
  size = 'md',
  selected = false,
  error = false,
  whitShadow = false,
}: IAvatarProps) {
  return (
    <AvatarRoot
      size={size}
      selected={selected}
      error={error}
      whitShadow={whitShadow}
    >
      <AvatarImage
        size={size}
        src={src}
        alt="Foto do usuário"
        whitShadow={whitShadow}
      />
      <AvatarFallback size={size} whitShadow={whitShadow}>
        <UserCircle weight="thin" />
      </AvatarFallback>
    </AvatarRoot>
  )
}

const AvatarRoot = styled(Avatar.Root, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  position: 'relative',

  minWidth: 58,
  minHeight: 58,
  maxWidth: 58,
  maxHeight: 58,

  borderRadius: '$full',
  background: '$blue100',
  transition: 'all ease-in-out 250ms',

  svg: {
    minWidth: 58,
    minHeight: 58,
    width: 58,
    height: 58,
  },

  variants: {
    size: {
      full: {
        height: '100%',
        minHeight: '100%',
        width: '100%',
        minWidth: '100%',
      },
      xsm: {
        minWidth: 40,
        minHeight: 40,
        maxWidth: 40,
        maxHeight: 40,

        svg: {
          minWidth: 40,
          minHeight: 40,
          maxWidth: 40,
          maxHeight: 40,
        },
      },
      sm: {
        minWidth: 48,
        minHeight: 48,
        maxWidth: 48,
        maxHeight: 48,

        svg: {
          minWidth: 48,
          minHeight: 48,
          maxWidth: 48,
          maxHeight: 48,
        },
      },
      md: {},
      lg: {
        minWidth: 64,
        minHeight: 64,
        maxWidth: 64,
        maxHeight: 64,

        svg: {
          minWidth: 64,
          minHeight: 64,
          maxWidth: 64,
          maxHeight: 64,
        },
      },
      '2xl': {
        minWidth: 80,
        minHeight: 80,
        maxWidth: 80,
        maxHeight: 80,

        svg: {
          minWidth: 80,
          minHeight: 80,
          maxWidth: 80,
          maxHeight: 80,
        },
      },
      '4xl': {
        minWidth: 160,
        minHeight: 160,
        maxWidth: 160,
        maxHeight: 160,

        svg: {
          minWidth: 160,
          minHeight: 160,
          maxWidth: 160,
          maxHeight: 160,
        },
      },
    },
    error: {
      true: {
        boxShadow: '$denied',
      },
      false: {},
    },
    selected: {
      true: {
        boxShadow: '$inFocus',
      },
      false: {},
    },
    whitShadow: {
      true: {
        boxShadow: '-3px 1px 4px #00000090',
        border: '1px solid $blue300',
      },
      false: {},
    },
  },
})

const AvatarImage = styled(Avatar.Image, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',

  minWidth: 58,
  maxWidth: 58,
  minHeight: 58,
  maxHeight: 58,

  borderRadius: '$full',
  objectFit: 'cover',

  variants: {
    size: {
      full: {
        height: '100%',
        minHeight: '100%',
        width: '100%',
        minWidth: '100%',
      },
      xsm: {
        minWidth: 40,
        minHeight: 40,
        maxWidth: 40,
        maxHeight: 40,
      },
      sm: {
        minWidth: 48,
        minHeight: 48,
        maxWidth: 48,
        maxHeight: 48,
      },
      md: {},
      lg: {
        minWidth: 64,
        minHeight: 64,
        maxWidth: 64,
        maxHeight: 64,
      },
      '2xl': {
        minWidth: 80,
        minHeight: 80,
        maxWidth: 80,
        maxHeight: 80,
      },
      '4xl': {
        minWidth: 160,
        minHeight: 160,
        maxWidth: 160,
        maxHeight: 160,
      },
    },
    whitShadow: {
      true: {
        boxShadow: '-3px 1px 4px #00000090',
        border: '1px solid $blue300',
      },
      false: {},
    },
  },
})

const AvatarFallback = styled(Avatar.Fallback, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',

  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 58,
  maxWidth: 58,
  minHeight: 58,
  maxHeight: 58,

  color: 'white',

  borderRadius: '$full',

  background: '$gray400',

  variants: {
    size: {
      full: {
        height: '100%',
        minHeight: '100%',
        width: '100%',
        minWidth: '100%',

        svg: {
          width: '50%',
          height: '50%',
        },
      },
      xsm: {
        minWidth: 40,
        minHeight: 40,
        width: 40,
        height: 40,
      },
      sm: {
        minWidth: 48,
        minHeight: 48,
        width: 48,
        height: 48,
      },
      md: {},
      lg: { minWidth: 64, minHeight: 64, width: 64, height: 64 },
      '2xl': { minWidth: 80, minHeight: 80, width: 80, height: 80 },
      '4xl': { minWidth: 160, minHeight: 160, width: 160, height: 160 },
    },
    whitShadow: {
      true: {
        boxShadow: '-3px 1px 4px #00000090',
        border: '1px solid $blue300',
      },
      false: {},
    },
  },
})
