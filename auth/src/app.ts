import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { addFavoriteRouter } from "./routes/add-favorite";
import { deleteFavoriteRouter } from "./routes/delete-favorite";
import { getFavoriteRouter } from "./routes/get-favorite";
import { currentUser } from "./middlewares/current-user";
import cors from "cors";

const app = express();
app.set("trust proxy", true);
app.use(cors()); // adjust later
app.use(json());

app.use(currentUser);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.use(addFavoriteRouter);
app.use(deleteFavoriteRouter);
app.use(getFavoriteRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
