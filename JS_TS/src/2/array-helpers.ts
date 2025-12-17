/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

export function mapArray<T, R>(
  source: readonly T[],
  mapper: (item: T, index: number) => R
): R[] {
  if (source == null || source == undefined) {
    throw new TypeError("Source либо null, либо undefined");
  }
  const result: R[] = [];
  let index = 0;
  for (let item of source) {
    result.push(mapper(item, index));
    index++;
  }
  return result;
}

export function filterArray<T>(
  source: readonly T[],
  predicate: (item: T, index: number) => boolean
): T[] {
  if (source == null || source == undefined) {
    throw new TypeError("Source либо null, либо undefined");
  }

  const result: T[] = [];
  let index = 0;
  for (let item of source) {
    if (predicate(item, index) == true) {
      result.push(item);
    }
    index++;
  }
  return result;
}

export function reduceArray<T, R>(
  source: readonly T[],
  reducer: (acc: R, item: T, index: number) => R,
  initial: R
): R {
  if (source == null || source == undefined) {
    throw new TypeError("Source либо null, либо undefined");
  }

  let acc: R = initial;
  let index = 0;
  for (let item of source) {
    acc = reducer(acc, item, index);
    index++;
  }
  return acc;
}

export function partition<T>(
  source: readonly T[],
  predicate: (item: T) => boolean
): [T[], T[]] {
  if (source == null || source == undefined) {
    throw new TypeError("Source либо null, либо undefined");
  }

  let true_result: T[] = [];
  let false_result: T[] = [];
  let index = 0;
  for (let item of source) {
    if (predicate(item) === true) {
      true_result.push(item);
    }
    if (predicate(item) === false) {
      false_result.push(item);
    }
    index++;
  }
  return [true_result, false_result];
}

export function groupBy<T, K extends PropertyKey>(
  source: readonly T[],
  keySelector: (item: T) => K
): Record<K, T[]> {
  if (source == null || source == undefined) {
    throw new TypeError("Source is either null or undefined");
  }

  let groups = {} as Record<K, T[]>;
  for (let item of source) {
    let key = keySelector(item);
    if (groups[key] !== undefined) {
      groups[key].push(item);
    }
    if (groups[key] == undefined) {
      groups[key] = [item];
    }
  }
  return groups;
}
