import { sample } from 'lodash';
import { IProcessor } from 'typeorm-fixtures-cli';
import { gameStatuses } from '@gp/shared';

export default class UserProcessor implements IProcessor<any> {
  preProcess(name: string, object: any): any {
    return { ...object, status: sample(Object.values(gameStatuses)) };
  }
}
