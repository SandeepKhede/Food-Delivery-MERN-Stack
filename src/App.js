import './App.css';
import Home from './screens/Home';
import Login from './screens/Login'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
// import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './screens/Signup';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/createuser' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;


