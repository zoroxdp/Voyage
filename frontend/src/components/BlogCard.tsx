import { Link } from "react-router-dom"

interface BlogCardProps {
  authorName: string,
  title: string,
  content: string,
  publishedDate: string,
  id: string
}

export const BlogCard = ({ authorName, id, title, content, publishedDate }: BlogCardProps) => {
  return <Link to={`/blog/${id}`}>
    <div className="cursor-pointer rounded-b-md px-4 py-2 border-b-2 border-slate-200 bg-teal-100 shadow-md">
      <div>
        <div className="flex -ml-2 items-center mb-2">
          <Avatar name={authorName} type="card" />
          <div className="text-md text-black">
            {authorName}
          </div>
          <div className='text-xl mx-1'>•</div>
          <div className="text-md font-normal text-gray-500">
            {publishedDate}
          </div>
        </div>
      </div> <div className="text-2xl font-semibold text-black">
        {title}
      </div>
      <div className="text-lg text-slate-800">
        <div dangerouslySetInnerHTML={{ __html: content.slice(0, 200) + "..." }} />
      </div>
      <div>
        {`${Math.ceil(content.length / 350)} minutes to read`}
      </div>
    </div>
  </Link>
}

export function Avatar({ name, type = 'card' }: { name: string, type: string }) {
  return (
    <div className={`mx-2 relative inline-flex items-center justify-center ${type === "bar" ? "w-9 h-9" : "w-5 h-5"} overflow-hidden ${type === "bar" ? "bg-slate-300" : "bg-cyan-200"} border border-slate-900 rounded-full`} >
      <div className={`${type === "bar" ? "text-xl" : "text-md"} font-medium  text-gray-950`}>{name[0]}</div>
    </div >
  )
};

export function BlogCardSkeleton() {
  return <div className="flex justify-center">
    <div role="status" className="flex flex-col gap-2 p-2 bg-teal-100 w-screen h-44 shadow-lg max-w-5xl animate-pulse">
      <div className="h-2 bg-gray-300 rounded-full  w-48 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded-full  max-w-[180px] mb-2.5"></div>
      <div className="h-2.5 bg-gray-300 rounded-full  max-w-[720px] mb-2.5"></div>
      <div className="h-2.5 bg-gray-300 rounded-full  max-w-[330px] mb-2.5"></div>
      <div className="h-2.5 bg-gray-300 rounded-full  max-w-[300px] mb-2.5"></div>
      <div className="h-2.5 bg-gray-300 rounded-full  max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
}
