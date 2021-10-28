import { useDispatch, useSelector } from 'react-redux';

import { getUserStore } from '../../store/selectors';
import { userLogout } from '../../store/user/actionsCreators';
import Logo from '../Logo/Logo';
import Button from '../UI/Button/Button';

function Header() {
	const dispatch = useDispatch();

	const { token, isAuth, name } = useSelector(getUserStore);

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
						{isAuth && (
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
