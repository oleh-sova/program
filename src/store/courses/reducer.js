import { ADD_COURSE, DELETE_COURSE, GET_COURSES } from './actionTypes';

const initialState = {
	courses: [],
};

export const coursesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_COURSES:
			return {
				...state,
				courses: action.payload,
			};
		case ADD_COURSE:
			return {
				...state,
				courses: [...state.courses, action.payload],
			};
		case DELETE_COURSE:
			return {
				...state,
				courses: state.courses.filter((course) => course.id !== action.payload),
			};
		default:
			return state;
	}
};
