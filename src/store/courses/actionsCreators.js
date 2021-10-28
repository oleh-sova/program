import {
	changeDataAPI,
	deleteDataAPI,
	getDataAPI,
	sendDataAPI,
} from '../../utils/API/api';
import { addNewCourseURL, allCoursesURL, coursesURL } from '../../utils/url';
import { clearAuthorsList } from '../authors/actionsCreators';
import { isOpenMessage } from '../message/actionsCreators';
import { ADD_COURSE, DELETE_COURSE, GET_COURSES } from './actionTypes';

export function getCourses() {
	return async (dispatch) => {
		try {
			const { result } = await getDataAPI(allCoursesURL);
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
				addNewCourseURL,
				courseData,
				token
			);
			if (successful) {
				dispatch(clearAuthorsList());
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
			const responce = await deleteDataAPI(coursesURL, courseId, token);
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
				coursesURL,
				courseId,
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
