import { useState, useEffect } from "react";
import axios from "axios";

const GalleryDetails = () => {
    const [gallery, setGallery] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch gallery items when the component mounts
    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response: any = await axios.get(
                    `${import.meta.env.VITE_APP_API_URL}/admin/get-gallery`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                    }
                );
                setGallery(response.data.data); // Assuming response contains the gallery items array
            } catch (err: any) {
                setError("Failed to fetch gallery items");
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    // Handle delete gallery item
    const deleteGalleryItem = async (id: string) => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_API_URL}/admin/delete-gallery-item/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            // Remove the deleted gallery item from the state
            setGallery(gallery.filter((item) => item._id !== id));
        } catch (err: any) {
            setError("Failed to delete gallery item");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="min-h-screen w-full bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Gallery Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gallery.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
                        <img
                            src={item.imageURL}
                            alt="Gallery Item"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                        <p className="text-sm text-gray-500 mb-4">
                            {new Date(item.date).toLocaleDateString()}
                        </p>
                        <button
                            onClick={() => deleteGalleryItem(item._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryDetails;