import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Authentication from './components/authentication/Authentication';

function App() {
  const isLogin = useSelector(state => state.authentication.isLogin);
  
  return (
    <Fragment>
      <main>
        <Switch>
        {!isLogin &&
          <Route path='/'>
            <Authentication />
          </Route>
        }
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
