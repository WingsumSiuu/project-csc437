import express, { Request, Response } from "express";
import { Bear } from "../models/bear";

import Bears from "../services/bear-svc";

const router = express.Router();


router.get("/:bear", (req: Request, res: Response) => {
    const { bear } = req.params;

    Bears
        .get(bear)
        .then((bear: Bear) => {
            if (!bear) throw "bear not found";
            else res.json(bear);
        })
        .catch((err) => res.status(404).send(err));
});

export default router;