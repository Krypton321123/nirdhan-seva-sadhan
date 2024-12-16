import { useState, useEffect } from "react";
import axios from "axios";

const BlogDetails = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch blogs data when the component mounts
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response: any = await axios.get(
                    `${import.meta.env.VITE_APP_API_URL}/admin/get-blogs`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                    }
                );
                setBlogs(response.data.data); // Assuming response contains the blogs array
            } catch (err: any) {
                setError("Failed to fetch blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Handle delete blog
    const deleteBlog = async (id: string) => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_API_URL}/admin/delete-blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            // Remove the deleted blog from the state
            setBlogs(blogs.filter((blog) => blog._id !== id));
        } catch (err: any) {
            setError("Failed to delete blog");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="min-h-screen w-full bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Blog Details</h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                <table className="table-auto w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Created At</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog._id} className="text-center">
                            <td className="border px-4 py-2">{blog.title}</td>
                            <td className="border px-4 py-2">
                                {new Date(blog.createdAt).toLocaleString()}
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => deleteBlog(blog._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlogDetails;