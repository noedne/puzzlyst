import SpecString from './app/sdk/challenges/puzzleSpec/SpecString';

declare module 'getContextObjectData' {
  export default function(cardId: number, version: number): {
    allowMultiple: boolean,
    contextObjects: {},
  }[];
}

declare module 'getCustomModifiers' {
  export default function(cardId: number, version: number): {
    description: string,
    modifier: (specString: SpecString) => (card: any) => void,
  }[];
}
