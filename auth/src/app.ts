import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import {currentUser} from "./middlewares/current-user"
import cors from "cors";

const app = express();
app.set("trust proxy", true);
app.use(cors()); // adjust later
app.use(json());

app.use(currentUser)

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
