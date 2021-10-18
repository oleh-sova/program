import { USER_LOGIN, USER_REGISTRATION } from './actionTypes';

export const userRegistration = (url, userData, push) => {
	return async (dispatch) => {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		const json = await response.json();

		if (json.successful) {
			dispatch({
				type: USER_REGISTRATION,
				payload: json.successful,
			});
			push('/login');
		}
	};
};

export const userLogin = (url, userData, push) => {
	return async (dispatch) => {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		const json = await response.json();

		if (json.successful) {
			dispatch({
				type: USER_LOGIN,
				payload: json,
			});
			push('/courses');
		}
	};
};
