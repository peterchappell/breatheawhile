// @flow

export type Phase = {
  name: string,
  units: number,
  instruction: string,
}

export type Pattern = {
  id: string,
  name: string,
  description: string,
  phases: [Phase],
};
