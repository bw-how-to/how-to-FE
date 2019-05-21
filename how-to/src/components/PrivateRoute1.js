import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute1 = ({component: Component, ...rest}) => {
    return (
        <Route
        {...rest}
        render={() => {
            if (rest.loggedIn === false) {
                return <Redirect to={'/login'} />;
              } else {
                return <Component {...rest} />
            }
        }}
        />
    )
}


export default PrivateRoute1;