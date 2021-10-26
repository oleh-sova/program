import {
	ADD_AUTHOR,
	APPROVE_AUTHOR_COURSE,
	CLEAR_AUTHOR,
	DISAPPROVE_AUTHOR_COURSE,
	GET_AUTHORS,
} from './actionTypes';

const initialState = {
	authors: [],
	authorsCourse: [],
};

export const authorsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_AUTHORS:
			return {
				...state,
				authors: action.payload,
			};
		case ADD_AUTHOR:
			return {
				...state,
				authors: [...state.authors, action.payload],
			};
		case APPROVE_AUTHOR_COURSE:
			return {
				authors: state.authors.filter((author) => author.id !== action.payload),
				authorsCourse: [
					...state.authorsCourse,
					...state.authors.filter((author) => author.id === action.payload),
				],
			};
		case DISAPPROVE_AUTHOR_COURSE:
			return {
				authors: [
					...state.authors,
					...state.authorsCourse.filter(
						(author) => author.id === action.payload
					),
				],
				authorsCourse: state.authorsCourse.filter(
					(author) => author.id !== action.payload
				),
			};
		case CLEAR_AUTHOR:
			return {
				...state,
				authors: [...state.authors, ...state.authorsCourse],
				authorsCourse: [],
			};
		default:
			return state;
	}
};
