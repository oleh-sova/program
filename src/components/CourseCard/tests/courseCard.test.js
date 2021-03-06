import React from 'react';

// eslint-disable-next-line import/order
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line import/order
import { createMemoryHistory } from 'history';
// eslint-disable-next-line import/order
import { Router } from 'react-router';

import '@testing-library/jest-dom';
// eslint-disable-next-line import/order
import { Provider } from 'react-redux';

import { mockedState } from '../../../mocks/mockedState';
import {
	authorNameFilter,
	getFormatedTime,
	getRenderContainer,
} from '../../../utils/utils';
import CourseCard from '../CourseCard';

const buildComponent = (store, props) => {
	const history = createMemoryHistory();

	return render(
		<Router history={history}>
			<Provider store={store}>
				<CourseCard {...props} />
			</Provider>
		</Router>
	);
};

describe('testing CourseCard component', () => {
	let props, container;
	// Date format DD/MM/YY
	const regExpDate =
		/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
	// Time format 00:00 hours
	const regExpTime = /(\d{2}):(\d{2}) hours/g;

	const getAuthorsStore = mockedState.getState().authors.authors;

	beforeEach(() => {
		props = {
			courseInfo: {
				title: 'Test Title',
				description: 'Test Description',
				creationDate: '26/10/2021',
				duration: ' 00:50 hours',
				authors: ['id1'],
				id: true,
			},
		};

		container = getRenderContainer(buildComponent(mockedState, props));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('Should display course card', () => {
		expect(props.courseInfo.id).toBeTruthy();
	});
	test('Should display title course', () => {
		const title = screen.queryByText(props.courseInfo.title);
		expect(container).toBeVisible(title);
	});

	test('Should display description course', () => {
		const description = screen.queryByText(props.courseInfo.description);
		expect(container).toBeVisible(description);
	});

	test('Should display duration format course', () => {
		expect(getFormatedTime(50)).toMatch(regExpTime);
		const duration = screen.queryByText(props.courseInfo.duration);
		expect(container).toBeVisible(duration);
	});

	test('Should display authors list course', () => {
		const author = container.querySelector('[data-testid="authors"]');
		expect(authorNameFilter(getAuthorsStore, props.courseInfo.authors)).toEqual(
			'Author; '
		);
		expect(author).toBeInTheDocument();
	});

	test('Should display properly date format', () => {
		const date = container.querySelector('[data-testid="date"]');
		expect(props.courseInfo.creationDate).toMatch(regExpDate);
		expect(date).toBeInTheDocument();
	});
});
