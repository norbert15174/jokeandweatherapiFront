import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const MenuWrapper = styled.div`
  width: 100%;
  height: 140%;
  background-color: #353535;
  box-shadow: 3px 0px 5px 3px rgba(0,0,0,0.75);
  position: relative;
`;

const MenuUl = styled.ul`
  top: 40vh;
  width: 60%;
  left: 10%;
  position: relative;
  list-style: none;
`;

const LiItems = styled.li`
  width: 100%;
  text-align: center;
  padding: 20px 20px 20px 20px;
`;

const RouteItem = styled(NavLink)`
  font-size: 20px;
  color: white;
  text-decoration: none;
  &:${props => props.activeClassName}{
      color: red;
  }
`;

const Menu = () => (
  <MenuWrapper>
    <MenuUl>
      <LiItems>
        <RouteItem to="/jokes" activeStyle={{color: '#69c8ff'}}>Jokes</RouteItem>
      </LiItems>
      <LiItems>
        <RouteItem to="/weather" activeStyle={{color: '#00cc99'}}>Weather</RouteItem>
      </LiItems>
      <LiItems>
        <RouteItem to="/asd" activeStyle={{color: '#44A08D'}}>Currency</RouteItem>
      </LiItems>
    </MenuUl>
  </MenuWrapper>
);

export default Menu;
