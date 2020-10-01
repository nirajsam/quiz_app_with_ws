import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {register } from '../actions/userActions';

function RegisterScreen(props){

    const [hidden, sethidden] = useState(true)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [clas, setclas] = useState('');
    const [roll, setroll] = useState('');
    const [password, setPassword]=useState('');
    // const [rePassword, setRePassword]=useState('');
    const userRegister = useSelector(state=>state.userRegister);
    const {loading, userInfo, error}= userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';

    useEffect(() => {
        if(userInfo){
            props.history.push('/login')
        }
        return () => {
            //
        }
    }, [userInfo]);

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(register(name, email, clas, roll, password));
    }
    return <div className="form">
        <form onSubmit={submitHandler} >
            <ul className="form-container jumbotron">
                <li>
                    <h2><b>Create Account</b></h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name" style={{color:"black"}}>Name<span className="text-danger">*</span></label>
                    <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="email" style={{color:"black"}}>Email<span className="text-danger">*</span></label>
                    <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="class" style={{color:"black"}}>Class</label>
                    <input type="text" name="class" id="class" placeholder="optional" onChange={(e)=>setclas(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="roll" style={{color:"black"}}>Roll No</label>
                    <input type="number" name="roll" id="roll" placeholder="optional" onChange={(e)=>setroll(e.target.value)}></input>
                </li>
                <li>
                <div className="input-icons ">
                    <label htmlFor="password" style={{color:"black"}}>Password<span className="text-danger">*</span></label>&nbsp;
                    <i style={{cursor:"pointer",position:"absolute"}} className="mdi mdi-eye" onClick={()=>{return sethidden(!hidden)}}></i>
                    <input type={hidden ? 'password' : 'text'} id="password"   name="password" onChange={(e)=>setPassword(e.target.value)}/>
                    
                    </div>
                </li>
                {/* <li>
                    <label htmlFor="rePassword">Re-enter Password</label>
                    <input type="password" id="rePassword" name="rePassword" onChange={(e)=>setRePassword(e.target.value)}></input>
                </li> */}
                <li>
                    <button type="submit" className="button primary full-width" style={{backgroundColor:"blue",color:"white"}}>Register</button>
                </li>
                <li>
                    Already have an account ? <Link to={redirect === "/" ? "login" : "signin?redirect=" + redirect} className="button secondary text-center" >Sign-In</Link>

                </li>
            </ul>
        </form>
    </div>
}
export default RegisterScreen;