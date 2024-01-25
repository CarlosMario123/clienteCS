import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './page/Register';
import Login from './page/login';
import PrivateRoute from './routesPrivate/PrivateRoute';
import Home from './page/Home';
import Chat from './page/Prueba';
import io from 'socket.io-client';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
 const token = useLocalStorage("token");
 const socket = io('http://localhost:8000',{
  query:{
    token :token.localStorageValue
  }
}); 

  return (
    <>
    <Router>
  
  <Routes>
    <Route path="/" element={<Register/>} />
    <Route path="/login" element = {<Login/>}/>
     <Route path='/home' element = {<PrivateRoute element={<Home/>}/>}/>
     <Route path='/rooms/:roomName' element = {<PrivateRoute element={<Chat socket={socket} token={token}/>}/>}/>
  </Routes>

</Router>
    </>
  )
}

export default App
