import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const[credentials,setCredentials]=useState({
    email:"",
    password:"",
})
let navigate = useNavigate()
const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify({
    //         email: credentials.email,
    //         password:credentials.password
    // }))
    const response = await fetch('http://localhost:5000/api/loginuser',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email: credentials.email,
            password:credentials.password
        })
    })

    const json = await response.json();
    // console.log(json);

    if(!json.success){
        alert('Enter valid credentials')
    }
    if(json.success){
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      // console.log(localStorage.getItem("authToken"))
      navigate('/')
    }
    // if(json.succcess == true){
    //   navigate('/')
    // }

    
}

const onChange = (event) => {
    setCredentials({...credentials,[event.target.name]:event.target.value})
}
  return (
    <>
    <div>
      <Navbar />
    </div>
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' onChange={onChange} value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' onChange={onChange} value={credentials.password} id="exampleInputPassword1" />
            </div>
            <button type="submit" className="m-3 btn btn-success">Login</button>
            <Link to='/createuser' className='m-3 btn btn-danger'>I'm a new user</Link>
            </form>
            </div>
    </div>

    <div>
      <Footer />
    </div>
    </>
  )
}

export default Login