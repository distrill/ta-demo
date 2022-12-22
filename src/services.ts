import {Knex} from 'knex';

import {UserModel} from './models/user.model';
import {SubscriptionModel} from './models/subscription.model';
import {HashtagModel} from './models/hashtag.model';

export type TModels = {
  user: UserModel;
  subscription: SubscriptionModel;
  hashtag: HashtagModel;
};

export type TServices = {
  lib: {
    db: Knex;
  };
  models: TModels;
};

export default async function init({db}: {db: Knex}): Promise<TServices> {
  return {
    lib: {db},
    models: {
      user: new UserModel(db),
      subscription: new SubscriptionModel(db),
      hashtag: new HashtagModel(db),
    },
  };
}
