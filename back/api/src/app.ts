import "dotenv/config";
import express from "express";
import { router as apiRouter } from "./routers/index.router.js";
import { globalErrorHandler } from "./middlewares/global-error-handler.middleware.js";

export const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.use("/api", apiRouter);

// Use global error handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
