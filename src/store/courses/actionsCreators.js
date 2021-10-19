import { showError } from '../errors/actionsCreators';
import { ADD_COURSE, DELETE_COURSE, GET_COURSES } from './actionTypes';

export const getCourses = (data) => ({ type: GET_COURSES, payload: data });

export const addNewCourse = (newCourse) => ({
	type: ADD_COURSE,
	payload: newCourse,
});

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
				dispatch(showError('Course was deleted!', 'success'));
			} else {
				dispatch(showError(json.message));
			}
		} catch (error) {
			console.log('error');
		}
	};
}
