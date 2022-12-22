import {Knex} from 'knex';
import BaseModel from './base.model';

type Hashtag = {
  id: string;
  hashtag: string;
};

export class HashtagModel extends BaseModel<Hashtag> {
  constructor(db: Knex) {
    const table = 'hashtag';
    const upsertConflictKeys = ['hashtag'];
    // @ts-ignore
    super(db, table, upsertConflictKeys);
  }
}
