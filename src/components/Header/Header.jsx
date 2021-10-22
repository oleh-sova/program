import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Button from '../UI/Button/Button';

function Header() {
	const router = useHistory();
	const {
		user: { token, name = 'Author' },
	} = useSelector((state) => state);

	const handlerLogout = () => {
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
							<span>{name}</span>
							{token && (
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
