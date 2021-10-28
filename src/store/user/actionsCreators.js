import { deleteDataAPI, getDataAPI, sendDataAPI } from '../../utils/API/api';
import {
	logoutURL,
	userGetRoleURL,
	userLoginURL,
	userRegistrationURL,
} from '../../utils/url';
import { isOpenMessage } from '../message/actionsCreators';
import {
	USER_LOGIN,
	USER_LOGOUT,
	USER_REGISTRATION,
	USER_ROLE,
} from './actionTypes';

export const userRegistration = (userData, push) => {
	return async (dispatch) => {
		try {
			const { successful, errors } = await sendDataAPI(
				userRegistrationURL,
				userData
			);

			if (successful) {
				dispatch({
					type: USER_REGISTRATION,
					payload: successful,
				});
				push('/login');
			} else {
				dispatch(isOpenMessage(errors));
			}
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
};

export const userLogin = (userData) => {
	return async (dispatch) => {
		try {
			const json = await sendDataAPI(userLoginURL, userData);

			if (json.successful) {
				dispatch({
					type: USER_LOGIN,
					payload: json,
				});
				localStorage.setItem('token', json.result);

				dispatch(userGetRole(json.result));
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
			const { successful, result } = await getDataAPI(userGetRoleURL, token);
			if (successful) {
				dispatch({ type: USER_ROLE, payload: { ...result, token } });
			}
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
};

export const userLogout = (token) => async (dispatch) => {
	try {
		const { ok } = await deleteDataAPI(logoutURL, '', token);
		if (ok) {
			dispatch({ type: USER_LOGOUT });

			localStorage.removeItem('token');

			dispatch(isOpenMessage('Logouted !!!', 'successful'));
		}
	} catch (error) {
		dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
	}
};
