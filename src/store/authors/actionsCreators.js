import { getDataFetch } from '../../utils/API/api';
import { isOpenMessage } from '../message/actionsCreators';
import {
	APPROVE_AUTHOR_COURSE,
	DISAPPROVE_AUTHOR_COURSE,
	GET_AUTHORS,
	GET_AUTORS_COURSE,
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

export const addAuthor = (authorData, token = null) => {
	return (dispatch) => {
		getDataFetch('http://localhost:3000/authors/add', authorData, token)
			.then(({ successful }) => successful && dispatch(getAuthors()))
			.catch((error) =>
				dispatch(isOpenMessage('Something is wrong, try later ...!!!'))
			);
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

export const getAuthorsCourse = (authorsId) => ({
	type: GET_AUTORS_COURSE,
	payload: authorsId,
});

export const deletelAuthor = (authorsId, token) => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`http://localhost:3000/authors/${authorsId}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: token,
					},
				}
			);
			const { successful } = await response.json();
			if (successful) {
				dispatch(getAuthors());
				dispatch(isOpenMessage('Author was deleted!', 'successful'));
			}
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
};
