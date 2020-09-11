import React, {useState} from 'react';
import './css/App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import ImageUpload from "./components/tools/ImageUpload";
import Header from "./components/main/Header"
import Actualities from './components/main/Actualities';






function App() {
  

  
  const [user, setUser] = useState(null)


  const changeUser = (user) => {
    setUser(user)
  }

  return (
    <div className="app">
        <Router>
            <Header user={user} changeUser={changeUser}/>
          <Switch>

            <Route path="/"> 
              <Actualities user={user}/>
            </Route>
            <Route path="/reels"> 
              
            </Route>

          </Switch>
            {user?.displayName ? (
              <ImageUpload username={user.displayName}/> 
            ) : (
                <h3>Sorry you need to Login</h3>
            )}
        </Router>

    </div>
  );
}

export default App;
