import { useState } from 'react';

import {
	Switch,
	Route,
	Redirect,
	BrowserRouter as Router,
} from 'react-router-dom';

import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses.jsx';
import CreateCourse from './components/CreateCourse/CreateCourse.jsx';
import Header from './components/Header/Header.jsx';
import Login from './components/Login/Login.jsx';
import Registration from './components/Registration/Registration.jsx';
import useFetch from './utils/customHooks/useFetch.js';

const App = () => {
	const [userName, setUserName] = useState(''); // hardcode for testing
	const [messageForm, setMessageForm] = useState({});

	const [coursesList, setCoursesList] = useState([]);
	const [authorsList, setAuthorsList] = useState([]);

	const [updatingComponent, setUpdatingComponent] = useState('');

	useFetch(
		'http://localhost:3000/courses/all',
		setCoursesList,
		updatingComponent
	);
	useFetch(
		'http://localhost:3000/authors/all',
		setAuthorsList,
		updatingComponent
	);

	const updateUserName = (newName) => {
		setUserName(newName);
	};

	const updateMessageForm = (message) => {
		setMessageForm(message);
	};

	return (
		<div className='App'>
			<Router>
				<Header userName={userName} updateUserName={updateUserName} />
				<Switch>
					<Route exact path='/'>
						<Redirect to='/login' />
					</Route>

					<Route exact path='/courses'>
						<Courses authorsList={authorsList} coursesList={coursesList} />
					</Route>

					<Route path={'/courses/add'}>
						<CreateCourse
							messageForm={messageForm}
							updateMessageForm={updateMessageForm}
							updateComponent={(status) => setUpdatingComponent(status)}
							authorsList={authorsList}
						/>
					</Route>
					<Route path={'/courses/:id'}>
						<CourseInfo courses={coursesList} authorsList={authorsList} />
					</Route>
					<Route path='/login'>
						<Login
							updateUserName={updateUserName}
							messageForm={messageForm}
							updateMessageForm={updateMessageForm}
						/>
					</Route>
					<Route path='/registration'>
						<Registration
							updateMessageForm={updateMessageForm}
							messageForm={messageForm}
						/>
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
