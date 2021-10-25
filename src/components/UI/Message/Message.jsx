import React from 'react';

import useHideMessage from '../../../utils/customHooks/useHideMessage';

const Message = ({ id, text, statusMessage }) => {
	useHideMessage(id);

	return (
		<li className={`message__form ${statusMessage}`}>
			<h5>{text}</h5>
		</li>
	);
};

export default Message;
