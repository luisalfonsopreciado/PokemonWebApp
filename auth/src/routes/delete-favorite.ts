import express from "express";
import { requireAuth } from "../middlewares/require-auth";
import { body } from "express-validator";
import { User } from "../models/user";
import { NotFoundError } from "../errors/not-found-error";

const router = express.Router();

router.post(
  "/api/users/removeFavorite",
  body("name").trim().notEmpty().withMessage("You must supply a pokemon name"),
  requireAuth,
  async (req, res) => {
    const { name } = req.body;
    const user = await User.findById(req.currentUser?.id);

    if (!user) {
      throw new NotFoundError();
    }

    const index = user.favPokemon!.indexOf(name);
    const newFav = [...user.favPokemon!];

    if (index > -1) {
      newFav.splice(index, 1);
    }

    user.set({
      favPokemon: newFav,
    });

    await user.save();

    res.send(user.favPokemon);
  }
);

export { router as deleteFavoriteRouter };
