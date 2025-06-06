// src/index.ts
import express, { Request, Response } from "express";
import auth, { authenticateUser } from "./routes/auth";
import { connect } from "./services/mongo";
import { getFile, saveFile } from "./services/filesystem";  // images
import eggs from "./routes/eggs";
import fields from "./routes/fields";
import bees from "./routes/bees";
import bears from "./routes/bears";
import users from "./routes/user";
import fs from "node:fs/promises";
import path from "path";

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
app.use("/api/bears", bears);
app.use("/api/users", authenticateUser, users);

// image routes
app.post("/images", saveFile);
app.get("/images/:id", getFile);

// starting server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


