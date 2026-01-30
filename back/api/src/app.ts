import "dotenv/config";
import helmet from "helmet";
import express from "express";
import { router as apiRouter } from "./routers/index.router.js";
import { globalErrorHandler } from "./middlewares/global-error-handler.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

// const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: ["http://localhost:3000", "http://172.18.0.4:4000", "http://localhost:4000"], 
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   credentials: true 
// }));

app.use(cors({
  // Autorise ton localhost pour le dev ET ton futur domaine Railway
  origin: [
    "http://localhost:3000", 
    "http://localhost:4000",
    /\.railway\.app$/ // Autorise tous les sous-domaines Railway
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true 
}));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "http://localhost:4000", "http://172.18.0.4:4000", "http://localhost:4000"], 
        "connect-src": ["'self'", "http://localhost:4000", "http://172.18.0.4:4000", "http://localhost:4000"],
      },
    },
  })
);


app.use("/api", apiRouter);

// Use global error handler
app.use(globalErrorHandler);

// To launch some tests, better to separate listener in server.ts
// app.listen(PORT, () => {
//   console.log(`Serveur lancé sur http://localhost:${PORT}/api`);
// });
