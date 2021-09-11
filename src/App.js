import logo from './logo.svg';
import { GlobalContext } from './contexts/globalContext';
import {BrowserRouter,Switch,Route,Redirect, HashRouter} from 'react-router-dom'
import Login from './components/login'
import Dashboard from './components/dashboard';
import SignUp from './components/signup';
import './App.css';
import React,{useState} from 'react';
import AddFriend from './components/addFriend';
import ViewFiles from './components/viewFiles';


function App() {

  let auxuser = JSON.parse(sessionStorage.getItem('user'))
  const [user,setUser] = useState(auxuser?auxuser:{})

  const globalState = {
    loggedUser : [user,setUser]
  }

  return (
    <React.Fragment>

      <GlobalContext.Provider value={globalState}>
      <HashRouter>
      
      <Switch>
          <Route  exact path="/login" component={Login}/>
          <Route  exact path="/dashboard" component={Dashboard}/>
          <Route  exact path="/signup" component={SignUp}/>
          <Route  exact path="/addfriend" component={AddFriend}/>
          <Route  exact path="/viewfiles" component={ViewFiles}/>
          <Redirect from="/" to="/login" />
      </Switch>
      
      </HashRouter>
      </GlobalContext.Provider>

    </React.Fragment>
  )
}

export default App;
