import {NextFunction, Request, Response, Router} from 'express';

import {TServices} from '../services';

export function hey(name?: string): {hello: string} {
  return {hello: name ?? 'world'};
}

export default async (svc: TServices) => {
  const router = Router();

  router.post(
    '/subscribe',
    async (req: Request, res: Response, next: NextFunction) => {
      const {userId, hashtag} = req.body;
      if (userId == null || userId === '') {
        next(new Error('user id is required'));
      }
      if (hashtag == null || hashtag === '') {
        return next(new Error('hashtag is required'));
      }

      try {
        // this is to make sure our foreign key won't fail
        const user = await svc.models.user.fetchOne({id: userId});
        if (user == null) {
          throw new Error('user does not exist');
        }

        const {id: hashtagId} = await svc.models.hashtag.upsert({
          hashtag,
        });

        await svc.models.subscription.upsert({
          userId,
          hashtagId,
        });

        return res.json({status: 'ok'});
      } catch (err) {
        return next(err);
      }
    },
  );

  router.get('/hello', (_req: Request, res: Response) => {
    return res.json({it: 'works'});
  });

  return router;
};
