import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { backendurl } from "../constants";

const DetailedBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/blogs/getDetailedBlog/${id}`);
      setBlog(response.data.data.blog); 
    } catch (err) {
      setError("Failed to fetch blog details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-600 py-16">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-16">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center text-gray-600 py-16">Blog not found.</div>;
  }

  return (
    <div className="container mx-auto py-16 px-4">
     
      {blog.imageURL && (
        <div className="mb-8">
          <img
            src={blog.imageURL}
            alt={blog.title}
            className="w-full max-h-[500px] object-cover rounded-lg"
          />
        </div>
      )}

     
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">{blog.title}</h1>

    
      <p className="text-gray-600 mb-6">
        Published on{" "}
        {new Date(blog.createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

     
      <div
        className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default DetailedBlog;
