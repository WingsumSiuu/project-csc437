import express, { Request, Response } from "express";
import { Bee } from "../models/bee";

import Bees from "../services/bee-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Bees.index()
        .then((bees) => {
            res.json({bees});
        })
        .catch((err) => res.status(500).send(err));
});

export default router;