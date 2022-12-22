import {Knex} from 'knex';
import BaseModel from './base.model';

type User = {
  id: string;
};

export class UserModel extends BaseModel<User> {
  constructor(db: Knex) {
    const table = 'user';
    // @ts-ignore
    super(db, table);
  }
}
