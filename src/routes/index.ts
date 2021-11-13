import Router from '@koa/router';
import repositories from './repositories';
import status from './status';

const router = new Router();

router.prefix('/api');
router.use(status.routes());
router.use(status.allowedMethods());
router.use(repositories.routes());
router.use(repositories.allowedMethods());

export default router;
