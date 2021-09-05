/* IMPORT ROUTER */
import Router from '@koa/router'

/* IMPORT ROUTERS */
import repositories from './repositories.js'

/* SETUP ROUTER */
const router = new Router()
router.use(repositories.routes())
router.use(repositories.allowedMethods())

export default router
