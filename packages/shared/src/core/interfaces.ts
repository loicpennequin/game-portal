export interface IQueryFilter {
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  eq?: string | number;
  contains?: string;
  between?: [number, number];
  in?: (string | number)[];
}
