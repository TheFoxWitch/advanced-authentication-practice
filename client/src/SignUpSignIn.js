import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Row, Col, Alert } from "react-bootstrap";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

class SignUpSignIn extends Component {

  renderError() {
    return (
      <Alert className="fadeIn" bsStyle="warning">
        <strong>{this.props.error}</strong>
      </Alert>
    );
  }

  renderSuccess() {
      return (
        <Alert>
          <strong>{this.props.success}</strong>
        </Alert>
      )
  }
// function that will cause an alert if username is above set
// legnth
  checkError() {
    console.log(this.props);
    console.log('check error called');
    if (this.props.ulength) {
      return this.props.error && this.renderError ? this.renderError() : this.renderSuccess();
    } else {
      return "";
    }

  }


  render() {
    let userAlert = this.checkError();

    return (
      <Row>
        <Col xs={8} xsOffset={2}>
          {userAlert}
          <Tabs defaultActiveKey={1} id="signup-signin-tabs">
            <Tab eventKey={1} title="Sign Up">
              <SignUp
                triggerUserLength={() => this.props.triggerUserLength()} handleCheckIfUserExists={this.props.handleCheckIfUserExists} onSignUp={this.props.onSignUp} />
            </Tab>
            <Tab eventKey={2} title="Sign In">
              <SignIn onSignIn={this.props.onSignIn} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    )
  }
}

SignUpSignIn.propTypes = {
  error: PropTypes.string,
  onSignUp: PropTypes.func.isRequired
};

export default SignUpSignIn;
