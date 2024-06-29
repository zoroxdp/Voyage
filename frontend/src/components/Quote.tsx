import { DotLottieReact } from "@lottiefiles/dotlottie-react"
export const Quote = () => {
  return <div className="bg-cyan-200 h-screen flex flex-col justify-center">
    <div className="flex justify-center">
      <div className="flex flex-col justify-around">
        <DotLottieReact className="-mt-56" src="public/assets/ship.lottie" loop autoplay />
        <div className="mt-4 px-5 mx-10 md:text-xl lg:text-2xl font-semibold">
          Welcome onboard,<br /><br />
          Thrilled to have you here. Whether you’re a seasoned reader or a curious wanderer, this space is all about sharing ideas, stories, and musings. Dive into the archives and explore the latest posts.<br />
          Why Blogging? Because words have wings, and together, we’ll soar through topics, unravel mysteries, and celebrate life’s little joys. So grab a metaphorical cup of coffee, cozy up, and let’s embark on this literary journey.<br /> <br />
          Happy Blogging!⚓ <br />
        </div>
      </div>
    </div>
  </div>
}
