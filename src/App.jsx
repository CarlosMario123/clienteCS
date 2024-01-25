import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './page/Register';
import Login from './page/login';
import PrivateRoute from './routesPrivate/PrivateRoute';
import Home from './page/Home';
import Chat from './page/Prueba';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); 
function App() {


  return (
    <>
    <Router>
  
  <Routes>
    <Route path="/" element={<Register/>} />
    <Route path="/login" element = {<Login/>}/>
     <Route path='/home' element = {<PrivateRoute element={<Home/>}/>}/>
     <Route path='/rooms/:roomName' element = {<PrivateRoute element={<Chat socket={socket}/>}/>}/>
  </Routes>

</Router>
    </>
  )
}

export default App
