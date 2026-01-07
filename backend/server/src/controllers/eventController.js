const Event = require("../models/Event");

async function listEvents(req, res) {
  const events = await Event.find().sort({ date: 1 }).populate("createdBy", "name email");
  res.json(events);
}

async function createEvent(req, res) {
  const { title, date, description } = req.body;
  if (!title || !date) return res.status(400).json({ message: "Title and date required" });

  const event = await Event.create({
    title,
    date: new Date(date),
    description: description || "",
    createdBy: req.user.id,
    attendees: [],
  });

  res.status(201).json(event);
}

async function rsvpEvent(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  const event = await Event.findById(id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const already = event.attendees.some((a) => a.toString() === userId);
  if (!already) event.attendees.push(userId);
  await event.save();

  res.json({ message: already ? "Already RSVPed" : "RSVP successful" });
}

module.exports = { listEvents, createEvent, rsvpEvent };
