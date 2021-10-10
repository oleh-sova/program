import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from '../UI/Form/Form';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Error from '../UI/Error/Error';
import { FetchSend } from '../../utils/utils.js';

const Registration = ({ messageForm, updateMessageForm }) => {
	const router = useHistory();

	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handlerUserData = (event) => {
		setUserData({
			...userData,
			[event.target.name]: event.target.value,
		});
	};

	const handlerSendData = (event) => {
		event.preventDefault();
		FetchSend(userData, 'http://localhost:3000/register')
			.then((dataAnswer) => {
				if (dataAnswer.successful) {
					router.push('/login');
					updateMessageForm({
						message: '',
						classHtml: '',
					});
				} else {
					updateMessageForm({ message: dataAnswer.errors, classHtml: 'error' });
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
			<Form onSubmit={handlerSendData}>
				<label htmlFor='name'>Name</label>
				<Input id='name' name='name' onChange={handlerUserData} />
				<label htmlFor='email'>Email</label>
				<Input
					type='email'
					id='email'
					name='email'
					onChange={handlerUserData}
				/>
				<label htmlFor='password'>Password</label>
				<Input id='password' name='password' onChange={handlerUserData} />
				<Button>Registration</Button>
				<p>
					If you have an account you can
					<Link to={'/login'}> Login!</Link>
				</p>
			</Form>
		</section>
	);
};

export default Registration;
