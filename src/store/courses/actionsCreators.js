import { getDataFetch } from '../../utils/API/api';
import { getAuthors } from '../authors/actionsCreators';
import { CLEAR_AUTHOR } from '../authors/actionTypes';
import { isOpenMessage } from '../message/actionsCreators';
import { DELETE_COURSE, GET_COURSES } from './actionTypes';

export function getCourses() {
	return async (dispatch) => {
		try {
			const response = await fetch('http://localhost:3000/courses/all');
			const json = await response.json();
			dispatch({ type: GET_COURSES, payload: json.result });
		} catch (e) {
			console.log(e);
		}
	};
}

export function addNewCourse(url, courseData, token = null, push) {
	return async (dispatch) => {
		getDataFetch(url, courseData, token).then(({ successful }) => {
			if (successful) {
				dispatch({ type: CLEAR_AUTHOR });
				dispatch(getAuthors());
				dispatch(getCourses());
				push('/courses');
			}
		});
	};
}

export function deleteCourse(url, courseId, token = null) {
	return async (dispatch) => {
		try {
			const response = await fetch(`${url}${courseId}`, {
				method: 'DELETE',
				headers: {
					Authorization: token,
				},
			});
			const json = await response.json();
			if (json.successful) {
				dispatch({ type: DELETE_COURSE, payload: courseId });
				dispatch(isOpenMessage('Course was deleted!', 'successful'));
			} else {
				dispatch(isOpenMessage(json.message));
			}
		} catch (error) {
			dispatch(isOpenMessage('Something is wrong, try later ...!!!'));
		}
	};
}

export function updateCourse(url, courseId, dataCourse, token = null, push) {
	return async (dispatch) => {
		try {
			const response = await fetch(`${url}${courseId}`, {
				method: 'PUT',
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dataCourse),
			});
			const { successful } = await response.json();
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
