import { React, useState } from 'react';

import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import { FetchSend } from '../../utils/utils.js';
import Button from '../UI/Button/Button';
import Error from '../UI/Error/Error';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';

const Login = ({ updateUserName, messageForm, updateMessageForm }) => {
	const router = useHistory();
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});

	const handlerUserData = ({ target: { name, value } }) => {
		setUserData({
			...userData,
			[name]: value,
		});
	};

	const handlerLogin = (event) => {
		event.preventDefault();
		FetchSend(userData, 'http://localhost:3000/login')
			.then(({ successful, result, user, errors }) => {
				if (successful) {
					updateUserName(user.name);

					localStorage.setItem('userToken', result);

					updateMessageForm({
						message: '',
						classHtml: '',
					});

					router.push('/courses');
				}
				if (!successful) {
					errors
						? updateMessageForm({ message: errors, classHtml: 'error' })
						: updateMessageForm({ message: result, classHtml: 'error' });
				}
			})
			.catch((e) =>
				updateMessageForm({
					message: 'Something wrong, please try later',
					classHtml: 'error',
				})
			);
	};

	return (
		<section className='section-loyout'>
			{messageForm.message && (
				<Error
					messageForm={messageForm.message}
					classHtml={messageForm.classHtml}
				/>
			)}

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

Login.propTypes = {
	updateUserName: PropTypes.func,
	messageForm: PropTypes.object,
	updateMessageForm: PropTypes.func,
};

export default Login;
