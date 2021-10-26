import { ALERT_HIDE, ALERT_SHOW } from './actionTypes';

export const showError = (text) => {
	return (dispatch) => {
		dispatch({
			type: ALERT_SHOW,
			payload: text,
		});

		setTimeout(() => {
			dispatch(hideError());
		}, 3000);
	};
};

export const hideError = (text) => {
	return {
		type: ALERT_HIDE,
	};
};
