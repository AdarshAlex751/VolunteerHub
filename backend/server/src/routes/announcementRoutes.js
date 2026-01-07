const router = require("express").Router();
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { listAnnouncements, createAnnouncement } = require("../controllers/announcementController");

router.get("/", requireAuth, listAnnouncements);
router.post("/", requireAuth, requireAdmin, createAnnouncement);

module.exports = router;
