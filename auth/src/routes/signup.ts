import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 5 and 20 characters"),
    body("password2").notEmpty().withMessage("You must provide 2 passwords"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, password2 } = req.body;

    if (password !== password2) {
      throw new BadRequestError("Passwords do not match");
    }

    //Find existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already in Use");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    user.addToken(userJwt);
    
    res.status(201).send({ token: userJwt });
  }
);

export { router as signupRouter };
