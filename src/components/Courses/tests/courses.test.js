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

import initialState from '../../../mocks/initilState';
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
	const mockedStore = {
		getState: () => initialState,
		dispatch: jest.fn(),
		subscribe: jest.fn(),
	};

	const getCoursesStore = mockedStore.getState().courses.courses;

	test('Should display amoun of CourseCard equal courses array', () => {
		const { container } = buildComponent(mockedStore);
		const amountCourseCard = container.querySelectorAll(
			"div[class='courseCard']"
		);
		expect(getCoursesStore.length).toEqual(amountCourseCard.length);
	});

	test('Should display empty container', () => {
		initialState.courses.courses = [];
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
