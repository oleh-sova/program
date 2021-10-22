import { Suspense } from 'react';
import { lazy } from 'react';

import { useSelector } from 'react-redux';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import Loader from './components/UI/Loader/Loader';
import PrivateRoute from './routes/PrivateRoute';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoute from './routes/PublicRoute';
import { getAuthors } from './store/authors/actionsCreators';
import { getCourses } from './store/courses/actionsCreators';
import useFetch from './utils/customHooks/useFetch.js';

const Login = lazy(() => import('./components/Login/Login.jsx'));
const Registration = lazy(() =>
	import('./components/Registration/Registration.jsx')
);
const NoFoundComponent = lazy(() =>
	import('./components/NoFoundComponent/NoFoundComponent')
);

const App = () => {
	const {
		user: { token: isAuthenticated },
	} = useSelector((state) => state);

	// API get all information
	useFetch(getCourses);
	useFetch(getAuthors);

	return (
		<div className='App'>
			<Router>
				<Header />
				<Suspense fallback={<Loader />}>
					<Switch>
						<PublicRoute path='/login' isAuthenticated={isAuthenticated}>
							<Login />
						</PublicRoute>
						<PublicRoute path='/registration' isAuthenticated={isAuthenticated}>
							<Registration />
						</PublicRoute>
						<PrivateRoute path='/' isAuthenticated={isAuthenticated}>
							<ProtectedRoutes />
						</PrivateRoute>
						<Route path='*'>
							<NoFoundComponent />
						</Route>
					</Switch>
				</Suspense>
			</Router>
		</div>
	);
};

export default App;
