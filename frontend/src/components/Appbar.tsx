import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
  return (
    <div className="bg-cyan-200 border-b-2 border-gray-300 flex items-center justify-between mb-4 pl-4 pr-1 py-1">
      <Link to="/blogs">
        <div className="flex items-center">
          <img className="w-10 h-10 mr-2" src="/assets/Voyage.png" alt="logo" />
          <div className="cursor-default font-bold text-3xl">Voyage</div>
        </div>
      </Link>
      <div>
        <Link to="/publish">
          <button type="button" className="text-white bg-green-500 hover:bg-green-600 border border-black focus:outline-none  font-medium rounded-full text-md px-4 py-1 text-center me-1 mb-1">Publish</button>
        </Link>
        <Avatar name="DP Shekhawat" type="bar" />
      </div>
    </div >
  )
}
