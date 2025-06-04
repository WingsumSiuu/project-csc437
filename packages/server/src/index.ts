// src/index.ts
import express, { Request, Response } from "express";
import auth, { authenticateUser } from "./routes/auth";
import { connect } from "./services/mongo";
import { getFile, saveFile } from "./services/filesystem";  // images
//import Eggs from "./services/egg-svc";
import eggs from "./routes/eggs";
//import Fields from "./services/field-svc";
import fields from "./routes/fields";
//import Bees from "./services/bee-svc";
import bees from "./routes/bees";
import users from "./routes/users";


// express
const app = express();
const port = process.env.PORT || 3000;

// static pages
const staticDir = process.env.STATIC || "public";
app.use(express.static(staticDir));

// mongo
connect("beeswarm");

// middleware
app.use(express.json());
app.use(express.raw({ type: "image/*", limit: "32Mb" }));

// auth
app.use("/auth", auth);

// api routes
app.use("/api/fields", fields);
app.use("/api/eggs", eggs);
app.use("/api/bees", bees);
app.use("/api/users", authenticateUser, users);

// image routes
app.post("/images", saveFile);
app.get("/images/:id", getFile);

// app.get("/login", (req: Request, res: Response) => {
//     res
//         .set("Content-Type", "text/html")
//         .send(renderPage(LoginPage.render()));
// });

// starting server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// app.get("/eggs", (req: Request, res: Response) => {
//     const { eggname } = req.params;
//
//     Egg.get(eggname).then((data) => {
//         if (data) res
//             .set("Content-Type", "application/json")
//             .send(JSON.stringify(data));
//         else res
//             .status(404).send();
//     });
// });

// app.get("/api/fields/:name", (req: Request, res: Response) => {
//     const { name } = req.params;
//
//     Field.get(name).then((data) => {
//         if (data) res
//             .set("Content-Type", "application/json")
//             .send(JSON.stringify(data));
//         else res
//             .status(404).send();
//     });
// });
