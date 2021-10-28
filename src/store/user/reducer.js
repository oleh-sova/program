import {
	USER_LOGIN,
	USER_LOGOUT,
	USER_REGISTRATION,
	USER_ROLE,
} from './actionTypes';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
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
		case USER_ROLE: {
			let { name, email, role, token } = action.payload;
			return {
				...state,
				isAuth: true,
				name,
				email,
				token,
				role,
			};
		}
		case USER_LOGOUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
				role: '',
			};
		default:
			return state;
	}
};
