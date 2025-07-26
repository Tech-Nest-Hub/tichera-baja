import Sound from "../models/Sound.js";

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
    const { name, avatar } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No audio file uploaded' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const newSound = new Sound({ 
      name: name || req.file.originalname,
      url: fileUrl,
      avatar: avatar || '', // Handle empty avatar case
      // Additional fields from file will be automatically ignored by Mongoose
    });

    await newSound.save();
    res.status(201).json({
      _id: newSound._id,
      name: newSound.name,
      avatar: newSound.avatar,
      url: newSound.url,
      createdAt: newSound.createdAt
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ 
      message: error.message || 'Error creating sound',
      // Don't expose full error in production
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
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