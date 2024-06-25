import { DotLottieReact } from "@lottiefiles/dotlottie-react"

export const HomePage = () => {
  return <>
    <div className="">
      <DotLottieReact style={{
        marginRight: -20,
        zIndex: -1,
        overflow: "hidden",
        position: "fixed",
      }} height="100%" width="110%" src="/src/assets/ship.lottie" loop autoplay />
    </div>
  </>
}

