import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { authActions } from '../../store/auth-reducer';
import LogOut from './LogOut';
import classes from "./Header.module.css";

const Header = () => {
  const isLogin = useSelector(state => state.authentication.isLogin);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isHover, setIsHover] = useState(false);

    const logOutHandler = () => {
      dispatch(authActions.logout());
      history.replace('/auth');
    };

    const mouseEnter = () => {
      setIsHover(true)
  };

  const mouseLeave = () => {
      setIsHover(false)
  };

  return (
    <header className={classes.header}>
      <h1>Welcome to Mail Box!!!</h1>
      <nav>
        <ul>
          <li>
              <NavLink 
                to="/"  
                activeClassName={classes.active} exact >
                Home
              </NavLink>
          </li>
          {!isLogin && (
            <li>
                <NavLink to="/auth"  
                activeClassName={classes.active} >
                Login
                </NavLink>
            </li>
          )}
          {isLogin && (
            <li>
                <NavLink to='/compose'
                    style={{
                        backgroundColor: isHover ? 'green': '',
                        color: isHover ? 'white' : ''
                    }} 
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    activeClassName={classes.active}>
                    Compose
                </NavLink>
            </li>
            )}
            {isLogin && (
              <LogOut 
                  onClick={logOutHandler}>
                  Log Out
              </LogOut>
            )}         
        </ul>
      </nav>
    </header>
  )
};

export default Header