import Koa from 'koa';
import cors from '@koa/cors';
import router from './routes/index';

const app = new Koa();

app.use(cors({ origin: 'https://dominicegginton.dev' }));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3000, () => console.info('Server started')); // eslint-disable-line no-console
