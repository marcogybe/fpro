import express from "express";
import {
  signUpController,
  loginController,
  emailConfirmationHandler,
  resetPasswordController,
  changePasswordController,
  PasswordRecoveryController,
  authorizeUser,
} from "../controllers/userControllers.js";
import {
  singleProfileDetails,
  updateProfileController,
} from "../controllers/profileControllers.js";
import { authorizationHandler } from "../middlewares/authorization.js";
import { passwordConfirmHandler } from "../middlewares/passwordConfirmHandler.js";
import multer from 'multer'

const upload = multer({dest: 'images'})

const router = express.Router();

router.post("/signup", passwordConfirmHandler, signUpController);
router.get("/confirm-email/:token", emailConfirmationHandler);
router.post("/login", loginController);
router.get("/authorize-user", authorizationHandler, authorizeUser);
router.get("/profile-details", authorizationHandler, singleProfileDetails);
router.put("/update-profile", upload.single('avatar'), authorizationHandler, updateProfileController);
router.post("/reset-password", resetPasswordController);
router.put("/reset-password", PasswordRecoveryController);
router.put("/change-password", authorizationHandler, changePasswordController);
/* router.get("/get-users", authorizationHandler, getUsers); */

export default router;
