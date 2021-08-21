import logo from './logo.svg';
import { GlobalContext } from './contexts/globalContext';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import Login from './components/login'
import Dashboard from './components/dashboard';
import SignUp from './components/signup';
import './App.css';
import React,{useState} from 'react';


function App() {

  const [user,setUser] = useState({})

  const globalState = {
    loggedUser : [user,setUser]
  }

  return (
    <React.Fragment>

      <GlobalContext.Provider value={globalState}>
      <BrowserRouter>
      
      <Switch>
          <Route  exact path="/login" component={Login}/>
          <Route  exact path="/dashboard" component={Dashboard}/>
          <Route  exact path="/signup" component={SignUp}/>
          <Redirect from="/" to="/login" />
      </Switch>
      
      </BrowserRouter>
      </GlobalContext.Provider>

    </React.Fragment>
  )
}

export default App;
