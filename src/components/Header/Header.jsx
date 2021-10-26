import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getUserStore } from '../../store/selectors';
import { userLogout } from '../../store/user/actionsCreators';
import Logo from '../Logo/Logo';
import Button from '../UI/Button/Button';

function Header() {
	const router = useHistory();
	const dispatch = useDispatch();

	const tokenLocal = localStorage.getItem('token');
	const { name, token } = useSelector(getUserStore);

	useEffect(() => {
		if (tokenLocal) {
			router.push('/courses');
		}
	}, [router, tokenLocal]);

	const handlerLogout = () => {
		dispatch(userLogout());
		localStorage.removeItem('token');
		router.push('/login');
	};

	return (
		<>
			<header className='header'>
				<div className='row expanded align-justify'>
					<div className='columns shrink'>
						<Logo />
					</div>
					<div className='columns shrink'>
						{(tokenLocal || token) && (
							<div className='navigation'>
								<span>{name}</span>
								<Button type='button' onClick={handlerLogout}>
									Logout
								</Button>
							</div>
						)}
					</div>
				</div>
			</header>
		</>
	);
}

export default Header;
