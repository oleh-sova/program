import React from 'react';

const Error = ({ messageForm, classHtml }) => {
	return messageForm ? <div className={classHtml}> {messageForm} </div> : false;
};

export default Error;
