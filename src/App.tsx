import AppRoutes from "./routes/AppRoutes"
import Navbar from "./components/layout/navbar"
import { BrowserRouter } from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
