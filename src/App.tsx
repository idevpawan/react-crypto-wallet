import { Fragment, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Header from "./components/Header"
import Create from "./pages/Create"
import Dashboard from "./pages/Dashboard"
import Import from "./pages/Import"
import Send from "./pages/Send"
import Setup from "./pages/Setup"

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('account')){
      navigate('/dashboard')
    }else {
      navigate('/')
    }
  },[])

  return (
      <Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<Setup />} />
          <Route path="/create" element={<Create />} />
          <Route path="/import" element={<Import />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
        </Routes>
      </Fragment>
  )
}

export default App
