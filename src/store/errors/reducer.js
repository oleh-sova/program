import { ALERT_HIDE, ALERT_SHOW } from './actionTypes';

const initialState = {
	alert: false,
	statusError: '',
};

export const errorsReduser = (state = initialState, action) => {
	switch (action.type) {
		case ALERT_SHOW:
			return {
				alert: action.payload.text,
				statusError: action.payload.statusError,
			};
		case ALERT_HIDE:
			return {
				alert: false,
				statusError: '',
			};
		default:
			return state;
	}
};
