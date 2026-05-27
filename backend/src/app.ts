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
import wishlistRoutes from "./modules/wishlist/routes/wishlist.routes";
import categoryRoutes from "./modules/category/routes/category.routes";
import productImageRoutes from "./modules/product-image/routes/product-image.routes";
import notificationRoutes from "./modules/notification/routes/notification.routes";



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

app.register(wishlistRoutes, {
  prefix: "/api/wishlist",
});

app.register(categoryRoutes, {
  prefix: "/api/categories",
});

app.register(productImageRoutes, {
  prefix: "/api/product-images",
});

app.register(notificationRoutes, {
  prefix: "/api/notifications",
});

app.setErrorHandler(errorHandler);

app.get("/", async () => {
  return {
    success: true,
    message: "API Running",
  };
});

export default app;