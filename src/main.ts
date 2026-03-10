import express from "express";
import { buildRoutes } from "./routes.js";
import { setupSwagger } from "./swagger.js";

const app = express();

app.use(express.json());
app.use(buildRoutes());

setupSwagger(app);

app.listen(3000, () => {
  console.log("🚀 MyGutTrack API running on port 3000");
  console.log("📄 Swagger docs available at http://localhost:3000/docs");
});