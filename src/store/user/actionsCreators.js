import { isOpenMessage } from '../message/actionsCreators';
import { USER_LOGIN, USER_REGISTRATION } from './actionTypes';

export const userRegistration = (url, userData, push) => {
	return async (dispatch) => {
		try {
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
			} else {
				dispatch(isOpenMessage(json.errors));
			}
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
};

export const userLogin = (url, userData, push) => {
	return async (dispatch) => {
		try {
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
			} else {
				dispatch(isOpenMessage(json.result));
			}
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
};
