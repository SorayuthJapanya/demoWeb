from flask import Flask, request, jsonify
from rembg import remove
import os

app = Flask(__name__)

@app.route("/removebg", methods=["POST"])
def remove_bg():
    try:
        # รับไฟล์รูปภาพจาก request
        image_file = request.files["file"]
        input_path = os.path.join("uploads", image_file.filename)
        output_path = os.path.join("processed", "output.png")

        # บันทึกไฟล์ชั่วคราว
        image_file.save(input_path)

        # ลบพื้นหลัง
        with open(input_path, "rb") as input_file:
            with open(output_path, "wb") as output_file:
                input_data = input_file.read()
                output_data = remove(input_data)
                output_file.write(output_data)

        # ส่งผลลัพธ์กลับ
        return jsonify({"imageResult": output_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001)