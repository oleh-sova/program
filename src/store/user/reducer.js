import { USER_LOGIN, USER_REGISTRATION } from './actionTypes';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_REGISTRATION:
			console.log('user register');
			return state;
		case USER_LOGIN:
			const {
				result: token,
				user: { email, name },
			} = action.payload;
			return { ...state, isAuth: true, name, email, token };
		default:
			return state;
	}
};
