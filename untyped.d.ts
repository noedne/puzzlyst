declare module 'getContextObjectData' {
  export default function(cardId: number, version: number): {
    allowMultiple: boolean,
    contextObjects: {},
  }[];
}
