import { ADD_COURSE, DELETE_COURSE, GET_COURSES } from './actionTypes';

export const getCourses = (data) => ({ type: GET_COURSES, payload: data });

export const addNewCourse = (newCourse) => ({
	type: ADD_COURSE,
	payload: newCourse,
});

export const deleteCourse = (courseId) => ({
	type: DELETE_COURSE,
	payload: courseId,
});
