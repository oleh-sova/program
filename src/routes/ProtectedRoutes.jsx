import React from 'react';
import { Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';

import Loader from '../components/UI/Loader/Loader';
import routes from './privateRoutes';

const ProtectedRoutes = () => {
	return (
		<Switch>
			<Suspense fallback={<Loader />}>
				{routes.map(({ component: Component, path, exact }) => (
					<Route key={path} path={`/${path}`} exact={exact}>
						<Component />
					</Route>
				))}
			</Suspense>
		</Switch>
	);
};

export default ProtectedRoutes;
