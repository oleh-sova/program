import { React, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { sendDataAPI } from '../../utils/API/api.js';
import Button from '../UI/Button/Button';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';

const Registration = () => {
	const { push } = useHistory();

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
		sendDataAPI('http://localhost:3000/register', userData).then(
			({ successful }) => successful && push('/login')
		);
	};

	return (
		<section className='section-loyout'>
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
