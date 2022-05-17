export interface IQueryFilter {
  gt?: string | number;
  gte?: string | number;
  lt?: string | number;
  lte?: string | number;
  eq?: string | number;
  contains?: string;
  between?: [number, number];
  in?: (string | number)[];
}
