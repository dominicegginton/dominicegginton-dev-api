import Router from '@koa/router';
import { status } from '../services/github';

const router = new Router();

router.prefix('/status');

router.get('/', async (ctx) => {
  ctx.body = await status();
});

export default router;