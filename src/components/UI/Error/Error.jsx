import React from 'react';

const Error = ({ text, classes = 'alert' }) => {
	return (
		<div className={`callout ${classes}`}>
			<h5>{text}</h5>
		</div>
	);
};

export default Error;
