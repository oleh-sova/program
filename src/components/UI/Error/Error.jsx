import React from 'react';

const Error = ({ messageForm, classHtml }) => {
	return <div className={classHtml}> {messageForm} </div>;
};

export default Error;
