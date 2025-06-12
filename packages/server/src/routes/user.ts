import express, { Request, Response } from "express";
import { User } from "../models/user";

import Users from "../services/user-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Users.
        index()
        .then((list: User[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;

    Users
        .get(userid)
        .then((profile: User) => res.json(profile))
        .catch((err) => res.status(404).send(err));
});

router.put("/pollen/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;
    const { pollen } = req.body;

    Users
        .updatePollen(userid, pollen)
        .then((user: User) => res.json(user))
        .catch((err) => res.status(404).send(err));
});


router.put("/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;
    const editedUser = req.body;

    Users.update(userid, editedUser)
        .then((user: User) => res.json(user))
        .catch((err) => res.status(404).send(err));
});


router.post("/", (req: Request, res: Response) => {
    const newUser = req.body;

    Users.create(newUser)
        .then((user: User) =>
            res.status(201).send(user)
        )
        .catch((err) => res.status(500).send(err));
});

router.delete("/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;

    Users.remove(userid)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;