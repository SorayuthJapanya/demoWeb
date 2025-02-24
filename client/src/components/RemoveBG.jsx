import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { ClipLoader } from "react-spinners";

const RemoveBG = () => {
    const location = useLocation();
    const { image, file } = location.state || { image: null, file: null };
    const [processedImage, setProcessedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (file) {
            removeBackground(file);
        }
    }, [file]);

    const removeBackground = async (file) => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            // ส่งรูปภาพไปยัง Backend
            const response = await axios.post("http://localhost:5000/api/removebg", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // รับรูปภาพที่ผ่านการลบพื้นหลังแล้ว
            const resultImage = `http://localhost:5000/${response.data.imageResult}`;
            setProcessedImage(resultImage);

            // เพิ่มข้อมูลลงในประวัติ
            // setHistory((prevHistory) => [
            //     ...prevHistory,
            //     { original: image, processed: resultImage, timestamp: new Date().toLocaleString() },
            // ]);
        } catch (error) {
            console.error("Error removing background:", error);
            setError("Error removing background. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Heading */}
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Remove Background
                </h1>

                {/* Loading Animation */}
                {loading && (
                    <div className="flex justify-center my-8">
                        <ClipLoader color="#36d7b7" loading={loading} size={60} />
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <p className="text-center text-red-500 mb-4">{error}</p>
                )}

                {/* Image Display */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Original Image (Left Side) */}
                    {image && (
                        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                                Original Image
                            </h2>
                            <div className="flex justify-center">
                                <img
                                    src={image}
                                    alt="Uploaded"
                                    className="max-w-full max-h-80 w-auto h-auto rounded-lg object-contain"
                                />
                            </div>
                        </div>
                    )}

                    {/* Processed Image (Right Side) */}
                    {processedImage && (
                        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                                Processed Image
                            </h2>
                            <div className="flex justify-center">
                                <img
                                    src={processedImage}
                                    alt="Processed"
                                    className="max-w-full max-h-80 w-auto h-auto rounded-lg object-contain"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RemoveBG;