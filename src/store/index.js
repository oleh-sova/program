import { combineReducers } from 'redux';

import { authorsReducer } from './authors/reducer';
import { coursesReducer } from './courses/reducer';
import { errorsReduser } from './errors/reducer';
import { userReducer } from './user/reducer';

export const rootReduser = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
	alert: errorsReduser,
});
