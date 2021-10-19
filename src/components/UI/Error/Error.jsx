import React from 'react';

import { useSelector } from 'react-redux';

import useHideMessage from '../../../utils/customHooks/useTimerMessage';

const Error = ({ text, classes }) => {
	const {
		alert: { alert },
	} = useSelector((state) => state);

	useHideMessage(alert);

	return (
		<div className={`callout ${classes}`}>
			<h5>{text}</h5>
		</div>
	);
};

export default Error;
