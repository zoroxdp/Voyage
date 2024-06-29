import { Avatar } from "./BlogCard"

export const BlogPage = ({ title, content, name }: { title: string, content: string, name: string }) => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 gap-2 my-2 mx-5 w-screen max-w-screen-2xl">
          <div className="p-1 col-span-10">
            <div className="text-5xl font-semibold">{title}</div>
            <div className="py-4 text-lg text-slate-600">Posted on Dec 05, 2023</div>
            <div className="text-xl">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
          <div className="p-4 col-span-2">
            <div className="flex flex-col">
              <div className="text-lg font-medium">Author</div>
              <div className="-ml-2 flex items-center">
                <Avatar name={name} type={"card"} />
                <div className="text-xl font-semibold">{name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

