import { Redirect, Route } from 'react-router-dom';
import React from 'react';

export const AuthedRoute = ({ component: Component, prop, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      prop ?
        <Component {...props} />
        : <Redirect to='/user/login'/>
    )}/>
  );
};

export const UnauthedRoute = ({ component: Component, prop, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      prop ?
        <Redirect to='/user/homepage'/>
        : <Component {...props} />
    )}/>
  );
};