import { isOpenMessage } from '../message/actionsCreators';
import {
	USER_LOGIN,
	USER_LOGOUT,
	USER_REGISTRATION,
	USER_ROLE,
} from './actionTypes';

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

export const userLogin = (url, userData) => {
	return async (dispatch, getState) => {
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

				const {
					user: { token },
				} = getState();

				dispatch(userGetRole(token));
			} else {
				dispatch(isOpenMessage(json.result));
			}
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
};

export const userGetRole = (token) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`http://localhost:3000/users/me`, {
				method: 'GET',
				headers: {
					Authorization: token,
				},
			});
			const {
				successful,
				result: { role },
			} = await response.json();
			if (successful) {
				dispatch({ type: USER_ROLE, payload: role === 'admin' ? true : false });
			}
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
};

export const userLogout = (token) => async (dispatch) => {
	try {
		const { ok } = await fetch(`http://localhost:3000/logout`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});
		if (ok) {
			dispatch({ type: USER_LOGOUT });
			dispatch(isOpenMessage('Logouted !!!', 'successful'));
		}
	} catch (error) {
		dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
	}
};
