import express, { Request, Response } from "express";
import { Field } from "../models/field";

import Fields from "../services/field-svc";

const router = express.Router();

router.get("/:field", (req: Request, res: Response) => {
    const { field } = req.params;

    Fields
        .get(field)
        .then((field: Field) => {
            if (!field) throw "field not found";
            else res.json(field);
        })
        .catch((err) => res.status(404).send(err));
});

export default router;