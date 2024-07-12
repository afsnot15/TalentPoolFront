export type TFindAllFilterValue = string | number | boolean | null | undefined;

export interface IFindAllFilter {
  column: string;
  value: TFindAllFilterValue;
}

export function handleFindAllFilter(
  originalFilter: Record<string, unknown>,
): string {
  const filters: IFindAllFilter[] = [];

  Object.keys(originalFilter).forEach((key) => {
    const value = originalFilter[key] as TFindAllFilterValue;

    if (typeof value !== 'boolean' && !value) return;

    filters.push({ column: key, value });
  });

  return JSON.stringify(filters);
}
