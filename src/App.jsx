import { Suspense, useEffect } from 'react';
import { lazy } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import Loader from './components/UI/Loader/Loader';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { getIsAuthUser } from './store/selectors.js';
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
	const { push } = useHistory();
	const isAuthUser = useSelector(getIsAuthUser);

	useEffect(() => {
		const userToken = localStorage.getItem('token');
		if (userToken) {
			dispatch(userGetRole(userToken));
			push('/courses');
		} else {
			push('/login');
		}
	}, [dispatch, push]);

	return (
		<div className='App'>
			<Header />
			<Suspense fallback={<Loader />}>
				<Switch>
					<PublicRoute path='/login' isAuthenticated={isAuthUser}>
						<Login />
					</PublicRoute>
					<PublicRoute path='/registration' isAuthenticated={isAuthUser}>
						<Registration />
					</PublicRoute>
					<PrivateRoute exact path='/courses' isAuthenticated={isAuthUser}>
						<Courses />
					</PrivateRoute>
					<PrivateRoute exact path='/courses/add' isAuthenticated={isAuthUser}>
						<CreateCourse />
					</PrivateRoute>
					<PrivateRoute exact path='/courses/:id' isAuthenticated={isAuthUser}>
						<CourseInfo />
					</PrivateRoute>
					<PrivateRoute
						exact
						path='/courses/update/:id'
						isAuthenticated={isAuthUser}
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
