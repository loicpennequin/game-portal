import { IQueryFilter } from '@gp/shared';
import { Transform } from 'class-transformer';

const DATE_REGEXP = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const parseIntTransform = ({ value }) => {
  if (DATE_REGEXP.test(value)) return value;

  const parsed = parseInt(value, 10);

  return Number.isNaN(parsed) ? value : parsed;
};

export class BaseQueryFilter implements IQueryFilter {
  @Transform(parseIntTransform, { toClassOnly: true })
  gt?: number | string;

  @Transform(parseIntTransform, { toClassOnly: true })
  gte?: number | string;

  @Transform(parseIntTransform, { toClassOnly: true })
  lt?: number | string;

  @Transform(parseIntTransform, { toClassOnly: true })
  lte?: number | string;

  @Transform(parseIntTransform, { toClassOnly: true })
  eq?: string | number;

  contains?: string;

  @Transform(({ value }) => JSON.parse(value).map(parseInt), { toClassOnly: true })
  between?: [number, number];

  @Transform(({ value }) => JSON.parse(value), { toClassOnly: true })
  in?: (string | number)[];

  toWhereConditions() {
    return (alias: string) => {
      return [
        this.gt && `${alias} > :gt`,
        this.gte && `${alias} >= :gte`,
        this.lt && `${alias} > :lt`,
        this.lte && `${alias} >= :lte`,
        this.eq && `${alias} = :eq`,
        this.contains && `${alias} ILIKE :contains`,
        this.between && `${alias} BETWEEN :betweenStart AND :betweenEnd`,
        this.in && `${alias} IN (:...in)`
      ]
        .filter(Boolean)
        .join(' AND ');
    };
  }

  toWhereConditionsVariables() {
    return {
      gt: this.gt,
      gte: this.gte,
      lt: this.lt,
      lte: this.lte,
      eq: this.eq,
      contains: `%${this.contains}%`,
      betweenStart: this.between?.[0],
      betweenEnd: this.between?.[1],
      in: this.in
    };
  }
}
