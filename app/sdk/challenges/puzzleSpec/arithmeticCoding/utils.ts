import type Range from "./Range";
import Coding from "./Coding";
import ArrayDataIndexer from "./dataIndexer/ArrayDataIndexer";
import NumberDataIndexer from "./dataIndexer/NumberDataIndexer";
import UniformRangeIndexer from "./rangeIndexer/UniformRangeIndexer";
import WeightedRangeIndexer from "./rangeIndexer/WeightedRangeIndexer";
import AdaptiveRangeIndexer from "./rangeIndexer/AdaptiveRangeIndexer";
import NumberWithHoleDataIndexer from "./dataIndexer/NumberWithHoleDataIndexer";
import MultiRangeIndexer from "./rangeIndexer/MultiRangeIndexer";

export function getUniformRange(index: number, count: number): Range {
  return { low: index / count, high: (index + 1) / count };
}

export function getProbsRange(probs: number[], index: number): Range {
  let low = 0;
  for (let i = 0; i < index; i++) {
    const prob = probs[i];
    if (prob == null) {
      throw Error('invalid');
    }
    low += prob;
  }
  const prob = probs[index];
  return { low, high: prob == null ? 1 : low + prob };
}

export function getProbsIndex(probs: number[], value: number): number {
  let low = 0;
  for (let i = 0; i < probs.length; i++) {
    const prob = probs[i];
    if (prob == null) {
      throw Error('invalid');
    }
    low += prob;
    if (low > value) {
      return i;
    }
  }
  return probs.length;
}

function getExponentialLengthWeights(
  nonzeroWeight: number,
  count: number,
): number[] {
  if (count === 0) {
    return [];
  }
  const weights = [1 - nonzeroWeight];
  let weight = nonzeroWeight;
  for (let i = 1; i < count; i++) {
    weight /= 2;
    weights.push(weight);
  }
  return weights;
}

export function getUniformArrayCoding<T>(array: T[]): Coding<T> {
  return new Coding(new ArrayDataIndexer(array), new UniformRangeIndexer(array.length));
}

export function getUniformNumberCoding(count: number, offset: number = 0): Coding<number> {
  return new Coding(new NumberDataIndexer(offset), new UniformRangeIndexer(count));
}

export function getUniformBooleanCoding(): Coding<boolean> {
  return new Coding(new ArrayDataIndexer([true, false]), new UniformRangeIndexer(2));
}

export function getWeightedArrayCoding<T>(array: T[], weights: number[]): Coding<T> {
  return new Coding(new ArrayDataIndexer(array), new WeightedRangeIndexer(weights));
}

export function getWeightedNumberCoding(weights: number[], offset: number = 0): Coding<number> {
  return new Coding(new NumberDataIndexer(offset), new WeightedRangeIndexer(weights));
}

export function getWeightedBooleanCoding(weight: number): Coding<boolean> {
  return new Coding(new ArrayDataIndexer([true, false]), new WeightedRangeIndexer([weight]));
}

export function getExponentialNumberCoding(nonzeroWeight: number, max: number): Coding<number> {
  return getWeightedNumberCoding(getExponentialLengthWeights(nonzeroWeight, max));
}

export function getAdaptiveArrayCoding(ids: number[]): Coding<number> {
  return new Coding(new ArrayDataIndexer(ids), new AdaptiveRangeIndexer(ids.length));
}

export function getMultiUniformRangeNumberWithHoleCoding({
  hole,
  min,
  max,
  threshold,
  prob,
}: {
  hole: number,
  min: number,
  max: number,
  threshold: number,
  prob: number,
}): Coding<number> {
  let countA = threshold - min;
  let countB = max - threshold + 1;
  if (hole < threshold) {
    countA--;
  } else {
    countB--;
  }
  return new Coding(
    new NumberWithHoleDataIndexer(hole, min),
    new MultiRangeIndexer(
      new UniformRangeIndexer(countA),
      new UniformRangeIndexer(countB),
      countA,
      prob,
    ),
  );
}
