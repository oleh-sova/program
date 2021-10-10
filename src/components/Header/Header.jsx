import Logo from '../Logo/Logo';
import Button from '../UI/Button/Button';
import { useHistory } from 'react-router-dom';

function Header({ userName, updateUserName }) {
	const router = useHistory();

	const handlerLogout = () => {
		updateUserName('');
		localStorage.removeItem('UserToken');
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
							{userName ? (
								<Button type='button' onClick={handlerLogout}>
									Logout
								</Button>
							) : (
								false
							)}
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

export default Header;
