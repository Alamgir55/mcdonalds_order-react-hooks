import React, {lazy, Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, [])

    let routes = (
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/auth" exact render={(props) =>  <Auth {...props} />} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Suspense>
      </Switch>       
    );

    if(props.isAuthenticated){
      routes = (
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/checkout" render={(props) => <Checkout {...props} />} />
            <Route path="/orders" render={(props) => <Orders {...props} />} />
            <Route path="/auth" exact render={(props) =>  <Auth {...props} />} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Suspense>
        </Switch>  
      );
    }

    return (
      <div>
       <Layout>
          {routes}
       </Layout>
      </div>
    );
  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () =>  dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
