  import { Box, CssBaseline, GlobalStyles } from "@mui/material"
import RouterComponent from "./router/RouterComponent"
 
  
function App() {
 
  return(
    <>
    

    <GlobalStyles
    styles={{
      body: {
        background: 'linear-gradient(135deg, rgb(53, 61, 92), rgb(125, 87, 107), rgb(9, 109, 89))',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      },
    }}
  />
  
  <CssBaseline />
    <Box
       
    >
           <RouterComponent />

    </Box>
    </>
   )
}
export default App
