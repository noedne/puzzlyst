export function getCardVersion(identifier: number): number {
  for (const patch of patches) {
    const cardVersion = patch.changes[identifier];
    if (patch.version <= currentVersion && cardVersion != null) {
      return cardVersion;
    }
  }
  return 0;
}

const currentVersion = Version.Latest;

const enum Version {
  Launch,
  Latest,
}

const patches: {
  version: Version,
  changes: {
    [identifier: number]: number,
  },
}[] = [];
