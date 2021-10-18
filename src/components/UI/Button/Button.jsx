const Button = ({
	label = 'default buttom',
	children,
	handler = null,
	type = 'submit',
	className = 'btn',
	...props
}) => {
	return (
		<button type={type} onClick={handler} className={className} {...props}>
			{children || label}
		</button>
	);
};

export default Button;
