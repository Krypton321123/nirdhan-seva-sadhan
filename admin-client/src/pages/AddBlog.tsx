import { ChangeEvent, MouseEvent, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import axios from "axios";

const AddBlog = () => {
  const authToken = localStorage.getItem("authToken");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const config = useMemo(() => {
    return { height: "26rem" }; // Keep editor compact for layout consistency
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: MouseEvent<HTMLElement>) => {
    if (!content.trim() || !title.trim() || !image) {
      toast("Please fill all fields, including the image.");
      return;
    }

    const formData = new FormData();
    formData.append("blogTitle", title);
    formData.append("blogContent", content);
    formData.append("image", image);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/admin/create-blog`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        toast.success("Your blog has been created");
        setTitle(prev => "")
        setContent("")
        setImage(null)
      } else {
        toast.error("Error creating blog");
      }
    } catch (err: any) {
      console.warn(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[90%] h-[90%] rounded-xl bg-gray-200 flex flex-col justify-between p-6">
        <div className="title w-full h-auto">
          <span className="font-bold text-3xl">Add New Blog</span>
        </div>
        <div className="inputs w-full flex-1 overflow-hidden">
          <div className="title mb-4">
            <p className="text-lg mb-2">Blog Title (Should be unique)</p>
            <input
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              className="p-2 rounded-lg focus:outline-none border-2 border-slate-950 w-full"
            />
          </div>
          <div className="content mb-4">
            <p className="text-lg mb-2">Blog Content</p>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
              config={config}
            />
          </div>
          <div className="image-upload mb-4">
            <p className="text-lg mb-2">Upload Blog Image</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="p-2 rounded-lg focus:outline-none w-full"
            />
          </div>
        </div>
        <div className="button flex justify-center">
          <button
            onClick={handleSubmit}
            className="border-2 border-gray-700 hover:opacity-70 rounded-full bg-white w-[10rem] h-[3rem]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
