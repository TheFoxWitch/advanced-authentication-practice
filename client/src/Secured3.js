import React, { Component } from "react";

class Secured3 extends Component {
  constructor() {
    super();

    this.state = {
      message: ""
    };
  }

  componentDidMount() {
    fetch("/api/secured3").then((res) => {
      return res.text();
    }).then((data) => {
      this.setState({
        message: data
      });
    });
  }

  render() {
    return (
      <h1>{this.state.message}</h1>
    );
  }
}

export default Secured3;
