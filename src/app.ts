import Fastify from "fastify";

import jwtPlugin from "./plugins/jwt";

import errorHandler from "./common/middlewares/error-handler";

import authRoutes from "./modules/auth/routes/auth.routes";

import productRoutes from "./modules/product/routes/product.routes";


const app = Fastify({
  logger: true,
});

app.register(jwtPlugin);

app.register(authRoutes, {
  prefix: "/api/auth",
});


app.register(productRoutes, {
  prefix: "/api/products",
});

app.setErrorHandler(errorHandler);

app.get("/", async () => {
  return {
    success: true,
    message: "API Running",
  };
});

export default app;