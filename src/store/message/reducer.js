import { MESSAGE_CREATE, MESSAGE_DELETE } from './actionTypes';

const initialState = {
	messages: [],
	message: {
		id: '',
		text: '',
		statusMessage: '',
	},
};

export const messageReduser = (state = initialState, action) => {
	switch (action.type) {
		case MESSAGE_CREATE:
			return {
				messages: [...state.messages, action.payload],
				message: {
					id: action.payload.id,
					text: action.payload.text,
					statusError: action.payload.statusError,
				},
			};
		case MESSAGE_DELETE:
			return {
				messages: state.messages.filter(
					(message) => message.id !== action.payload
				),
				message: {
					id: '',
					text: '',
					statusMessage: '',
				},
			};
		default:
			return state;
	}
};
