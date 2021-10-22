import { v4 as uuidv4 } from 'uuid';

import { MESSAGE_CREATE, MESSAGE_DELETE } from './actionTypes';

export const isOpenMessage = (text = 'something went wrong!', statusError) => ({
	type: MESSAGE_CREATE,
	payload: {
		id: uuidv4(),
		text,
		statusError,
	},
});

export const isCloseMessage = (idMessage) => ({
	type: MESSAGE_DELETE,
	payload: idMessage,
});
