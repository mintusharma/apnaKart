import { FastifyInstance } from "fastify";

import {
  getCategoriesController,
} from "../controller/category.controller";

export default async function categoryRoutes(
  fastify: FastifyInstance
) {

  fastify.get(
    "/",
    getCategoriesController
  );
}