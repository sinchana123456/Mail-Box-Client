import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import AuthPage from './components/pages/AuthPage';
import HomePage from './components/pages/HomePage';
import ComposeMailPage from './components/pages/ComposeMailPage';

function App() {
  const isLogin = useSelector(state => state.authentication.isLogin);
  
  return (
    <Fragment>
      <Header />
        <main>
          <Switch>
          {isLogin &&
            <Route path='/' exact>
              <HomePage />
            </Route>}
              <Route path='/home' >
              {isLogin && <HomePage />}
              {!isLogin && <Redirect to='/auth' />}
              </Route>
            <Route path='/auth'>
              {!isLogin &&<AuthPage />}
            </Route>
            <Route path='/compose'>
              {isLogin && <ComposeMailPage />}
              {!isLogin && <Redirect to='/auth' />}
            </Route>
          </Switch>
        </main>
    </Fragment>
  );
}

export default App;
