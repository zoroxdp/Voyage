import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Blogs } from './pages/Blogs'
import './App.css'
import { HomePage } from './pages/Homepage'
import { Blog } from './pages/Blog'
import { Appbar } from './components/Appbar'
import { Publish } from './pages/Publish'

function App() {

  return (
    <><div className="min-h-screen bg-cyan-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs/" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
