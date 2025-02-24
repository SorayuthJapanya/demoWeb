const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const removeBackground = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // สร้าง FormData และเพิ่มไฟล์
    const formData = new FormData();
    formData.append("file", fs.createReadStream(file.path));

    // ส่ง request ไปยัง Python RemBG API
    const response = await axios.post("http://localhost:5001/removebg", formData, {
      headers: {
        ...formData.getHeaders(), // กำหนด headers ให้ถูกต้อง
      },
    });

    // ส่งผลลัพธ์กลับไปยัง Frontend
    res.status(200).json({ imageResult: response.data.imageResult });
  } catch (error) {
    console.error("Error removing background:", error);
    res.status(500).json({ error: "Error removing background" });
  }
};

module.exports = { removeBackground };