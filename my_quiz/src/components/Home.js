import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import Cookie from 'js-cookie';
import {useSelector} from 'react-redux';

var user=(Cookie.get('userInfo'))
const logOut = () =>{
    if(window.confirm("want to logout??")){
      Cookie.remove('userInfo')
      window.location.reload()
    }
    
  }
const Home = () => {
    
    const userSignin = useSelector(state=>state.userSignin);
    const {loading, userInfo, error}= userSignin;
    return(<Fragment>
        <Helmet><title>Quiz App - Home</title></Helmet>
        <div id="home">
            <section>
                <div style={{textAlign:"center"}}>
                    <span className="mdi mdi-school cube"></span>
                </div>
                <h1>Quiz-App</h1>
                
                <div className="play-button-container">
                    <ul>
                        <li ><Link className="play-button" to="/play/instructions">Play</Link></li>
                    </ul>
                </div>
                <div className="auth-container">
                    <Link to={!userInfo?"/login":"/"} className="auth-buttons" id="login-button">{!userInfo?"Login":<span onClick={logOut}>Logout</span>} </Link>
                    <Link to="/register" className="auth-buttons" id="signup-button">Register</Link>
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
