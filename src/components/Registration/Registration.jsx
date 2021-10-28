import { React } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { getMessageStore } from '../../store/selectors.js';
import { userRegistration } from '../../store/user/actionsCreators.js';
import useValidate from '../../utils/customHooks/useValidate';
import Button from '../UI/Button/Button';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import Message from '../UI/Message/Message';

const Registration = () => {
	const { push } = useHistory();
	const dispatch = useDispatch();

	const name = useValidate('', { isEmpty: true, minLength: 3 });
	const email = useValidate('', { isEmpty: true, minLength: 5, isEmail: true });
	const password = useValidate('', { isEmpty: true, minLength: 6 });

	const { messages } = useSelector(getMessageStore);

	const handlerSendData = (event) => {
		event.preventDefault();

		const userData = {
			name: name.value,
			email: email.value,
			password: password.value,
		};

		dispatch(userRegistration(userData, push));
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
			<Form onSubmit={handlerSendData}>
				<Input
					id='name'
					name='name'
					onBlur={name.onBlur}
					onChange={name.onChange}
					settings={name}
				/>
				<Input
					type='email'
					id='email'
					name='email'
					onBlur={email.onBlur}
					onChange={email.onChange}
					settings={email}
				/>
				<Input
					id='password'
					name='password'
					onBlur={password.onBlur}
					onChange={password.onChange}
					settings={password}
				/>
				<Button
					disabled={
						name.buttonValid || password.buttonValid || email.buttonValid
					}
				>
					Registration
				</Button>
				<p>
					If you have an account you can
					<Link to={'/login'}> Login!</Link>
				</p>
			</Form>
		</section>
	);
};

export default Registration;
