import Koa from 'koa';
import cors from '@koa/cors';
import router from './routes/index';

const app = new Koa();

app.use(cors({ origin: 'https://dominicegginton.dev' }));
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`server started on port ${port}`)); // eslint-disable-line no-console
