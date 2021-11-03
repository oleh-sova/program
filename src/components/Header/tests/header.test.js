import React from 'react';

// eslint-disable-next-line import/order
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import Header from '../Header';

const buildComponent = (props) =>
	render(
		<Provider store={props}>
			<Header />
		</Provider>
	);

describe('testing header', () => {
	const mockedState = {
		user: {
			isAuth: true,
			name: 'Test Name',
		},
	};
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};

	test('should render header', () => {
		const { container } = buildComponent(mockedStore);
		const header = container.querySelector('header');
		expect(header).toBeInTheDocument();
	});

	test('should have logo in header', () => {
		const { container } = buildComponent(mockedStore);
		const header = container.querySelector('header');
		const logo = header.querySelector('img');

		expect(header).toContainElement(logo);
	});
	test('should have name in header', () => {
		const { container } = buildComponent(mockedStore);
		const userName = screen.queryByText('Test Name');
		expect(container).toContainElement(userName);
	});
});
