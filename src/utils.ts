import { Order, Comparator } from './types';

export function compareByField<T>(a: T, b: T, fieldToCompare: keyof T): number {
  if (a[fieldToCompare] > b[fieldToCompare]) {
    return 1;
  }

  if (a[fieldToCompare] < b[fieldToCompare]) {
    return -1;
  }

  return 0;
}

export function getComparator<T, K extends keyof T>(
  order: Order,
  fieldToCompare: K,
): Comparator<T> {
  return order === Order.asc
    ? (a: T, b: T) => compareByField(a, b, fieldToCompare)
    : (a: T, b: T) => -compareByField(a, b, fieldToCompare);
}

export function immutableSort<T>(array: T[], comparator: Comparator<T>) {
  const copy = [...array];
  return copy.sort(comparator);
}
