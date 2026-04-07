import express from "express";
import { buildRoutes } from "./routes.js";
import { setupSwagger } from "./swagger.js";
import cors from "cors";

const app = express();
// allow requests from anywhere (for testing)
app.use(cors());
app.use(express.json());

app.use(buildRoutes());
app.post("/", (req, res) => {
  console.log("Received body:", req.body);
  res.status(201).send({ success: true });
});
setupSwagger(app);
app.listen(3000, "0.0.0.0", () => {
  console.log("🚀 MyGutTrack API running on port 3000");
  console.log("📄 Swagger docs available at http://localhost:3000/docs");
});