import express from "express";
import { currentUser } from "../middlewares/current-user";
const router = express.Router();

router.post("/api/users/signout", currentUser, (req, res) => {
  req.currentUser?.removeToken();
  res.send({});
});

export { router as signoutRouter };
