import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const allowedExtensions = ["JPEG", "JPG", "jpg", "jpeg", "webp", "WEBP"];

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const extension = file.name.split(".").pop().toLowerCase();

            if (!allowedExtensions.includes(extension)) {
                alert("Invalid file type. Please upload a JPG, jpg, jpeg, WEBP file.");
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);

            // นำทางไปยังหน้า /removebg พร้อมส่ง state ของรูปภาพ
            navigate("/removebg", { state: { image: imageUrl, file } });
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 md:gap-8 p-6 m-12">
            <div className="container mx-auto flex flex-col md:flex-row items-center ">
                {/* ส่วนแสดงรูปภาพ */}
                <div className="md:w-1/2 flex flex-col items-center">
                    <div className="relative w-full max-w-lg">
                        <img
                            src={
                                image ||
                                "https://plus.unsplash.com/premium_photo-1683309565422-77818a287060?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            }
                            alt="Uploaded"
                            className="w-100 h-auto rounded-3xl shadow-lg "
                        />
                    </div>
                    <h1 className="mt-6 text-2xl font-semibold text-gray-800 text-center">
                        Remove Image Background Instantly
                    </h1>
                    <p className="text-gray-600 text-center mt-2">
                        Upload an image and remove the background in seconds!
                    </p>
                    <br />
                </div>

                {/* ส่วนปุ่มอัปโหลดไฟล์ */}
                <div className="md:w-1/2 px-6 flex flex-col items-center ">
                    <div className="bg-white p-24 rounded-2xl shadow-xl border border-gray-200 w-full max-w-md text-center">
                        <label className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ">
                            Upload Image
                            <input
                                type="file"
                                className="hidden hover:scale-125"
                                onChange={handleFileUpload}
                            />
                        </label>
                        <p className="mt-3 text-gray-600">or drag & drop a file</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;