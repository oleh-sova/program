import { getDataFetch } from '../../utils/API/api';
import {
	ADD_AUTHOR,
	APPROVE_AUTHOR_COURSE,
	DISAPPROVE_AUTHOR_COURSE,
	GET_AUTHORS,
} from './actionTypes';

export function getAuthors() {
	return async (dispatch) => {
		try {
			const response = await fetch('http://localhost:3000/authors/all');
			const json = await response.json();
			dispatch({ type: GET_AUTHORS, payload: json.result });
		} catch (e) {
			console.log(e);
		}
	};
}

export const addAuthor = (url, authorData, token = null) => {
	return (dispatch) => {
		getDataFetch(url, authorData, token);
		dispatch({ type: ADD_AUTHOR, payload: authorData });
	};
};

export const addAuthorToCourse = (authorId) => {
	return {
		type: APPROVE_AUTHOR_COURSE,
		payload: authorId,
	};
};

export const deleteAuthorToCourse = (authorId) => {
	return {
		type: DISAPPROVE_AUTHOR_COURSE,
		payload: authorId,
	};
};
