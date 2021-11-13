import Router from '@koa/router';
import { repositories } from '../services/github';

const router = new Router();

router.prefix('/repositories');

router.get('/', async (ctx) => {
  ctx.body = await repositories();
});

export default router;
