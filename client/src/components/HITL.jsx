
import React, { useState } from 'react';
import { useLocation, useNavigate } from
    'react-router-dom';
import axios from 'axios'

import Navbar from './Navbar';

const HITL = () => {

    const location = useLocation()
    const navigate = useNavigate();
    const { processedImage } = location.state

    // State form Data
    const [formData, setFormData] = useState({
        base_color: "",
        shape: "",
        vein: "",
        margin: "",
        midrib: "",
        petiole_shape: "",
        petiole_color: "",
        type_leaf: "",
        stem: "",
        thorny: "",
    });

    // Set result backend
    const [result, setResult] = useState(null)

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/findClass', formData);
            console.log("Response from backend:", response.data);
            navigate('/result', { state: { processedImage, result: response.data.data } }); // ส่งข้อมูลไปยังหน้า ResultClass
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("Error submitting form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-scree bg-slate-50">
            <Navbar />
            <header className="text-black  py-10 text-center">
                <h1 className="text-3xl font-semibold">Classification Phase (Human in the Loop)</h1>
            </header>

            <div className="container mx-auto p-6">
                <div className="bg-white-100 rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6">
                    {/* Image Section */}
                    <div className="flex-1 ">
                        <div className="border-2 border-dashed border-blue-300 p-6 rounded-lg text-center flex justify-center items-center h-full" >
                            {processedImage ? (
                                <img
                                    src={processedImage}
                                    alt="Processed"
                                    className="w-72 h-auto rounded-lg "
                                />
                            ) : (
                                <p className="text-gray-500">No processed image available</p>
                            )}
                        </div>
                    </div>

                    {/* Form Section */}
                    <form className="flex-1" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Column 1 */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">สีโคนใบ</label>
                                    <input
                                        type="text"
                                        name="base_color"
                                        value={formData.base_color}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">รูปร่างของใบ</label>
                                    <input
                                        type="text"
                                        name="shape"
                                        value={formData.shape}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">สีเส้นใบ</label>
                                    <input
                                        type="text"
                                        name="vein"
                                        value={formData.vein}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">สีขอบใบ</label>
                                    <input
                                        type="text"
                                        name="margin"
                                        value={formData.margin}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">สีเส้นกลางใบ</label>
                                    <input
                                        type="text"
                                        name="midrib"
                                        value={formData.midrib}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">รูปร่างก้านใบ</label>
                                    <input
                                        type="text"
                                        name="petiole_shape"
                                        value={formData.petiole_shape}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">สีก้านใบ</label>
                                    <input
                                        type="text"
                                        name="petiole_color"
                                        value={formData.petiole_color}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ชนิดของใบ</label>
                                    <input
                                        type="text"
                                        name="type_leaf"
                                        value={formData.type_leaf}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ลักษณะของลำต้น</label>
                                    <input
                                        type="text"
                                        name="stem"
                                        value={formData.stem}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">มีหนามไหม?</label>
                                    <input
                                        type="text"
                                        name="thorny"
                                        value={formData.thorny}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Submit"}
                        </button>
                    </form>
                </div>

                {/* แสดงผลลัพธ์จาก Backend */}
                {result && Array.isArray(result) && result.map((item, index) => (
                    <li key={index} className="mb-2">
                        <span className="font-semibold">{item.thai_name}</span>: {item.percentage}%
                    </li>
                ))}

                {/* แสดงข้อผิดพลาด */}
                {error && (
                    <p className="mt-4 text-center text-red-500">{error}</p>
                )}
            </div>
        </div>
    );
};

export default HITL;