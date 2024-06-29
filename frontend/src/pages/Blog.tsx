import { useParams } from "react-router-dom";
import { BlogPage } from "../components/BlogPage";
import { useBlog } from "../hooks"
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) return <div>Loading</div>
  else {
    return (
      <div>
        <Appbar />
        <BlogPage title={blog!.title} content={blog!.content} name={blog!.author.name} />
      </div>
    )
  }
}
