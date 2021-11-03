import * as React from 'react';

// eslint-disable-next-line import/order
import { render, fireEvent } from '@testing-library/react';
// eslint-disable-next-line import/order
import { createMemoryHistory } from 'history';
// eslint-disable-next-line import/order
import { Router } from 'react-router';
import * as actions from '../../../store/authors/actionsCreators';

import '@testing-library/jest-dom';
// eslint-disable-next-line import/order
import { Provider } from 'react-redux';

import CreateCourse from '../CreateCourse';

const buildComponent = (store) => {
	const history = createMemoryHistory();

	return render(
		<Router history={history}>
			<Provider store={store}>
				<CreateCourse />
			</Provider>
		</Router>
	);
};

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),

	useParams: () => ({
		id: 'course-id-1',
	}),
}));

describe('testing CreateCourse component', () => {
	const mockedState = {
		user: {
			token: 'token test',
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
		authors: {
			authors: [
				{ id: 'id1', name: 'Author' },
				{ id: 'id2', name: 'Author2' },
			],
		},
	};

	const mockedStore = {
		getState: () => mockedState,
		dispatch: jest.fn(),
		subscribe: jest.fn(),
	};

	test('Should show authors lists', () => {
		const { container } = buildComponent(mockedStore);

		const amountAuthorsCourse = container.querySelectorAll(
			"[class='author-course']"
		);
		expect(amountAuthorsCourse.length).toBe(1);
	});

	test('Should show authors course lists', () => {
		const { container } = buildComponent(mockedStore);

		const amountAuthorsInCourse = container.querySelectorAll(
			"[class='author-inCourse']"
		);
		expect(amountAuthorsInCourse.length).toBe(1);
	});

	test('Should call dispatch the action of addAuthor', () => {
		actions.addAuthor = jest.fn();

		const { container } = buildComponent(mockedStore);

		const input = container.querySelector("input[id='addAuthor']");
		fireEvent.change(input, { target: { value: 'Test Name' } });

		const button = container.querySelector(
			"[data-testid='event-createAuthor']"
		);
		expect(button).toBeInTheDocument();

		fireEvent.click(button);

		expect(actions.addAuthor).toHaveBeenCalled();
		expect(mockedStore.dispatch.mock.calls.length).toBe(1);
	});

	test('Should add author when click button', async () => {
		const { container } = buildComponent(mockedStore);

		const buttonAdd = container.querySelectorAll(
			"[data-testid='event-addAuthor']"
		);

		fireEvent.click(buttonAdd[0]);

		const authorsInCourse = container.querySelectorAll(
			"[class='author-inCourse']"
		);
		const authorsCourse = container.querySelectorAll("[class='author-course']");

		expect(authorsInCourse.length).toEqual(2);
		expect(authorsCourse.length).toEqual(0);
	});

	test('Should cancel author when click button', async () => {
		const { container } = buildComponent(mockedStore);

		const buttonAdd = container.querySelectorAll(
			"[data-testid='event-addAuthor']"
		);

		fireEvent.click(buttonAdd[0]);

		const buttonCancel = container.querySelectorAll(
			"[data-testid='event-cancelAuthor']"
		);
		fireEvent.click(buttonCancel[0]);

		const authorsInCourse = container.querySelectorAll(
			"[class='author-inCourse']"
		);

		expect(authorsInCourse.length).toEqual(1);
	});
});
