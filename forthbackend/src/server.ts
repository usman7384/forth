import express, { Express } from "express";
import router from "./routes/forth-routes";
import cors from "cors";
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
app.use("/api/forth", router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
