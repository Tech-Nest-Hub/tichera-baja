import Sound from "../models/Sound.js";
import fs from 'fs';
export const getAllSounds = async (req, res) => {
  try {
    const sounds = await Sound.find();
    res.json(sounds);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sounds' });
  }
}

export const postSound = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    const { name } = req.body;
    if (!name) {
      // Delete the uploaded file if name is missing
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "Name is required!" });
    }

    // Construct URL (e.g., "http://localhost:5000/uploads/sound-123.mp3")
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/sounds/${req.file.filename}`;

    const newSound = new Sound({
      name,
      url: fileUrl, // Store URL in MongoDB
    });

    await newSound.save();

    res.status(201).json({
      success: true,
      message: "Sound uploaded!",
      sound: newSound,
    });

  } catch (error) {
    console.error("Error uploading sound:", error);
    if (req.file) fs.unlinkSync(req.file.path); // Clean up file if error
    res.status(500).json({ error: "Failed to upload sound." });
  }
};
export const deleteSound = async (req, res) => {
  try {
    await Sound.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sound deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sound' });
  }
}