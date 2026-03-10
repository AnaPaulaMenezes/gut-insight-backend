import type { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gut Insight API",
      version: "1.0.0",
      description: "API for tracking symptom records",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/interface/**/*.ts"],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
}
