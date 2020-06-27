import React, { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { connect } from "react-redux";
import { loadUser } from "./actions/authActions";

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default connect(null, { loadUser })(App);