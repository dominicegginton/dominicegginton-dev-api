import Router from '@koa/router';
import repositories from './repositories';
import readme from './readme';

const router = new Router();

router.prefix('/api');
router.use(readme.routes());
router.use(readme.allowedMethods());
router.use(repositories.routes());
router.use(repositories.allowedMethods());

export default router;
