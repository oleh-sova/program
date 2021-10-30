import { React } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMessageStore } from '../../store/selectors.js';
import { userLogin } from '../../store/user/actionsCreators.js';
import useValidate from '../../utils/customHooks/useValidate.js';
import Button from '../UI/Button/Button';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import Message from '../UI/Message/Message';

const Login = () => {
	const dispatch = useDispatch();

	const { messages } = useSelector(getMessageStore);

	const email = useValidate('', { isEmpty: true, minLength: 5, isEmail: true });
	const password = useValidate('', { isEmpty: true, minLength: 6 });

	const handlerLogin = (event) => {
		event.preventDefault();
		const userData = {
			email: email.value,
			password: password.value,
		};
		dispatch(userLogin(userData));
	};

	return (
		<section className='section-loyout'>
			{messages.length > 0 && (
				<ul className='message'>
					{messages.map((message) => {
						return (
							<Message
								key={message.id}
								id={message.id}
								text={message.text}
								statusMessage={message.statusMessage}
							/>
						);
					})}
				</ul>
			)}
			<Form onSubmit={handlerLogin}>
				<Input
					type='email'
					id='email'
					name='email'
					onBlur={email.onBlur}
					onChange={email.onChange}
					settings={email}
				/>
				<Input
					type='text'
					id='password'
					name='password'
					onBlur={password.onBlur}
					onChange={password.onChange}
					settings={password}
				/>
				<Button disabled={password.buttonValid || email.buttonValid}>
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
