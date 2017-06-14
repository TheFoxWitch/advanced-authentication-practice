import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopNavbar = (props) => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem onClick={props.onSignOut}>Sign Out</NavItem>
        </Nav>
        <Nav pullRight>
          <Link to="/secret"><Navbar.Text>Secret</Navbar.Text></Link>
          <Link to="/secured1"><Navbar.Text>Secure1</Navbar.Text></Link>
          <Link to="/secured2"><Navbar.Text>Secure2</Navbar.Text></Link>
          <Link to="/secured3"><Navbar.Text>Secure3</Navbar.Text></Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

TopNavbar.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  showNavItems: PropTypes.bool.isRequired
};

export default TopNavbar;
