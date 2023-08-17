import userModel from "../models/userModel.js";
import profileModel from "../models/profileModel.js";
import googleProfileModel from "../models/googleProfileModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { emailSender } from "../utils/emailSender.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

/* export const getUsers = async (req, res) => {
   try {
    if (req.localData) {
      console.log("localData", req.localData);
      const users = await userModel.find();
      res.status(200).json({ users });
    } else if (req.googleData) {
      console.log("googleData", req.googleData);
      const users = await userModel.find();
      res.status(200).json({ users });
    }
  } catch (error) {
    console.log(error.message);
  } 
}; */

export const signUpController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check if that email is already saved in DB.
    const alreadyExist = await userModel.findOne({ email: email });
    if (alreadyExist !== null) {
      const err = new Error("Email already registered");
      err.status = 400;
      throw err;
    }

    const saltRounds = 11;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      name,
      email,
      hashedPassword,
    });

    const newUser = await user.save();

    newUser.hashedPassword = undefined;

    const profile = new profileModel({
      owner: newUser._id,
      name: newUser.name,
    });

    const newProfile = await profile.save();

    //Generating a token that we want to pass in email, to verify a user's email address.
    const payload = {
      name: name,
      email: email,
      userId: newUser._id,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 2 * 60 * 60 });

    // Declaring the variables that we can pass to the function that is responsible for sending the email
    const subject = "Email Verification";
    const plainText = `  Dear ${name}! We have received your request to register by our Gift Shop. Please follow
           the link to verify your email:  http://localhost:3000/confirm-email/${token}`;

    const htmlText = `
               <h2>Dear ${name}!</h2>
               <p>We have received your request to register by our Gift4U Shop. Please follow
               the link to verify your email:
                   <a href= "http://localhost:3000/confirm-email/${token}">Click Here! </a>
               </p>`;
    // calling the function emailSender to send an email to the user.
    const emailStatus = await emailSender(email, subject, plainText, htmlText);

    if (!emailStatus) {
      const err = new Error(
        "Failed to send email to the user to verify his account. Please try again."
      );
      err.status = 500;
      throw err;
    }

    res.status(201).json("You have registered successfully.");
  } catch (err) {
    next(err);
  }
};

// To confirm the user's email to register
export const emailConfirmationHandler = async (req, res) => {
  try {
    const { token } = req.params;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { email } = decodedData;

    const result = await userModel.findOne({ email: email });
    result.verified = true;
    await result.save();

    res.status(200).send("Email verified successfully");
  } catch (err) {
    res.status(401).send("Your Email is not valid or the token is expired.");
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userDataFromDB = await userModel.findOne({ email });

    if (userDataFromDB === null) {
      const err = new Error("Invalid Credentials");
      err.status = 400;
      throw err;
    }

    const hashedPassword = userDataFromDB.hashedPassword;

    const isValid = await bcrypt.compare(password, hashedPassword);

    // Checking either the user has confirmed his email address or not

    if (!userDataFromDB.verified)
      return res.status(400).send("Please confirm your email first!");

    if (isValid) {
      const payload = {
        email: email,
        name: userDataFromDB.name,
        userId: userDataFromDB._id,
      };

      const token = jwt.sign(payload, JWT_SECRET_KEY);

      const profileDataFromDB = await profileModel.findOne({ owner: userDataFromDB._id }, {avatar: 1});  

      res.status(201).json({
        message: `Hi ${payload.name}, you are logged in successfully.`,
        token: token,
        name: userDataFromDB.name,
        userId: userDataFromDB._id,
        email: userDataFromDB.email,
        avatar: profileDataFromDB.avatar
      });
    } else {
      const err = new Error("Invalid Credentials");
      err.status = 400;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

export const authorizeUser = async (req, res, next) => {
  try {
    if (req.localData) {
      const result = await profileModel.findOne({
        owner: req.localData.userId,
      }, { owner: 1, name: 1, avatar: 1 });
     
      res.status(200).json(result);
    } 
    else if (req.googleData) {
      const result = await googleProfileModel.findOne({
        owner: req.googleData.userId,
      }, { owner: 1, name: 1, avatar: 1 });
      
      if (result) {
        res.status(200).json(result);
      } 
      else {
        const googleProfile = new googleProfileModel({
          owner: req.googleData.userId,
          name: req.googleData.name,
          avatar: req.googleData.picture
        });
        const newProfile = await googleProfile.save();
        res.status(200).json(newProfile);
      }
    }
  } catch (err) {
    next(err);
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    const email = req.body.email;

    // check if that email is already saved in DB.
    const alreadyExist = await userModel.findOne({ email: email });
    if (alreadyExist === null) {
      const err = new Error("Invalid Email address!");
      err.status = 400;
      throw err;
    }

    //Generating a token that we want to pass in email, to verify a user's email address.
    const payload = {
      name: alreadyExist.name,
      email: alreadyExist.email,
      userId: alreadyExist._id,
    };

    // Using the hashedPassword as a private key to make that token, we send to the user by email, to be used only once.
    const PRIVATE_KEY = alreadyExist.hashedPassword;

    const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: 2 * 60 * 60 });

    // Declaring the variables that we can pass to the function that is responsible for sending the email to reset the password
    const subject = "Gift4U Reset Password";
    const plainText = `  Dear ${alreadyExist.name}! We have received your request to reset the password of your Gift4U account. Please follow the link to verify your email:  http://localhost:3000/reset-password/${alreadyExist.email}/${token}`;

    const htmlText = `
        <h2>Dear ${alreadyExist.name}!</h2>
        <p>We have received your request to reset the password of your Gift4U account. Please follow the link to verify your email:
            <a href= "http://localhost:3000/reset-password/${alreadyExist.email}/${token}">Click Here! </a>
        </p>`;

    // calling the function emailSender to send an email to the user.
    const emailStatus = await emailSender(
      alreadyExist.email,
      subject,
      plainText,
      htmlText
    );

    if (!emailStatus) {
      const err = new Error(
        "Failed to send email to the user to reset the password. Please try again."
      );
      err.status = 500;
      throw err;
    }
    res
      .status(202)
      .send(
        "We have just sent an email to your registered email address. In rare cases, delivery may take a few minutes. Please also check your spam folder."
      );
  } catch (err) {
    next(err);
  }
};

export const PasswordRecoveryController = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const { password, confirmPassword, email } = req.body;

    if (password !== confirmPassword) {
      const error = new Error("Password and Confirm Password must be same");
      err.statusCode = 400;
      throw error;
    }

    const userObject = await userModel.findOne(
      { email },
      { hashedPassword: 1 }
    );
    const PRIVATE_KEY = userObject.hashedPassword;

    jwt.verify(token, PRIVATE_KEY, (err, result) => {
      if (err) {
        const err = new Error(
          "You already used that link once, and you can't use it again."
        );
        err.status = 400;
        throw err;
      }
      return result;
    });

    //  Hashing the new password which is coming from FE

    const saltRounds = 11;
    const salt = await bcrypt.genSalt(saltRounds);
    const newHashedPassword = await bcrypt.hash(password, salt);

    const currentUser = await userModel.findOneAndUpdate(
      { email },
      {
        hashedPassword: newHashedPassword,
      }
    );

    res.status(201).send("Password changed successfully.");
  } catch (err) {
    next(err);
  }
};

export const changePasswordController = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      const error = new Error("New Password and Confirm Password must be same");
      err.status = 400;
      throw error;
    }

    const userObject = await userModel.findById(req.localData.userId);

    if (userObject === null) {
      const err = new Error(
        "Invalid Credentials, You are not authorized to change the password."
      );
      err.statusCode = 400;
      throw err;
    }

    const isValid = await bcrypt.compare(
      currentPassword,
      userObject.hashedPassword
    );

    if (!isValid) {
      const err = new Error("You entered wrong current password");
      err.statusCode = 400;
      throw err;
    }

    //  Hashing the new password which is coming from FE

    const saltRounds = 11;
    const salt = await bcrypt.genSalt(saltRounds);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    const currentUser = await userModel.findByIdAndUpdate(
      req.localData.userId,
      {
        hashedPassword: newHashedPassword,
      }
    );

    res.status(201).send("Password changed successfully.");
  } catch (err) {
    next(err);
  }
};
