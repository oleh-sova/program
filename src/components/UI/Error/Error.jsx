import React from 'react';

import useHideMessage from '../../../utils/customHooks/useHideMessage';

const Error = ({ id, text, statusMessage = 'alert' }) => {
	useHideMessage(id);

	return (
		<li className={`message__form ${statusMessage}`}>
			<h5>{text}</h5>
		</li>
	);
};

export default Error;
