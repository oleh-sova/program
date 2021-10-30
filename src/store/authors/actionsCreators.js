import { deleteDataAPI, getDataAPI, sendDataAPI } from '../../utils/API/api';
import { ADD_AUTHOR_URL, ALL_AUTHORS_URL, AUTHORS_URL } from '../../utils/url';
import { isOpenMessage } from '../message/actionsCreators';
import { ADD_AUTHOR, DELETE_AUTOR, GET_AUTHORS } from './actionTypes';

export function getAuthors() {
	return async (dispatch) => {
		try {
			const { result } = await getDataAPI(ALL_AUTHORS_URL);
			dispatch({ type: GET_AUTHORS, payload: result });
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
}

export const addAuthor = (authorData, token) => {
	return async (dispatch) => {
		try {
			const { successful, result } = await sendDataAPI(
				ADD_AUTHOR_URL,
				authorData,
				token
			);
			successful && dispatch({ type: ADD_AUTHOR, payload: result });
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
};

export const deletelAuthor = (authorsId, token) => {
	return async (dispatch) => {
		try {
			const response = await deleteDataAPI(AUTHORS_URL + authorsId, token);
			const { successful } = await response.json();
			if (successful) {
				dispatch({ type: DELETE_AUTOR, payload: authorsId });
				dispatch(isOpenMessage('Author was deleted!', 'successful'));
			}
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
};
