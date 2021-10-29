import { ADD_AUTHOR, DELETE_AUTOR, GET_AUTHORS } from './actionTypes';

const initialState = {
	authors: [],
	authorsCourse: [],
	idAuthorsCourse: [],
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
		case DELETE_AUTOR:
			return {
				...state,
				authors: state.authors.filter((author) => author.id !== action.payload),
			};
		default:
			return state;
	}
};
