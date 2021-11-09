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

import { initialState, mockedState } from '../../../mocks/mockedState';
import { getRenderContainer } from '../../../utils/utils';
import Courses from '../Courses';

const history = createMemoryHistory();

const buildComponent = (store) => {
	return render(
		<Router history={history}>
			<Provider store={store}>
				<Courses />
			</Provider>
		</Router>
	);
};

describe('testing Course component', () => {
	let container;
	const getCoursesStore = mockedState.getState().courses.courses;

	beforeEach(() => {
		container = getRenderContainer(buildComponent(mockedState));
	});

	test('Should display amoun of CourseCard equal courses array', () => {
		const amountCourseCard = container.querySelectorAll(
			"div[class='courseCard']"
		);
		expect(getCoursesStore).toHaveLength(amountCourseCard.length);
	});

	test('Should display empty container', () => {
		initialState.courses.courses = [];

		const { container } = buildComponent(mockedState);

		const amountCourseCard = container.querySelectorAll(
			"div[class='courseCard']"
		);
		const emptyContainer = container.querySelector("div[class='empty']");
		expect(amountCourseCard).toHaveLength(0);
		expect(emptyContainer).toBeVisible();
	});

	test('CreateCourse should be show after a click on a button', () => {
		const button = container.querySelector('[data-testid="addNewCourse"]');
		fireEvent.click(button);
		expect(history.location.pathname).toBe('/courses/add');
	});
});
