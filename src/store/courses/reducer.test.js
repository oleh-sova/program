import initialState from '../../mocks/initilState';
import { ADD_COURSE, GET_COURSES } from './actionTypes';
import { coursesReducer } from './reducer';

describe('Test of courses reducer ', () => {
	test('Should return the initial state', () => {
		const result = coursesReducer(undefined, 'action');
		expect(result.courses).toEqual([]);
	});

	test('Should handle GET_COURSES and returns result state', () => {
		const result = coursesReducer(undefined, {
			type: GET_COURSES,
			payload: initialState.courses.courses,
		});
		expect(result.courses.length).toEqual(2);
	});

	test('Should handle ADD_COURSE and returns result state', () => {
		const newCourse = {
			title: 'Test title4',
			description: 'Test description4',
			duration: 100,
			authors: ['id1'],
			creationDate: '26/11/2021',
			id: 'course-id-4',
		};

		const result = coursesReducer(initialState.courses, {
			type: ADD_COURSE,
			payload: newCourse,
		});
		expect(result.courses.length).toEqual(3);
	});
});
