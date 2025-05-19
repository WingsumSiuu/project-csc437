import express, { Request, Response } from "express";
import { Bee } from "../models/bee";

import Bees from "../services/bee-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Bees.index()
        .then((list: Bee[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:eggname", (req: Request, res: Response) => {
    const { userid } = req.params;

    Bees.get(userid)
        .then((traveler: Bee) => res.json(traveler))
        .catch((err) => res.status(404).send(err));
});