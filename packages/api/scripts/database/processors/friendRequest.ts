import { sample } from 'lodash';
import { IProcessor } from 'typeorm-fixtures-cli';
import { friendRequestStatuses } from '@gp/shared';

export default class FriendRequestProcessor implements IProcessor<any> {
  preProcess(name: string, object: any): any {
    return { ...object, status: sample(Object.values(friendRequestStatuses)) };
  }
}
