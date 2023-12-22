import { Box } from "@chakra-ui/react"
import Sidebar from "./components/sidebar/sidebar"
import Header from "./components/header/header"
import Navbar from "./components/navbar/navbar"
import { Route, Routes } from "react-router-dom"
import Resurs from "./pages/resurs"



function App() {

  return (
    <Box width={'100%'}>
      <Box>
        <Box display={'flex'}>
          
          <Box >
            <Sidebar />
          </Box>

          <Box width={'100%'}>
            <Box position={'fixed'} width={'100%'} zIndex={1}>
              <Header />
              <Navbar />
            </Box>
            <Box mt={'200px'}>
              <Routes>
                <Route path="/" element={<Resurs />}></Route>
              </Routes>
            </Box>
          </Box>
        </Box>




      </Box>
    </Box>
  )
}

export default App
