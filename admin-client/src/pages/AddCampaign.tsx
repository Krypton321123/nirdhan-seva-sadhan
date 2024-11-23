import { ChangeEvent, MouseEvent, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendurl } from "../Constants";

const AddCampaign = () => {
  const authToken = localStorage.getItem("authToken");
  const editor = useRef(null);
  const [content, setContent] = useState(""); // For campaign description
  const [title, setTitle] = useState(""); // For campaign name
  const [goal, setGoal] = useState(""); // For campaign goal
  const [image, setImage] = useState<File | null>(null); // For campaign image

  const config = useMemo(() => {
    return { height: "20rem" }; // JoditEditor configuration
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validation
    if (title.trim() === "" || content.trim() === "" || goal.trim() === "" || !image) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", content);
    formData.append("goal", goal);
    formData.append("image", image);

    console.log(title, content, goal, image)

    try {
      const response: any = await axios.post(`${backendurl}/admin/create-campaign`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response)

      if (response.status === 200 || response.status === 201) {
        toast.success("Campaign created successfully!");
        setTitle("");
        setContent("");
        setGoal("");
        setImage(null);
      } else {
        toast.error(response.data.message || "Error creating campaign.");
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
          <span className="font-bold text-4xl ml-4 mt-8">Add New Campaign</span>
        </div>
        <div className="inputs w-[100%] h-[80%]">
          {/* Campaign Title */}
          <div className="title ml-4 mt-8">
            <p className="mb-2 text-lg">Campaign Name</p>
            <input
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter campaign name"
              className="p-2 rounded-lg focus:outline-none border-2 border-slate-950 w-[98%]"
            />
          </div>
          {/* Campaign Goal */}
          <div className="goal ml-4 mt-4">
            <p className="mb-2 text-lg">Campaign Goal (in INR)</p>
            <input
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setGoal(e.target.value)}
              value={goal}
              placeholder="Enter campaign goal"
              className="p-2 rounded-lg focus:outline-none border-2 border-slate-950 w-[98%]"
            />
          </div>
          {/* Campaign Description */}
          <div className="content ml-4 mt-8">
            <p className="mb-2 text-lg">Campaign Description</p>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
              config={config}
            />
          </div>
          {/* Campaign Image */}
          <div className="image-upload ml-4 mt-8">
            <p className="mb-2 text-lg">Upload Campaign Image</p>
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

export default AddCampaign;
