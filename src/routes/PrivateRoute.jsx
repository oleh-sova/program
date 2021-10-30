import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated, location, ...props }) => {
	return (
		<Route {...props}>
			{isAuthenticated ? (
				children
			) : (
				<Redirect to={{ pathname: '/login', state: { from: location } }} />
			)}
		</Route>
	);
};

export default PrivateRoute;
