import {
	ADD_AUTHOR,
	APPROVE_AUTHOR_COURSE,
	CLEAR_AUTHOR,
	DISAPPROVE_AUTHOR_COURSE,
	GET_AUTHORS,
} from './actionTypes';

export const getAuthors = (data) => ({ type: GET_AUTHORS, payload: data });

export const addAuthor = (authorData) => ({
	type: ADD_AUTHOR,
	payload: authorData,
});

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

export const clearAuthorCourse = () => ({
	type: CLEAR_AUTHOR,
});
