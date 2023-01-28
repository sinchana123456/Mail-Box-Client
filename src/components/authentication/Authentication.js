import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../store/auth-reducer';
import Button from '../UI/Button';
import classes from './Authentication.module.css';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import SignUp from './SignUp';

const Authentication = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [isForgot, setIsForgot] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const signUpHandler = (email, confirmPassword) => {
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPHpH0tZsk8mjeJOBGbWRO_p8wxiWN9VY',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: confirmPassword,
                        returnSecureToken: true
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            .then((res) => {
                if(res.ok){
                    return res.json();
                } else{
                    return res.json().then((data) => {
                        const errorMsg = data.error.message;
                        throw new Error(errorMsg);
                    })
                }
            })
            .then((data) => {
                console.log('successfully created account');
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }
    
    const loginHandler = (email, password) => {
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPHpH0tZsk8mjeJOBGbWRO_p8wxiWN9VY',
            {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            .then((res) => {
                if(res.ok){
                    return res.json();
                } else{
                    return res.json().then((data) => {
                        const errorMsg = data.error.message;
                        throw new Error(errorMsg);
                    })
                }
            })
            .then((data) => {
                const loginObj = {
                    idToken: data.idToken,
                    email: data.email,
                }
                dispatch(authActions.login(loginObj))
                console.log('successfully logged into the account');
                console.log(data);
                history.replace('/home');
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.message);
            });

    }

    const forgotPasswordHandler = (email) => {
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBPHpH0tZsk8mjeJOBGbWRO_p8wxiWN9VY',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    requestType: 'PASSWORD_RESET'
                }),
                headers:{
                    "Content-Type": "application/json",
                }
            }
        )
        .then((res) => {
            if(res.ok){
              return res.json()
            }else{
              return res.json().then((data) => {
                const errormsg = data.error.message;
                throw new Error(errormsg)
              })
            }
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            alert(error.message);
          })     
    }
    
    const onClickSignUpHandler = () => {
        setIsLogin(true);
    }
    
    const onClickLoginHandler = () => {
        setIsLogin(false);
    }

    const onClickPasswordHandler = () => {
        setIsForgot(true);
    }

    return (
        <section className={classes.auth}>
            {!isLogin && <SignUp onSignUp={signUpHandler}/>}
            {isLogin && <Login onLogin={loginHandler}/>}
            {!isLogin && (
                <Button onClick={onClickSignUpHandler}>
                    Have an account? Login
                </Button>
            )}
            {isForgot && <ForgotPassword  onForgot={forgotPasswordHandler}/> }
            {isLogin && (
              <button style={{
                cursor:'pointer',
                color: 'red', 
                backgroundColor:"white",
                border: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                }}
                className={classes.button}
                onClick={onClickPasswordHandler}>
                Forgot password ?  
              </button>
            )}
            <br />
            <br />
            {isLogin && (
                <Button 
                    onClick={onClickLoginHandler}>
                    Don't have an account? Sign up
                </Button>
            )}
        </section>
    );
};

export default Authentication;