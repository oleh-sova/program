import { Suspense, useEffect } from 'react';
import { lazy } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import Loader from './components/UI/Loader/Loader';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { getUserStore } from './store/selectors.js';
import { userGetRole } from './store/user/actionsCreators.js';

const Login = lazy(() => import('./components/Login/Login.jsx'));
const Registration = lazy(() =>
	import('./components/Registration/Registration.jsx')
);
const NoFoundComponent = lazy(() =>
	import('./components/NoFoundComponent/NoFoundComponent')
);
const Courses = lazy(() => import('./components/Courses/Courses.jsx'));
const CreateCourse = lazy(() =>
	import('./components/CreateCourse/CreateCourse.jsx')
);
const CourseInfo = lazy(() => import('./components/CourseInfo/CourseInfo.jsx'));

const App = () => {
	const dispatch = useDispatch();

	const { isAuth: isAuthenticated } = useSelector(getUserStore);

	useEffect(() => {
		const userToken = localStorage.getItem('token');
		if (userToken) {
			dispatch(userGetRole(userToken));
		}
	}, [dispatch]);

	return (
		<div className='App'>
			<Header />
			<Suspense fallback={<Loader />}>
				<Switch>
					<PublicRoute path='/login' isAuthenticated={isAuthenticated}>
						<Login />
					</PublicRoute>
					<PublicRoute path='/registration' isAuthenticated={isAuthenticated}>
						<Registration />
					</PublicRoute>
					<PrivateRoute exact path='/courses' isAuthenticated={isAuthenticated}>
						<Courses />
					</PrivateRoute>
					<PrivateRoute
						exact
						path='/courses/add'
						isAuthenticated={isAuthenticated}
					>
						<CreateCourse />
					</PrivateRoute>
					<PrivateRoute
						exact
						path='/courses/:id'
						isAuthenticated={isAuthenticated}
					>
						<CourseInfo />
					</PrivateRoute>
					<PrivateRoute
						exact
						path='/courses/update/:id'
						isAuthenticated={isAuthenticated}
					>
						<CreateCourse />
					</PrivateRoute>
					<Route path='*'>
						<NoFoundComponent />
					</Route>
				</Switch>
			</Suspense>
		</div>
	);
};

export default App;
