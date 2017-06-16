import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSignUp({
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    });
  }
//check the implementation
checkIfUserExists(value) {
  console.log(value);
  this.props.handleCheckIfUserExists(value);
}

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup>
          <ControlLabel>Username (email)</ControlLabel>
          <FormControl
            type="email"
            name="username"
            onChange={e => {
              // check to see if the name is more than 3 chars
              if (e.target.value.length > 3) {
                  this.checkIfUserExists(e.target.value)
              }
              this.setState({[e.target.name]: e.target.value});
            }}
            placeholder="Enter Email"
            value={this.state.username}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            name="password"
            onChange={e => {
              this.setState({[e.target.name]: e.target.value});
            }}
            placeholder="Enter Password"
            value={this.state.password}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            name="confirmPassword"
            onChange={e => {
              this.setState({[e.target.name]: e.target.value});
            }}
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
          />
        </FormGroup>

        <Button type="submit">
         Sign Up
       </Button>
      </form>
    );
  }
}

SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired
};

export default SignUp;
