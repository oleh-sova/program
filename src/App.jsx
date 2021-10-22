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
	useFetch('http://localhost:3000/courses/all', getCourses);
	useFetch('http://localhost:3000/authors/all', getAuthors);

	let history = useHistory();
	console.log(history);

	return (
		<div className='App'>
			<Header />
			<Switch>
				<Route exact path='/'>
					<Redirect to='/login' />
				</Route>
				<Route exact path='/courses'>
					<Courses />
				</Route>

				<Route path={'/courses/add'}>
					<CreateCourse />
				</Route>
				<Route path={'/courses/:id'}>
					<CourseInfo />
				</Route>
				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/registration'>
					<Registration />
				</Route>
			</Switch>
		</div>
	);
};

export default App;
