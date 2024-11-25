import { ChangeEvent, MouseEvent, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddGalleryImage = () => {
  const authToken = localStorage.getItem("authToken");
  const [image, setImage] = useState<File | null>(null); // For gallery image
  const [description, setDescription] = useState(""); // For gallery image description

  // Handle file input
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validation
    if (!image || description.trim() === "") {
      toast.error("Please upload an image and provide a description.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try {
      const response: any = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/admin/create-gallery-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Image added to gallery successfully!");
        setImage(null);
        setDescription("");
      } else {
        toast.error(response.data.message || "Error adding image to gallery.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[95%] h-[95%] rounded-xl bg-gray-200">
        <div className="title w-[100%] h-[5rem] flex justify-start">
          <span className="font-bold text-4xl ml-4 mt-8">Add Gallery Image</span>
        </div>
        <div className="inputs w-[100%] h-[80%]">
          {/* Image Description */}
          <div className="description ml-4 mt-8">
            <p className="mb-2 text-lg">Image Description</p>
            <textarea
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              value={description}
              placeholder="Enter image description"
              className="p-2 rounded-lg focus:outline-none border-2 border-slate-950 w-[98%] h-[5rem]"
            />
          </div>
          {/* Image Upload */}
          <div className="image-upload ml-4 mt-8">
            <p className="mb-2 text-lg">Upload Image</p>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          {/* Submit Button */}
          <div className="button w-auto flex justify-center items-center h-[16%]">
            <button
              onClick={handleSubmit}
              className="border-2 border-slate-950 hover:opacity-50 rounded-full bg-white w-[10rem] h-[3rem]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGalleryImage;
