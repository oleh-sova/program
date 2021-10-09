import Logo from '../Logo/Logo';
import Button from '../Button/Button';

function Header() {
	return (
		<>
			<header className='header'>
				<div className='row expanded align-justify'>
					<div className='columns shrink'>
						<Logo />
					</div>
					<div className='columns shrink'>
						<div className='navigation'>
							<span>Oleh</span>
							<Button buttonName='Logout' />
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

export default Header;
