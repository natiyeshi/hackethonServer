import './App.css';
import Signup from './pages/signup';
import Signin from './pages/signin';
import Choose from './pages/choose';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/choose' element={<Choose/>}></Route>
    </Routes>
  );
}

export default App;
