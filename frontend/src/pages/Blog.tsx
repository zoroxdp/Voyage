import { useParams } from "react-router-dom";
import { BlogPage } from "../components/BlogPage";
import { useBlog } from "../hooks"

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) return <div>Loading</div>
  else {
    return <div>
      <BlogPage title={blog!.title} content={blog!.content} name={blog!.author.name} />
    </div>
  }
}
