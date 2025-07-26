import Sound from "../models/Sound.ts";

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
    const { name, url } = req.body;
    const newSound = new Sound({ name, url });
    await newSound.save();
    res.status(201).json(newSound);
  } catch (error) {
    res.status(400).json({ message: 'Error creating sound' });
  }
}

export const deleteSound = async (req, res) => {
  try {
    await Sound.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sound deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sound' });
  }
}