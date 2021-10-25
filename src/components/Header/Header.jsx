import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { userLogout } from '../../store/user/actionsCreators';
import Logo from '../Logo/Logo';
import Button from '../UI/Button/Button';

function Header() {
	const dispatch = useDispatch();
	const {
		user: { isAuth, token, name = 'Author' },
	} = useSelector((state) => state);

	const handlerLogout = () => {
		dispatch(userLogout(token));
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
							{isAuth && (
								<>
									<span>{name}</span>
									<Button type='button' onClick={handlerLogout}>
										Logout
									</Button>
								</>
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
