import axios from "axios"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom"

export const Publish = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate();
  const publish = async () => {
    if (title === "") {
      alert("Please add title");
      return;
    }
    if (content === "") {
      alert("Please add content");
      return;
    }
    const token = localStorage.getItem("token");

    const id = "ff68c16a-53fc-4ca6-882f-0d7a9cb7e821";
    const res = await axios.post(`${BACKEND_URL}/blog`, {
      title,
      content,
      id
    },
      {
        headers: { authorization: token },
      }
    )
    const blogId = res.data.id;
    setTitle("");
    setContent("");
    navigate(`/blog/${blogId}`);
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-1">
        <textarea onChange={(e) => setTitle(e.target.value)} className="block px-2.5 pt-2 w-screen max-w-7xl text-3xl font-semibold text-gray-900 bg-lime-50 rounded-md border-b-2" placeholder="Title..."></textarea>
        <ReactQuill className="bg-lime-50 pb-10 h-screen text-xl" defaultValue="Hello Hello Hello" theme="snow" placeholder="Content..." value={content} onChange={setContent} />
        <div className="flex items-center justify-between px-3 py-2">
          <button onClick={publish} className="inline-flex items-center py-2.5 px-4 text-lg font-medium text-center text-white bg-blue-700 rounded-full focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">
            Publish Blog
          </button>
        </div>
      </div>
    </div>
  )
}
