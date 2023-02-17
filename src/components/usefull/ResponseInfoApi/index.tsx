import { Text, styled } from '@og-ui/react'
import { X } from 'phosphor-react'
import { IError } from 'src/@types/errors/IError'
import { ISuccess } from 'src/@types/success/ISuccess'

interface IResponseInfoApiProps {
  error?: IError
  success?: ISuccess
  isPopUp?: boolean
  onClosePopUp?: () => void
}

export function ResponseInfoApi({
  error,
  success,
  isPopUp = false,
  onClosePopUp = () => {},
}: IResponseInfoApiProps) {
  return (
    <ResponseInfoApiContainer isError={!!error?.title} isPopUp={isPopUp}>
      <Text size={isPopUp ? '2xl' : 'sm'} as="span">
        {error?.title || success?.successTitle}
      </Text>
      <Text size={isPopUp ? 'lg' : 'sm'} family="body">
        {error?.message || success?.successMessage}
      </Text>

      <button
        className="close"
        type="button"
        title="close"
        onClick={onClosePopUp}
      >
        <X size={18} />
      </button>
    </ResponseInfoApiContainer>
  )
}

const ResponseInfoApiContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',

  '.close': {
    all: 'unset',

    position: 'absolute',
    top: '$4',
    right: '$4',

    lineHeight: 0,
    color: '$white',
    display: 'none',
    cursor: 'pointer',
  },

  variants: {
    isError: {
      true: {
        span: {
          color: '$errorDefault',
        },
      },
      false: {
        span: {
          color: '$successDefault',
        },
      },
    },

    isPopUp: {
      true: {
        zIndex: 1,
        position: 'absolute',
        background: '$gray900',

        padding: '$10',
        width: '70%',
        height: '70%',

        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        borderRadius: '$md',
        boxShadow: '$inFocus',

        '.close': {
          display: 'flex',
        },
      },
    },
  },
})
