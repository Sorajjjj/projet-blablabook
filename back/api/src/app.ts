import "dotenv/config";
import  express  from "express";
import { router as apiRouter } from "./routers/index.router.js"


export const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`)
} )