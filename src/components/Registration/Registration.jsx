import { React, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { userRegistration } from '../../store/user/actionsCreators.js';
import Button from '../UI/Button/Button';
import Error from '../UI/Error/Error';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';

const Registration = () => {
	const { push } = useHistory();
	const dispatch = useDispatch();

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
		dispatch(
			userRegistration('http://localhost:3000/register', userData, push)
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
