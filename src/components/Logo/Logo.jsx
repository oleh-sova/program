import logo from '../../images/logo.svg';

function Logo() {
	return (
		<div className='header__logo'>
			<img src={logo} className='logo' alt='logo' />
			<span>Website</span>
		</div>
	);
}

export default Logo;
