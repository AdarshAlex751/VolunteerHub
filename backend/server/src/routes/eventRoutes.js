const router = require("express").Router();
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { listEvents, createEvent, rsvpEvent } = require("../controllers/eventController");

router.get("/", requireAuth, listEvents);
router.post("/", requireAuth, requireAdmin, createEvent);
router.post("/:id/rsvp", requireAuth, rsvpEvent);

module.exports = router;
