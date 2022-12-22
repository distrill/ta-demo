import {Knex} from 'knex';
import BaseModel from './base.model';

type Subscription = {
  id: string;
  userId: string;
  hashtagId: string;
};

export class SubscriptionModel extends BaseModel<Subscription> {
  constructor(db: Knex) {
    const table = 'subscription';
    const upsertConflictKeys = ['userId', 'hashtagId'];
    // @ts-ignore
    super(db, table, upsertConflictKeys);
  }
}
