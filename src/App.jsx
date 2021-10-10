import { useState } from 'react';
import {
	Switch,
	Route,
	Redirect,
	BrowserRouter as Router,
} from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Registration from './components/Registration/Registration.jsx';
import Header from './components/Header/Header.jsx';
import Courses from './components/Courses/Courses.jsx';

const App = () => {
	const [userName, setUserName] = useState('');
	const [messageForm, setMessageForm] = useState('');

	const updateUserName = (newName) => {
		setUserName(newName);
	};

	const updateMessageForm = (message) => {
		setMessageForm(message);
	};

	return (
		<div className='App'>
			<Header userName={userName} updateUserName={updateUserName} />

			<Router>
				<Switch>
					<Route exact path='/'>
						<Redirect to='/login' />
					</Route>
					<Route path='/courses' component={() => <Courses />} />
					<Route
						path='/login'
						component={() => (
							<Login
								updateUserName={updateUserName}
								messageForm={messageForm}
								updateMessageForm={updateMessageForm}
							/>
						)}
					/>
					<Route
						path='/registration'
						component={() => (
							<Registration
								updateMessageForm={updateMessageForm}
								messageForm={messageForm}
							/>
						)}
					/>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
