import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface Blog {
  "content": string,
  "title": string,
  "id": string,
  "author": {
    "name": string
  }
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${BACKEND_URL}/blog/${id}`, { headers: { Authorization: token } })
      .then(response => {
        setBlog(response.data);
        setLoading(false);
      })
  }, [id]);
  return {
    loading,
    blog
  }

}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${BACKEND_URL}/blog/bulk`, { headers: { Authorization: token } })
      .then(response => {
        setBlogs(response.data.blogs);
        setLoading(false);
      })
  }, []);
  return {
    loading,
    blogs
  }
}
