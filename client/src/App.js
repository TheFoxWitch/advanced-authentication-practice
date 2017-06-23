import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import SignUpSignIn from "./SignUpSignIn";
import TopNavbar from "./TopNavbar";
import Secret from "./Secret";
import Secured1 from "./Secured1";
import Secured2 from "./Secured2";
import Secured3 from "./Secured3";

class App extends Component {
  constructor() {
    super();
    this.state = {
      signUpSignInError: "",
      authenticated: localStorage.getItem("token") || false
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.checkIfUserExists = this.checkIfUserExists.bind(this);

  }


//method to handle error on typing a username that exists
  handleCheckIfUserExists(username) {
    fetch("/api/usernames", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username})
    }).then((res) => console.log(res))
    .catch(err => {console.error(err)
      this.setState({
        signUpSignInError: "Username is already in use"
      });
    }

    );
  }

  //checks if there is an error when this is passed
  checkIfUserExists(username) {
    fetch("/api/checkexists", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username: username})
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (data.error) {
        this.setState({
          signUpSignInError: data.error
        });
      }
    })
  }

  handleSignUp(credentials) {
    const { username, password, confirmPassword } = credentials;
    if (!username.trim() || !password.trim() ) {
      this.setState({
        signUpSignInError: "Must Provide All Fields"
      });
    } if (password.trim() !== confirmPassword.trim() ){
        this.setState({
          signUpSignInError: "Passowrds do not match!"
      });
    }
     else {

      fetch("/api/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
      }).then((res) => {
        return res.json();
      }).then((data) => {
        if (data.error) {
          this.setState({
            signUpSignInError: data.error
          });
        }
          else {
        const { token } = data;
        localStorage.setItem("token", token);
        this.setState({
          signUpSignInError: "",
          authenticated: token
          });
        }
      });
    }
  }



  handleSignIn(credentials) {
    const { username, password } = credentials;
    if (!username.trim() || !password.trim() ) {
      this.setState({
        signUpSignInError: "Must Provide All Fields"
      });
    } else {
      // headers have s specific set of things that can go in it
      fetch("/api/signin", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
      }).then((res) => {
        return res.json();
      }).then((data) => {
        const { token } = data;
        localStorage.setItem("token", token);
        this.setState({
          signUpSignInError: "",
          authenticated: token
        });
      });
    }
  }

  handleSignOut() {
    localStorage.removeItem("token");
    this.setState({
      authenticated: false
    });
  }

  renderSignUpSignIn() {
    return (
      <SignUpSignIn
        error={this.state.signUpSignInError}
        onSignUp={this.handleSignUp}
        handleCheckIfUserExists={this.checkIfUserExists}
        onSignIn={this.handleSignIn}
      />
    );
  }

  renderApp() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <h1>I am protected!</h1>} />
          <Route exact path="/secret" component={Secret} />
          <Route exact path="/secured1" component={Secured1} />
          <Route exact path="/secured2" component={Secured2} />
          <Route exact path="/secured3" component={Secured3} />
          <Route render={() => <h1>NOT FOUND!</h1>} />
        </Switch>
      </div>
    );
  }

  render() {
    let whatToShow = "";
    if (this.state.authenticated) {
      whatToShow = this.renderApp();
    } else {
      whatToShow = this.renderSignUpSignIn();
    }

    return (
      <BrowserRouter>
        <div className="App">
          <TopNavbar
            showNavItems={this.state.authenticated}
            onSignOut={this.handleSignOut} />
          {whatToShow}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
