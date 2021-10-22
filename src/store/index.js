import { combineReducers } from 'redux';

import { authorsReducer } from './authors/reducer';
import { coursesReducer } from './courses/reducer';
import { messageReduser } from './message/reducer';
import { userReducer } from './user/reducer';

export const rootReduser = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
	message: messageReduser,
});
