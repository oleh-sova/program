import React from 'react';

const Input = ({
	withLabel = true,
	type = 'text',
	settings,
	id,
	name,
	...props
}) => {
	const block = settings?.validate.map((message, idx) => {
		for (const value in message) {
			if (message[value]) {
				return (
					<div className='error-validate' key={Date.now() + idx}>
						{settings.isDirty && message[value] && <p> {message[value]} </p>}
					</div>
				);
			}
		}
		return null;
	});

	return (
		<div className='row-form'>
			{withLabel && <label htmlFor={id}>{name}</label>}
			<input type={type} id={id} name={name} {...props} />
			{!!settings && settings.isDirty && block}
		</div>
	);
};

export default Input;
