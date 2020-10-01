import axios from 'axios';
import Cookie from 'js-cookie';

import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';
import cfg from '../config'
var URL=cfg.URL
const signin = (email,password) => async(dispatch) => {
    dispatch({type:USER_SIGNIN_REQUEST, payload:{email, password}});
    try {
        
        const {data}  = await axios.post(`${URL}/api/users/signin`, {email, password});
        dispatch({type:USER_SIGNIN_SUCCESS, payload:data});
        Cookie.set('userInfo',JSON.stringify(data));
        // window.location.reload()
        // if(data){
        //     localStorage.setItem('name',data.name)
        //     localStorage.setItem('mail',data.email)
        // }
        
        
    } catch (error) {
        dispatch({type:USER_SIGNIN_FAIL, payload:error.message});
    }
}

const register = (name, email, clas, roll, password) => async(dispatch) => {
    dispatch({type:USER_REGISTER_REQUEST, payload:{name, email, clas, roll, password}});
    try {
        const {data}  = await axios.post(`${URL}/api/users/register`, {name, email, clas, roll, password});
        dispatch({type:USER_REGISTER_SUCCESS, payload:data});
        //Cookie.set('userInfo',JSON.stringify(data));
        
    } catch (error) {
        dispatch({type:USER_REGISTER_FAIL, payload:error.message});
    }
}
export {signin, register}