const Button = ({
	label = 'default buttom',
	children,
	type = 'submit',
	className = 'btn',
	...props
}) => {
	return (
		<button type={type} className={className} {...props}>
			{children || label}
		</button>
	);
};

export default Button;
