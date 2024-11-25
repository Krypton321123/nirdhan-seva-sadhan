import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [latestBlog, setLatestBlog] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const blogsPerPage = 10;

  const fetchBlogs = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/blogs/latestBlogs?page=${page}&limit=${blogsPerPage}`
      );
      const { data, totalPages: total, currentPage: current } = response.data;

      setBlogs(data.blogs || []);
      setTotalPages(total);
      setCurrentPage(current);

      if (page === 1 && data.blogs.length > 0) {
        setLatestBlog(data.blogs[0]);
      }
    } catch (err) {
      setError("Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const extractPlainText = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Our <span className="text-green-500">Blogs</span>
      </h1>

     
      {latestBlog && (
        <div className="mb-12 bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 h-[300px] mb-4 lg:mb-0 lg:mr-4">
            <img
              src={latestBlog.imageURL || "https://via.placeholder.com/800x500"}
              alt={latestBlog.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              {latestBlog.title}
            </h2>
            <p className="text-gray-600 mb-4 text-lg">
              {extractPlainText(latestBlog.content).slice(0, 150)}...
            </p>
            <Link
              to={`/detailedblog/${latestBlog._id}`}
              className="inline-block py-2 px-4 text-white bg-green-500 rounded-lg hover:bg-green-700 transition"
            >
              Read More
            </Link>
          </div>
        </div>
      )}

      
      {loading ? (
        <div className="text-center text-gray-600">Loading blogs...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-100 rounded-lg shadow-lg p-4 flex flex-col"
            >
              <div className="h-[200px] mb-4">
                <img
                  src={blog.imageURL || "https://via.placeholder.com/800x500"}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {extractPlainText(blog.content).slice(0, 100)}...
              </p>
              <Link
                to={`/detailedblog/${blog._id}`}
                className="mt-auto py-2 px-4 text-white bg-green-500 rounded-lg hover:bg-green-700 transition"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}

   
      <div className="mt-8 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`py-2 px-4 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-700"
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`py-2 px-4 rounded-lg ${
              currentPage === i + 1
                ? "bg-green-700 text-white"
                : "bg-green-500 text-white hover:bg-green-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`py-2 px-4 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
