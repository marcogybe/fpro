import profileModel from "../models/profileModel.js";
import googleProfileModel from "../models/googleProfileModel.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import fs from "fs";

dotenv.config();

const cloudName = process.env.CLOUDINARY_NAME;
const cloudApiKey = process.env.CLOUDINARY_API_KEY;
const cloudApiSecret = process.env.CLOUDINARY_API_SECRET;

export const singleProfileDetails = async (req, res, next) => {
  try {
    if (req.localData) {
      const result = await profileModel.findOne({
        owner: req.localData.userId,
      });
      res.status(200).json(result);
    } else if (req.googleData) {
      const result = await googleProfileModel.findOne({
        owner: req.googleData.userId,
      });
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

export const updateProfileController = async (req, res, next) => {
  try {
    const { name, location, interests } = req.body;

    const bodyOfRequest = {
      name,
      location,
      interests,
    };

    const updateData = {};
    /* Looping through the newly created object bodyOfRequest to check which field need to be updated on database */
    for (const [key, value] of Object.entries(bodyOfRequest)) {
      if (value) {
        updateData[key] = value;
      }
    }
   

    cloudinary.config({
      cloud_name: cloudName,
      api_key: cloudApiKey,
      api_secret: cloudApiSecret,
    });

    if (req.file) {
      const cloudResult = await cloudinary.v2.uploader.upload(
        req.file.path,
        { public_id: Date.now() + req.file.filename },
        (err, result) => {
          if (err) {
            const error = new Error("Failed to upload the Image");
            error.statusCode = 400;
            throw error;
          } else return result;
        }
      );
      updateData.avatar = cloudResult.url;
      fs.unlinkSync(req.file.path);
    }

  
    if (req.localData) {
      const result = await profileModel.findOneAndUpdate(
        { owner: req.localData.userId },
        updateData
      );
      res.status(201).send("Your profile has been updated successfully");
    } else if (req.googleData) {
      const result = await googleProfileModel.findOneAndUpdate(
        { owner: req.googleData.userId },
        updateData
      );
      res.status(201).send("Your profile has been updated successfully");
    }
  } catch (err) {
    next(err);
  }
};
