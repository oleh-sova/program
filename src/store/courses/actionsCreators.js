import {
	changeDataAPI,
	deleteDataAPI,
	getDataAPI,
	sendDataAPI,
} from '../../utils/API/api';
import {
	ADD_NEW_COURSE_URL,
	ALL_COURSES_URL,
	COURSES_URL,
} from '../../utils/url';
import { isOpenMessage } from '../message/actionsCreators';
import { ADD_COURSE, DELETE_COURSE, GET_COURSES } from './actionTypes';

export function getCourses() {
	return async (dispatch) => {
		try {
			const { result } = await getDataAPI(ALL_COURSES_URL);
			dispatch({ type: GET_COURSES, payload: result });
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
}

export function addNewCourse(courseData, token, push) {
	return async (dispatch) => {
		try {
			const { successful, result } = await sendDataAPI(
				ADD_NEW_COURSE_URL,
				courseData,
				token
			);
			if (successful) {
				dispatch({ type: ADD_COURSE, payload: result });
				push('/courses');
			}
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
}

export function deleteCourse(courseId, token) {
	return async (dispatch) => {
		try {
			const responce = await deleteDataAPI(COURSES_URL + courseId, token);
			const { successful, message } = await responce.json();
			if (successful) {
				dispatch({ type: DELETE_COURSE, payload: courseId });
				dispatch(isOpenMessage('Course was deleted!', 'successful'));
			} else {
				dispatch(isOpenMessage(message));
			}
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
}

export function updateCourse(courseId, dataCourse, token, push) {
	return async (dispatch) => {
		try {
			const { successful } = await changeDataAPI(
				COURSES_URL + courseId,
				dataCourse,
				token
			);
			if (successful) {
				dispatch(getCourses());
				push('/courses');
				dispatch(isOpenMessage('Course updated!!!', 'successful'));
			}
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
}
