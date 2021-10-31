/* IMPORT KOA */
import Koa from "koa";

/* IMPORT MIDDLEWARE */
import cors from "@koa/cors";
import router from "./routes/index";

/* ENVIRONMENT VARIABLES */
const PORT = process.env.PORT || 3000;

/* SETUP KOA */
const app = new Koa();
app.use(cors({ origin: "https://dominicegginton.dev" }));
app.use(router.routes());
app.use(router.allowedMethods());

/* START SERVER */
app.listen(PORT, () => console.info("Server started"));
