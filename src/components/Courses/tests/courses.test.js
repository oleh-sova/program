import React from 'react';

// eslint-disable-next-line import/order
import { render, fireEvent } from '@testing-library/react';
// eslint-disable-next-line import/order
import { createMemoryHistory } from 'history';
// eslint-disable-next-line import/order
import { Router } from 'react-router';

import '@testing-library/jest-dom';
// eslint-disable-next-line import/order
import { Provider } from 'react-redux';

import Courses from '../Courses';

const buildComponent = (store) => {
	const history = createMemoryHistory();

	return render(
		<Router history={history}>
			<Provider store={store}>
				<Courses />
			</Provider>
		</Router>
	);
};

describe('testing Course component', () => {
	const mockedState = {
		user: {
			token: '',
			role: 'admin',
		},
		message: {
			messages: [],
			message: {
				id: '',
				text: '',
				statusMessage: '',
			},
		},
		courses: {
			courses: [
				{
					title: 'Test title',
					description: 'Test description',
					duration: 100,
					authors: ['id1'],
					creationDate: '26/10/2021',
					id: 'course-id-1',
				},
				{
					title: 'Test title2',
					description: 'Test description2',
					duration: 110,
					authors: ['id1'],
					creationDate: '26/10/2021',
					id: 'course-id-2',
				},
			],
		},
		authors: { authors: [{ id: 'id1', name: 'Author' }] },
	};

	const mockedStore = {
		getState: () => mockedState,
		dispatch: jest.fn(),
		subscribe: jest.fn(),
	};

	test('Should display amoun of CourseCard equal courses array', () => {
		const { container } = buildComponent(mockedStore);
		const amountCourseCard = container.querySelectorAll(
			"div[class='courseCard']"
		);
		expect(mockedState.courses.courses.length).toEqual(amountCourseCard.length);
	});

	test('Should display empty container', () => {
		mockedState.courses.courses = [];
		const { container } = buildComponent(mockedStore);
		const amountCourseCard = container.querySelectorAll(
			"div[class='courseCard']"
		);
		const emptyContainer = container.querySelector("div[class='empty']");
		expect(amountCourseCard.length).toEqual(0);
		expect(emptyContainer).toBeVisible();
	});

	test('CreateCourse should be show after a click on a button', () => {
		const history = createMemoryHistory();
		const { container } = render(
			<Router history={history}>
				<Provider store={mockedStore}>
					<Courses />
				</Provider>
			</Router>
		);
		const button = container.querySelector('[data-testid="addNewCourse"]');
		fireEvent.click(button);
		expect(history.location.pathname).toBe('/courses/add');
	});
});
