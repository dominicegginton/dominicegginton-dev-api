import Router from '@koa/router';
import { readme } from '../services/github';

const router = new Router();

router.prefix('/readme');

router.get('/', async (ctx) => {
  ctx.body = await readme();
});

export default router;
