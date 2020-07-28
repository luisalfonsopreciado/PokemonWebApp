import express from "express";
import { requireAuth } from "../middlewares/require-auth";
import { body } from "express-validator";
import { User } from "../models/user";
import { NotFoundError } from "../errors/not-found-error";

const router = express.Router();

router.post(
  "/api/users/addFavorite",
  body("name").trim().notEmpty().withMessage("You must supply a pokemon name"),
  requireAuth,
  async (req, res) => {
    const { name } = req.body;
    const user = await User.findById(req.currentUser?.id);

    if (!user) {
      throw new NotFoundError();
    }

    const newFav = [...user.favPokemon!];
    newFav.push(name);

    user.set({
      favPokemon: newFav,
    });

    await user.save();

    res.send(user.favPokemon);
  }
);

export { router as addFavoriteRouter };
