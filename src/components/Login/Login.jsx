import { React, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { userLogin } from '../../store/user/actionsCreators.js';
import { sendDataAPI } from '../../utils/API/api.js';
import Button from '../UI/Button/Button';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';

const Login = () => {
	const { push } = useHistory();
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	const dispatch = useDispatch();

	const handlerUserData = ({ target: { name, value } }) => {
		setUserData({
			...userData,
			[name]: value,
		});
	};

	const handlerLogin = (event) => {
		event.preventDefault();

		sendDataAPI('http://localhost:3000/login', userData).then(
			({ successful, result: token, user }) => {
				if (successful) {
					dispatch(userLogin({ ...user, token }));
					localStorage.setItem('token', token);
					push('/courses');
				}
			}
		);
	};

	return (
		<section className='section-loyout'>
			<Form onSubmit={handlerLogin}>
				<label htmlFor='email'>Email</label>
				<Input
					type='email'
					id='email'
					name='email'
					onChange={handlerUserData}
				/>
				<label htmlFor='password'>Password</label>
				<Input
					type='text'
					id='password'
					name='password'
					onChange={handlerUserData}
				/>
				<Button>Login</Button>
				<p>
					If you don't have an account you can
					<Link to={'/registration'}> Registration!</Link>
				</p>
			</Form>
		</section>
	);
};

export default Login;
