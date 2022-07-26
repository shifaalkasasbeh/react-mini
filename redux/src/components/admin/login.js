import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from '../../redux/userSlice';
import './login.css'

const Login =()=>{
    
    let navigate = useNavigate();
    const user = useSelector(state=>state.user.isLogged);
    // console.log(user);
    const [userData , setUserData] =useState({email:"" , password:""}) 
    const dispatch = useDispatch();

    const handleChange = (e)=>{
        e.preventDefault()
        const value = e.target.value;
        setUserData({
          ...userData,
          [e.target.name]: value
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const value = e.target.value;
        setUserData({
            ...userData,
        })
        dispatch(login(userData));   
    }
    useEffect(() => {
        if(user){

            navigate("/main", { replace: true });
        }else{
            navigate("/login", { replace: true });
        }
    }, [user])
    

    return(
        <div className="login-dark">
        <form onSubmit={handleSubmit}>
            <h2 className="sr-only">Login Form</h2>
            <div className="illustration"><i className="icon ion-ios-locked-outline"></i></div>

            <div className="form-group">
                <input 
                className="form-control"  
                type="email" 
                name="email" 
                placeholder="Email" 
                onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <input 
                className="form-control" 
                type="password" 
                name="password" 
                placeholder="Password"  
                onChange={handleChange}
                />

            </div>
            <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">Log In</button>
            </div>
            
        </form>
    </div>
    )
}

export default Login;