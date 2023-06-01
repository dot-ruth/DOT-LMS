import './App.css';
import Login from './Components/login';
import { Routes,Route } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './Components/Dashboard';


function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
