import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

router.post("/notify", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingNotification = await Notification.findOne({ email });

    if (existingNotification) {
      return res.json({ alreadyNotified: true });
    }

    const newNotification = new Notification({ email });
    await newNotification.save();

    res.status(201).json({ alreadyNotified: false });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
