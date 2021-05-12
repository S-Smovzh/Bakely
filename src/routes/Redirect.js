import { Redirect, Route } from 'react-router-dom';
import i18n from 'i18next';
import React from 'react';

// eslint-disable-next-line react/prop-types
export const AuthedRoute = ({ component: Component, prop, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      prop ?
        <Component {...props} />
        : <Redirect to={`/${i18n.language}/user/login`}/>
    )}
    />
  );
};

// eslint-disable-next-line react/prop-types
export const UnauthedRoute = ({ component: Component, prop, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      prop ?
        <Redirect to={`/${i18n.language}/user/homepage`}/>
        : <Component {...props} />
    )}
    />
  );
};
