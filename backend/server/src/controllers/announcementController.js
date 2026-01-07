const Announcement = require("../models/Announcement");

async function listAnnouncements(req, res) {
  const posts = await Announcement.find().sort({ createdAt: -1 }).populate("createdBy", "name email");
  res.json(posts);
}

async function createAnnouncement(req, res) {
  const { title, body } = req.body;
  if (!title || !body) return res.status(400).json({ message: "Title and body required" });

  const post = await Announcement.create({
    title,
    body,
    createdBy: req.user.id,
  });

  res.status(201).json(post);
}

module.exports = { listAnnouncements, createAnnouncement };
