import React, { Fragment, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import Cookie from 'js-cookie';
import {useSelector} from 'react-redux';

var user=(Cookie.get('userInfo'))

const Home = (props) => {
    const [out, setout] = React.useState('')
    const userSignin = useSelector(state=>state.userSignin);
    const {loading, userInfo, error}= userSignin;
    
    console.log(new Date().getHours(),new Date().getMinutes(),new Date().getSeconds())
    if(localStorage.getItem('hideItem')){
        //
    }else{
        localStorage.setItem('hideItem',[])
    }
    const logOut = (props) =>{
        if(window.confirm("want to logout??")){
          Cookie.remove('userInfo')
          window.location.reload()
        }
        
      }
      const redirect = props.location.search?props.location.search.split("=")[1]:'/';
      //console.log(userInfo)
      useEffect(() => {
          if(userInfo){
              props.history.push(redirect)
          }
          return () => {
              //
          }
      }, [userInfo]);
    
    return(<Fragment>
        <Helmet><title>Quiz App - Home</title></Helmet>
        <div id="home" style={{paddingTop:"10%"}}>
            <section>
                <div style={{textAlign:"center"}}>
                    <span style={{color:"black"}} className="mdi mdi-school cube"></span>
                </div>
                <h1 style={{color:"black"}}>Niraj's Quiz-App</h1>
                
                <div className="play-button-container">
                    <ul>
                        <li ><Link className="play-button" to="/play/instructions">Play</Link></li>
                    </ul>
                </div>
                <div className="auth-container">
                    {userInfo?<button className="auth-buttons" onClick={logOut} style={{backgroundColor:"red"}}>Logout</button>:
                    <Link to={"/login"} className="auth-buttons" id="login-button" >Login</Link>}
                    <Link to={!userInfo?`/register`:'/'} className="auth-buttons" id="signup-button" >Register</Link>
                </div>
                <br/><br/>
                <div className="auth-container">
                    {userInfo?userInfo.isAdmin?<Link to={"/addQuestion"} className="auth-buttons" id="signup-button">Add Question</Link>:null:null}
                    
                </div><br/>
                <div className="auth-container">
                    {userInfo?userInfo.isAdmin?<Link to={"/results"} className="auth-buttons" id="signup-button">see Result</Link>:null:null}  
                </div>
            </section>
        </div>
    </Fragment>)        
}
export default Home;
