import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Home from './components/Home';
import QuizInstructions from './components/quiz/QuizInstruction';
import play from './components/quiz/play';
import quizSummary from './components/quiz/quizSummary'
import SigninScreen from './components/signinScreen';
import RegisterScreen from './components/registerScreen';
import {useSelector, useDispatch} from 'react-redux';
import AddQuestion from './components/AddQuestion';
import AddSubQuestion from './components/AddSubQues';
import ResultShow from './components/ResultShow';
import UserShow from './components/userShow';
import playSubQuiz from './components/quiz/playSubQuiz';
import showAnswers from './components/showAnswers';
import Profile from './components/profile';


function App() {
  const userSignin = useSelector(state=>state.userSignin);
  const {loading, userInfo, error}= userSignin;
  const errorF=()=>{
    alert(`you are still not verified, wait for some times you will get verified 
    soon else you can contact to our emegency contact  number`)
    return(
      <Redirect to="/"></Redirect>
    )
  }
  return (
    <Router>
      <Route path="/" exact component={Home}/>
      <Route  path="/play/instructions" exact component={QuizInstructions} />
      <Route  path="/play/quiz/:test?" exact component={userInfo?userInfo.verify?play:errorF:null} />
      <Route  path="/play/subQues/:test?" exact component={userInfo?userInfo.verify?playSubQuiz:errorF:null} />
      <Route  path="/play/quizSummary" exact component={quizSummary} />
      <Route  path={"/login"} exact component={!userInfo?SigninScreen:Home} />
      <Route  path="/register" exact component={RegisterScreen} />
      <Route  path="/userShow" exact component={userInfo?userInfo.isAdmin?UserShow:Profile:null} />
      <Route  path="/addQuestion" exact component={userInfo?userInfo.isAdmin||userInfo.isTeacher?AddQuestion:Home:Home} />
      <Route  path="/addsubQuestion" exact component={userInfo?userInfo.isAdmin||userInfo.isTeacher?AddSubQuestion:Home:Home} />
      <Route  path="/results" exact component={userInfo?userInfo.isAdmin||userInfo.isTeacher?ResultShow:Home:Home} />
      <Route  path="/checkAnswers" exact component={userInfo?userInfo.isAdmin||userInfo.isTeacher?showAnswers:Home:Home} />
      {/* <Route path="*" exact={true}><Redirect to="/"></Redirect></Route> */}
    </Router>
  );
}

export default App;
