import { useHistory } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses.jsx';
import CreateCourse from './components/CreateCourse/CreateCourse.jsx';
import Header from './components/Header/Header.jsx';
import Login from './components/Login/Login.jsx';
import Registration from './components/Registration/Registration.jsx';
import { getAuthors } from './store/authors/actionsCreators';
import { getCourses } from './store/courses/actionsCreators';
import useFetch from './utils/customHooks/useFetch.js';

const App = () => {
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
