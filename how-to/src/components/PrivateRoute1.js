import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute1 = ({component: Component, ...rest}) => {
    return (
        <Route
        {...rest}
        render={() => {
            if (localStorage.getItem('jwt')) {
                return <Component {...rest} />;
              } else {
                return <Redirect to="/login" />
            }
        }}
        />
    )
}


export default PrivateRoute1;