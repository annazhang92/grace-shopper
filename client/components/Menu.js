import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../store';

const Menu = ({ user, logout, thisUserlineItems }) => {
  const loggedIn = !!user.id;
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <LinkContainer to="/">
          <Navbar.Brand>Home</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/products">
            <NavItem>Products</NavItem>
          </LinkContainer>
          <LinkContainer to="/products/categories">
            <NavItem>Categories</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
        {
          loggedIn ?
          (
            <Nav>
              <LinkContainer to='/account'>
                <NavItem>{user.fullName}</NavItem>
              </LinkContainer>
              <LinkContainer to='/login' onClick={logout}>
                <NavItem>Logout</NavItem>
              </LinkContainer>
            </Nav>
          )
          :(
          <LinkContainer to='/login'>
            <NavItem>Login</NavItem>
          </LinkContainer>
          )
        }
          <LinkContainer to='/cart'>
            <NavItem>Cart {thisUserlineItems ? <span style={{color: 'orange'}}>{thisUserlineItems.length}</span> : null}</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = ({ lineItems, user }) => {
  const loggedIn = !!user.id;
  const thisUserlineItemsAll = lineItems ? lineItems.filter(lineItem => lineItem.active === true) : null
  const thisUserlineItems = thisUserlineItemsAll.filter(lineItem => lineItem.userId === user.id);
  return { user, loggedIn, thisUserlineItems };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
