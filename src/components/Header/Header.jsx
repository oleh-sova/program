import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Button from '../UI/Button/Button';

function Header({ userName, updateUserName }) {
	const router = useHistory();

	const handlerLogout = () => {
		updateUserName('');
		localStorage.removeItem('userToken');
		localStorage.removeItem('role');
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
						<div className='navigation'>
							<span>{userName}</span>
							{userName && (
								<Button type='button' onClick={handlerLogout}>
									Logout
								</Button>
							)}
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

Header.propTypes = {
	userName: PropTypes.string,
	updateUserName: PropTypes.func,
};

export default Header;
