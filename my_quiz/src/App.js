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
import ResultShow from './components/ResultShow';


function App() {
  const userSignin = useSelector(state=>state.userSignin);
  const {loading, userInfo, error}= userSignin;
  return (
    <Router>
      <Route path="/" exact component={Home}/>
      <Route  path="/play/instructions" exact component={QuizInstructions} />
      <Route  path="/play/quiz/:test?" exact component={userInfo?play:null} />
      <Route  path="/play/quizSummary" exact component={quizSummary} />
      <Route  path={"/login"} exact component={!userInfo?SigninScreen:Home} />
      <Route  path="/register" exact component={RegisterScreen} />
      <Route  path="/addQuestion" exact component={userInfo?userInfo.isAdmin?AddQuestion:Home:Home} />
      <Route  path="/results" exact component={userInfo?userInfo.isAdmin?ResultShow:Home:Home} />
      {/* <Route path="*" exact={true}><Redirect to="/"></Redirect></Route> */}
    </Router>
  );
}

export default App;
