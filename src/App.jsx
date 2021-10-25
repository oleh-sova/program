import { Suspense } from 'react';
import { lazy } from 'react';

import { useSelector } from 'react-redux';
import {
	Switch,
	Route,
	useHistory,
	BrowserRouter as Router,
} from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import Loader from './components/UI/Loader/Loader';
import PrivateRoute from './routes/PrivateRoute';
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
const Courses = lazy(() => import('./components/Courses/Courses.jsx'));
const CreateCourse = lazy(() =>
	import('./components/CreateCourse/CreateCourse.jsx')
);
const CourseInfo = lazy(() => import('./components/CourseInfo/CourseInfo.jsx'));

const App = () => {
	const {
		user: { isAuth: isAuthenticated },
	} = useSelector((state) => state);

	// API get all information
	useFetch('http://localhost:3000/courses/all', getCourses);
	useFetch('http://localhost:3000/authors/all', getAuthors);

	let history = useHistory();
	console.log(history);

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
						<PrivateRoute
							exact
							path='/courses'
							isAuthenticated={isAuthenticated}
						>
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
			</Router>
		</div>
	);
};

export default App;
