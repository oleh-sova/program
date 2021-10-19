import { ALERT_HIDE, ALERT_SHOW } from './actionTypes';

export const showError = (text, statusError = 'alert') => ({
	type: ALERT_SHOW,
	payload: {
		text,
		statusError,
	},
});

export const hideError = () => ({
	type: ALERT_HIDE,
});
