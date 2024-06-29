import { BlogCard, BlogCardSkeleton } from "../components/BlogCard"
import { useBlogs } from "../hooks";

interface blog {
  id: string;
  content: string;
  title: string;
  author: {
    name: string
  }
}

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <div className="flex flex-col gap-y-5">
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
    </div>
  } else {
    return <div>
      <div className="flex justify-center">
        <div className="flex flex-col w-screen max-w-5xl gap-y-5">
          {blogs.map((blog: blog) => <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name} content={blog.content} title={blog.title} publishedDate="2022-12-12" />)}
        </div>
      </div>
    </div >
  }
}
