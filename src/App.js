import './App.css';
import Home from './screens/Home';
import Login from './screens/Login'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
// import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import { MyOrder } from './screens/MyOrder';
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/createuser' element={<Signup />} />
          <Route exact path='/myOrder' element={<MyOrder />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;


