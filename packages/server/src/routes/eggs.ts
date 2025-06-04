import express, { Request, Response } from "express";
import { Egg } from "../models/egg";

import Eggs from "../services/egg-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    Eggs
        .index()
        .then((eggs) => {
            //console.log("router" + eggs);
            res.json({eggs});
        })
        .catch((err) => res.status(404).send(err));
});

export default router;