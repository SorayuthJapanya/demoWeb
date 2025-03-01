import React from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const ResultClass = () => {
    const location = useLocation();
    const { processedImage, result } = location.state || { processedImage: null, result: [] };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Classification Result
                </h1>

                {/* แสดงรูปภาพที่ประมวลผลแล้ว */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                            Processed Image
                        </h2>
                        <div className="flex justify-center">
                            {processedImage ? (
                                <img
                                    src={processedImage}
                                    alt="Processed"
                                    className="max-w-full h-auto rounded-lg shadow-md"
                                />
                            ) : (
                                <p className="text-gray-500">Don't have processed image</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* แสดงผลลัพธ์ Percentage */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-auto">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                        Classification Result
                    </h2>
                    {result && result.length > 0 ? (
                        <ul className="space-y-4">
                            {result.map((item, index) => (
                                <li key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                    <span className="font-semibold text-gray-700">{item.thai_name}</span>
                                    <span className="text-blue-600 font-bold">{item.percentage}%</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center">NO Resutl</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultClass;