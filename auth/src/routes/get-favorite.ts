import express from "express";
import { requireAuth } from "../middlewares/require-auth";
import { User } from "../models/user";
import { NotFoundError } from "../errors/not-found-error";

const router = express.Router();

router.get("/api/users/favorite", requireAuth, async (req, res) => {
  const user = await User.findById(req.currentUser?.id);

  if (!user) {
    throw new NotFoundError();
  }

  res.send(user.favPokemon || []);
});

export { router as getFavoriteRouter };
