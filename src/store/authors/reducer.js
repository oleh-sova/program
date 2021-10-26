import {
	ADD_AUTHOR,
	ADD_AUTHOR_TO_COURSE,
	CLEAR_AUTHOR,
	DELETE_AUTHOR_FROM_COURSE,
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
		case ADD_AUTHOR_TO_COURSE:
			return {
				...state,
				authors: state.authors.filter((author) => author.id !== action.payload),
				authorsCourse: [
					...state.authorsCourse,
					...state.authors.filter((author) => author.id === action.payload),
				],
			};
		case DELETE_AUTHOR_FROM_COURSE:
			return {
				...state,
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
