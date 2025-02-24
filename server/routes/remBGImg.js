const express = require("express");
const multer = require("multer");
const { removeBackground } = require("../controllers/imageController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ใช้ upload.single() และระบุชื่อ field ให้ตรงกับ Frontend
router.post("/removebg", upload.single("file"), removeBackground);

module.exports = router;