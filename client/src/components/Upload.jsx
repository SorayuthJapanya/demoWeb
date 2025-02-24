import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";

const Upload = () => {
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const allowedExtensions = ["JPEG", "JPG", "jpg", "jpeg", "webp", "WEBP"];

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const extension = file.name.split(".").pop().toLowerCase();

            if (!allowedExtensions.includes(extension)) {
                alert("Invalid file type. Please upload a JPG, JPEG, or WEBP file.");
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);

            // นำทางไปยังหน้า /removebg พร้อมส่ง state ของรูปภาพ
            navigate("/removebg", { state: { image: imageUrl, file } });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Upload an Image to Remove the Background
                </h1>

                {/* Upload Section */}
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
                    {/* Upload Button */}
                    <div className="flex justify-center">
                        <label className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                            Upload Image
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </label>
                    </div>

                    {/* Additional Text */}
                    <p className="text-center text-gray-600 mt-6">
                        Supported formats: JPG, JPEG, WEBP
                    </p>

                    {/* Tips */}
                    <div className="mt-8 text-center text-gray-600">
                        <p className="text-sm">Tip: Use high-quality images for the best results.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;