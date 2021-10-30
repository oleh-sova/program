import React from 'react';

const Form = ({ children, validate, ...props }) => {
	return (
		<form {...props}>
			{validate && <div className='message-validate'>calidate</div>}
			{children}
		</form>
	);
};

export default Form;
