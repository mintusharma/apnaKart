import Fastify from "fastify";

import jwtPlugin from "./plugins/jwt";
import multipart from "@fastify/multipart";
import cors from "@fastify/cors";

import errorHandler from "./common/middlewares/error-handler";

import authRoutes from "./modules/auth/routes/auth.routes";

import productRoutes from "./modules/product/routes/product.routes";
import uploadRoutes from "./modules/auth/routes/upload.routes";
import cartRoutes from "./modules/cart/routes/cart.routes";
import addressRoutes from "./modules/address/routes/address.routes";
import orderRoutes from "./modules/order/routes/order.routes";


const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: "*",
});

app.register(jwtPlugin);
app.register(multipart);

app.register(authRoutes, {
  prefix: "/api/auth",
});

app.register(uploadRoutes, {
  prefix: "/api/upload",
});

app.register(productRoutes, {
  prefix: "/api/products",
});

app.register(cartRoutes, {
  prefix: "/api/cart",
});

app.register(addressRoutes, {
  prefix: "/api/addresses",
});

app.register(orderRoutes, {
  prefix: "/api/orders",
});

app.setErrorHandler(errorHandler);

app.get("/", async () => {
  return {
    success: true,
    message: "API Running",
  };
});

export default app;