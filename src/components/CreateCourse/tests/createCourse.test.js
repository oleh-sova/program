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

import { getRenderContainer } from '../../../utils/utils';
import CreateCourse from '../CreateCourse';
// eslint-disable-next-line import/order
import { mockedState } from '../../../mocks/mockedState';

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
	let container;

	beforeEach(() => {
		container = getRenderContainer(buildComponent(mockedState));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('Should show authors lists', () => {
		const amountAuthorsCourse = container.querySelectorAll(
			"[class='author-course']"
		);
		expect(amountAuthorsCourse).toHaveLength(1);
	});

	test('Should show authors course lists', () => {
		const amountAuthorsInCourse = container.querySelectorAll(
			"[class='author-inCourse']"
		);
		expect(amountAuthorsInCourse).toHaveLength(1);
	});

	test('Should call dispatch the action of addAuthor', () => {
		actions.addAuthor = jest.fn();

		const input = container.querySelector("input[id='addAuthor']");
		fireEvent.change(input, { target: { value: 'Test Name' } });

		const button = container.querySelector(
			"[data-testid='event-createAuthor']"
		);
		expect(button).toBeInTheDocument();

		fireEvent.click(button);

		expect(actions.addAuthor).toHaveBeenCalled();
		expect(mockedState.dispatch.mock.calls).toHaveLength(1);
	});

	test('Should add author when click button', async () => {
		const buttonAdd = container.querySelectorAll(
			"[data-testid='event-addAuthor']"
		);

		fireEvent.click(buttonAdd[0]);

		const authorsInCourse = container.querySelectorAll(
			"[class='author-inCourse']"
		);
		const authorsCourse = container.querySelectorAll("[class='author-course']");

		expect(authorsInCourse).toHaveLength(2);
		expect(authorsCourse).toHaveLength(0);
	});

	test('Should cancel author when click button', async () => {
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

		expect(authorsInCourse).toHaveLength(1);
	});
});
