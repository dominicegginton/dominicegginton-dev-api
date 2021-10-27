/* IMPORT ROUTER */
import Router from '@koa/router'

import { repositories } from '../services/github'

/* SETUP ROUTER */
const router = new Router()
router.prefix('/repositories')

router.get('/', async ctx => {
  ctx.body = await repositories('dominicegginton')
})

export default router
