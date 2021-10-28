import { deleteDataAPI, getDataAPI, sendDataAPI } from '../../utils/API/api';
import { addAuthorURL, allAuthorsURL, authorsURL } from '../../utils/url';
import { isOpenMessage } from '../message/actionsCreators';
import {
	ADD_AUTHOR,
	ADD_AUTHOR_TO_COURSE,
	CLEAR_AUTHOR,
	DELETE_AUTHOR_FROM_COURSE,
	DELETE_AUTOR,
	GET_AUTHORS,
	GET_AUTORS_COURSE,
} from './actionTypes';

export function getAuthors() {
	return async (dispatch) => {
		try {
			const { result } = await getDataAPI(allAuthorsURL);
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
				addAuthorURL,
				authorData,
				token
			);
			successful && dispatch({ type: ADD_AUTHOR, payload: result });
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
};

export const addAuthorToCourse = (authorId) => {
	return {
		type: ADD_AUTHOR_TO_COURSE,
		payload: authorId,
	};
};

export const deleteAuthorToCourse = (authorId) => {
	return {
		type: DELETE_AUTHOR_FROM_COURSE,
		payload: authorId,
	};
};

export const clearAuthorsList = () => ({ type: CLEAR_AUTHOR });

export const getAuthorsCourse = (authorsId) => ({
	type: GET_AUTORS_COURSE,
	payload: authorsId,
});

export const deletelAuthor = (authorsId, token) => {
	return async (dispatch) => {
		try {
			const response = await deleteDataAPI(authorsURL, authorsId, token);
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
