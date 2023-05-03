import { shadows } from '@styles/tokens'
import { createTheme } from '..'

export const lightMode = createTheme({
  colors: {
    primary500: '#230C40',

    secondary500: '#6f3bdd',
    secondary700: '#441c9c',
    secondary900: '#260f57',

    tertiary500: '#0f8b8d',
    tertiary700: '#0e3b4f',

    quadra500: '#ec9a29',

    text800: '#101012',
    text100: '#E2E2E2',

    t0: '#d8f3dc',
    t1: '#b7e4c7',
    t2: '#95d5b2',
    t3: '#74c69d',
    t4: '#52b788',
    t5: '#40916c',
    t6: '#2d6a4f',
    t7: '#1b4332',
    t8: '#081c15',

    white: '#fff',
    black: '#000',

    gray100: '#101012',
    gray200: '#1b1b1e',
    gray300: '#1f1f25',
    gray400: '#676767',
    gray500: '#909090',
    gray600: '#9a9a9a',
    gray700: '#b0b0b0',
    gray800: '#cacaca',
    gray900: '#dfdfdf',

    base900: '#454545',
    base800: '#636363',
    base700: '#9C9C9C',
    base600: '#A8A8A8',
    base500: '#B6B6B6',
    base400: '#CDCDCD',
    base300: '#DDDDDD',
    base200: '#E2E2E2',
    base100: '#F3F3F0',

    purple100: '#120720',
    purple200: '#1C0D30',
    purple300: '#230C40',
    purple400: '#2A0B53',
    purple500: '#300D79',
    purple600: '#481BA8',
    purple700: '#5729BA',
    purple800: '#6F3BDD',
    purple900: '#8D5DF1',

    blue900: '#09111D',
    blue800: '#0B1525',
    blue700: '#0D1C32',
    blue600: '#0F2444',
    blue500: '#133261',
    blue400: '#133B76',
    blue300: '#215095',
    blue200: '#3869B2',
    blue100: '#577EB8',

    successDefault: '#40916c',

    alertDefault: '#f97700',

    errorDefault: '#ff6161',
    fullError: '#ff0000',
  },
  shadows: {
    ...shadows,
    default:
      '4px 4px 8px rgba(0, 0, 0, 0.5), -2px -2px 3px rgba(255, 255, 255)',
    inFocus: '0 0 6px 3px #2A0B53',
  },
})
