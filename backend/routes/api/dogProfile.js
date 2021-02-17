const express = require("express");
const router = express.Router();
const { Dog, DogProfile, Image } = require("../../db/models");
// const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");
const {
  singlePublicFileUpload,
  singleMulterUpload,
} = require("../../utils/awsS3");

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    console.log("hello from router get");
  })
);

router.post(
  "/add",
  requireAuth,
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const { dogName, birthday, interests, dogImage } = req.body;

    let dogProfileImgUrl;
    try {
      dogProfileImgUrl = await singlePublicFileUpload(req.file);
    } catch (e) {
      console.error(e);
    }

    const owner = req.user.toJSON();

    const profileImageId = await Image.addImage(dogProfileImgUrl);

    const newDog = await Dog.create(
      {
        name: dogName,
        birthday,
        profileImageId,
        ownerId: owner.id,
        vaccination: null,
      },
      { returning: true }
    );

    const createDogProfile = await DogProfile.create({
      interests,
      dogId: newDog.id,
    });
    res.json({ newDog, createDogProfile });
  })
);

module.exports = router;