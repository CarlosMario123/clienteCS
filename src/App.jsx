import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './page/Register';
import Login from './page/login';
import PrivateRoute from './routesPrivate/PrivateRoute';
import Home from './page/Home';
import Chat from './page/Prueba';
function App() {


  return (
    <>
    <Router>
  
  <Routes>
    <Route path="/" element={<Register/>} />
    <Route path="/login" element = {<Login/>}/>
     <Route path='/home' element = {<PrivateRoute element={<Home/>}/>}/>
     <Route path='/rooms' element = {<PrivateRoute element={<Chat/>}/>}/>
  </Routes>

</Router>
    </>
  )
}

export default App
