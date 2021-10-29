import { useDispatch, useSelector } from 'react-redux';

import {
	getIsAuthUser,
	getUserName,
	getUserToken,
} from '../../store/selectors';
import { userLogout } from '../../store/user/actionsCreators';
import Logo from '../Logo/Logo';
import Button from '../UI/Button/Button';

function Header() {
	const dispatch = useDispatch();

	const isAuthUser = useSelector(getIsAuthUser);
	const token = useSelector(getUserToken);
	const name = useSelector(getUserName);

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
							{isAuthUser && (
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

export default Header;
