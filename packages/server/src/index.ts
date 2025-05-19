// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Egg from "./services/egg-svc";
//import bees from "./routes/bees";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
import auth, { authenticateUser } from "./routes/auth";

connect("beeswarm");

app.use(express.static(staticDir));
app.use(express.json());

app.use("/auth", auth);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get("/eggs", (req: Request, res: Response) => {
    const { eggname } = req.params;

    Egg.get(eggname).then((data) => {
        if (data) res
            .set("Content-Type", "application/json")
            .send(JSON.stringify(data));
        else res
            .status(404).send();
    });
});