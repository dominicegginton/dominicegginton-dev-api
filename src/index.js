/* IMPORT KOA */
import Koa from 'koa'

/* IMPORT MIDDLEWARE */
import cors from '@koa/cors'
import router from './routes/index.js'

/* SETUP KOA */
const app = new Koa()
app.use(cors({ origin: 'dominicegginton.dev' }))
app.use(router.routes())
app.use(router.allowedMethods())

/* START SERVER */
app.listen(3000, () => console.info('Server started'))
