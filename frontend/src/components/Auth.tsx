import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { signupInputType } from "@zoroxdp/medium-common"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { BACKEND_URL } from "../config"
import axios from "axios"

export const Auth = ({ authType }: { authType: "signup" | "signin" }) => {

  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signupInputType>({
    name: "",
    email: "",
    password: ""
  })

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/user/${authType === 'signup' ? 'signup' : 'signin'}`, postInputs);
      const jwt = response.data.jwt;
      const token = "Bearer " + jwt;
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="mt-32">
        <div className="flex justify-center items-center text-center">
          <div>
            <img className="w-48 h-48 mx-auto" src="/assets/Voyage.png" alt="logo" />
            <div className="text-4xl font-bold px-20">
              {authType === 'signup' ? 'Create Account' : 'Login to Voyage'}
            </div>
            <div className="text-md text-slate-400 font-normal">
              {authType === 'signup' ? 'Already have an account?' : 'Create your account'}
              {authType === 'signup' ?
                <Link to={"/signin"} className="pl-1 underline text-sky-500">Sign In</Link> :
                <Link to={"/signup"} className="pl-1 underline text-sky-500">Sign Up</Link>
              }
            </div>
            <div className="pt-5 text-left">
              {authType === 'signup' ?
                <LabeledInput label="Name" type="" placeholder="Enter your Name" onChange={(e) => {
                  setPostInputs({ ...postInputs, name: e.target.value });
                }} /> : ""
              }
              <LabeledInput label="Email" type="" placeholder="Enter your Email" onChange={(e) => {
                setPostInputs({ ...postInputs, email: e.target.value });
              }} />
              <LabeledInput label="Password" type="password" placeholder="Enter your Password" onChange={(e) => {
                setPostInputs({ ...postInputs, password: e.target.value });
              }} />
              <button type="button" onClick={sendRequest} className="my-6 w-full text-white bg-slate-950 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-3.5 text-center">{authType === 'signup' ? 'Sign Up' : 'Sign In'}</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <DotLottieReact className="block lg:hidden object-fill -mt-80 w-screen" src="/src/assets/ship.lottie" loop autoplay />
      </div>
    </div>
  )
}

function LabeledInput({ label, placeholder, type, onChange }: { label: string, placeholder: string, type: string, onChange: (e: any) => void }) {
  return <div className="mt-2">
    <label className="ml-1 mb-2 text-left text-lg font-medium">{label}</label>
    <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
  </div>
}
