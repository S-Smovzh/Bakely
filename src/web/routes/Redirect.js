import { Redirect, Route, useLocation } from 'react-router-dom';
import i18n from 'i18next';
import React from 'react';

// eslint-disable-next-line react/prop-types
export const AuthedRoute = ({ component: Component, prop, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      prop ?
        <Component {...props} />
        : <RedirectWithStatus status={301} to={`/${i18n.language}/user/login`}/>
    )}
    />
  );
};

// eslint-disable-next-line react/prop-types
export const UnauthedRoute = ({ component: Component, prop, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      prop ?
        <RedirectWithStatus status={301} to={`/${i18n.language}/user/homepage`}/>
        : <Component {...props} />
    )}
    />
  );
};

// eslint-disable-next-line react/prop-types
function RedirectWithStatus({ to, status }) {
  const from = useLocation();

  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.status = status;
        }
        return <Redirect from={from.pathname} to={to}/>;
      }}
    />
  );
}
