import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN:
			const { token, email, name } = action.payload;
			return { ...state, isAuth: true, name, email, token };
		case USER_LOGOUT: {
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		}
		default:
			return state;
	}
};
