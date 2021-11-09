import React from 'react';

// eslint-disable-next-line import/order
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import { mockedState } from '../../../mocks/mockedState';
import { getRenderContainer } from '../../../utils/utils';
import Header from '../Header';

const buildComponent = (props) =>
	render(
		<Provider store={props}>
			<Header />
		</Provider>
	);

describe('testing header', () => {
	let container;

	beforeEach(() => {
		container = getRenderContainer(buildComponent(mockedState));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should render header', () => {
		const header = container.querySelector('header');
		expect(header).toBeInTheDocument();
	});

	test('should have logo in header', () => {
		const header = container.querySelector('header');
		const logo = header.querySelector('img');

		expect(header).toContainElement(logo);
	});
	test('should have name in header', () => {
		const userName = screen.queryByText('Test Name');
		expect(container).toContainElement(userName);
	});
});
