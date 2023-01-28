import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { authActions } from '../../store/auth-reducer';
import LogOut from './LogOut';
import classes from "./Header.module.css";

const Header = () => {
  const isLogin = useSelector(state => state.authentication.isLogin);
  const inboxMails = useSelector(state => state.compose.fetchMail);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isHover, setIsHover] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // const unreadCount = Object.keys(inboxMails).reduce((ack, val) =>
  //   (val.read === 'false' ? ack+1 : 0),1);
  //   console.log('unread',unreadCount);
    useEffect(() => {
      if (inboxMails) {
        // eslint-disable-next-line
        Object.keys(inboxMails).map((mail) => {
              if (inboxMails[mail].read === false) {
            setUnreadCount(unreadCount + 1);
          }
        });
      }
    // eslint-disable-next-line
    }, [inboxMails]);

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
              <li>
                  <NavLink to="/mail-details"  
                  activeClassName={classes.active} >
                  Inbox
                  {unreadCount === 0 ? (
                    <></>
                  ) : (
                    <span>{unreadCount} Unread</span>
                  )}
                  </NavLink>
              </li>
            )}   
            {isLogin && (
              <LogOut 
                  onClick={logOutHandler}>
                  LogOut
              </LogOut>
            )}      
        </ul>
      </nav>
    </header>
  )
};

export default Header