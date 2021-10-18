import { ALERT_HIDE, ALERT_SHOW } from './actionTypes';

const initialState = {
	alert: false,
};

export const errorsReduser = (state = initialState, action) => {
	switch (action.type) {
		case ALERT_SHOW:
			return {
				alert: action.payload,
			};
		case ALERT_HIDE:
			return {
				alert: false,
			};
		default:
			return state;
	}
};
