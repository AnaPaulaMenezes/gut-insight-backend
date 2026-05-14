import 'dotenv/config';
import express from "express";
import { buildRoutes } from "./routes.js";
import { setupSwagger } from "./swagger.js";
import cors from "cors";
import { connectToDatabase } from "./infra/database/mongo.connection.js";
import { errorHandlingMiddleware } from './interface/middleware/error-handling.js';

const app = express();

async function bootstrap() {
  app.use(cors()); // allow requests from anywhere (for testing)
  app.use(express.json());
  app.use(buildRoutes());
  app.use(errorHandlingMiddleware);
  await connectToDatabase();
  setupSwagger(app);
  app.listen(3000, "0.0.0.0", () => {
    console.log("🚀 MyGutTrack API running on port 3000");
    console.log("📄 Swagger docs available at http://localhost:3000/docs");
  });
}

bootstrap();
