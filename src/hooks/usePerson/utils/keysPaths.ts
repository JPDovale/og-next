/* eslint-disable no-unused-vars */
export enum keysPaths {
  appearances = 'appearances',
  couples = 'couples',
  dreams = 'dreams',
  fears = 'fears',
  objectives = 'objectives',
  personalities = 'personalities',
  powers = 'powers',
  traumas = 'traumas',
  values = 'values',
  wishes = 'wishes',
}

export type IKeysPaths = keyof typeof keysPaths
