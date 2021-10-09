import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from '../UI/Form/Form';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { FetchSend } from '../../utils/utils.js';
import Error from '../UI/Error/Error';

const Login = ({ updateUserName, messageForm, updateMessageForm }) => {
	const router = useHistory();
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});

	const handlerUserData = (event) => {
		setUserData({
			...userData,
			[event.target.name]: event.target.value,
		});
	};

	const handlerLogin = (event) => {
		event.preventDefault();
		FetchSend(userData, 'http://localhost:3000/login')
			.then(({ successful, result, user, errors }) => {
				if (successful) {
					updateUserName(user.name);
					localStorage.setItem('UserToken', result);
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
			<Error
				messageForm={messageForm.message}
				classHtml={messageForm.classHtml}
			/>
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
				<Button type='submit' className='btn'>
					Login
				</Button>
				<p>
					If you don't have an account you can
					<Link to={'/registration'}> Registration!</Link>
				</p>
			</Form>
		</section>
	);
};

export default Login;
