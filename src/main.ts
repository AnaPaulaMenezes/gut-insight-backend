import express from "express";
import { buildRoutes } from "./routes.js";

const app = express();

app.use(express.json());
app.use(buildRoutes());

app.listen(3000, () => {
  console.log("🚀 MyGutTrack API running on port 3000");
});