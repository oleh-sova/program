import {
	ADD_AUTHOR,
	ADD_AUTHOR_TO_COURSE,
	CLEAR_AUTHOR,
	DELETE_AUTHOR_FROM_COURSE,
	GET_AUTHORS,
} from './actionTypes';

export const getAuthors = (data) => ({ type: GET_AUTHORS, payload: data });

export const addAuthor = (authorData) => ({
	type: ADD_AUTHOR,
	payload: authorData,
});

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

export const clearAuthorCourse = () => ({
	type: CLEAR_AUTHOR,
});
