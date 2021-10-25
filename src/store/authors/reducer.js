import { clearAuthorList, getAuthorsInfo } from '../../utils/utils';
import {
	APPROVE_AUTHOR_COURSE,
	CLEAR_AUTHOR,
	DELETE_AUTHOR_FROM_COURSE,
	GET_AUTHORS,
	GET_AUTORS_COURSE,
} from './actionTypes';

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
				authors: clearAuthorList(action.payload, state.idAuthorsCourse),
			};
		case ADD_AUTHOR_TO_COURSE:
			return {
				...state,
				authors: state.authors.filter((author) => author.id !== action.payload),
				authorsCourse: [
					...state.authorsCourse,
					...state.authors.filter((author) => author.id === action.payload),
				],
				idAuthorsCourse: [...state.idAuthorsCourse, action.payload],
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
				idAuthorsCourse: [],
			};
		case GET_AUTORS_COURSE:
			return {
				...state,
				authors: clearAuthorList(state.authors, action.payload),
				authorsCourse: [...getAuthorsInfo(state.authors, action.payload)],
				idAuthorsCourse: action.payload,
			};
		default:
			return state;
	}
};
