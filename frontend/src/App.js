import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ChatRoom from "./components/ChatRoom";
import UserList from "./components/UserList";
import GreetingPage from "./components/GreetingPage";
import NearbyUsers from "./components/NearbyUsers";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <div id="div__bodyContent">
          <div id="div__innerContent">
            <Switch>
              {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
              <Route exact path="/">
                <GreetingPage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route exact path="/chat">
                <ChatRoom />
              </Route>
              <Route path="/users/all">
                <UserList />
              </Route>
              <Route exact path="/chatroom/:userId">
                <ChatRoom />
              </Route>
            </Switch>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
