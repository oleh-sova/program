export const initialState = {
	user: {
		token: 'token test',
		isAuth: true,
		name: 'Test Name',
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

export const mockedState = {
	getState: () => initialState,
	dispatch: jest.fn(),
	subscribe: jest.fn(),
};
