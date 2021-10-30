import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ children, isAuthenticated, location, ...props }) => {
	return (
		<Route {...props}>
			{!isAuthenticated ? (
				children
			) : (
				<Redirect to={{ pathname: '/courses', state: { from: location } }} />
			)}
		</Route>
	);
};

export default PublicRoute;
