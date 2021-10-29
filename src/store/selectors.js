export const getIsAuthUser = (state) => state.user.isAuth;
export const getUserToken = (state) => state.user.token;
export const getUserName = (state) => state.user.name;
export const getUserRole = (state) => state.user.role;

export const getAuthorsStore = (state) => state.authors;
export const getCoursesStore = (state) => state.courses;
export const getMessageStore = (state) => state.message;

export const getAuthorsInCourses = (state) =>
	state.courses.courses.reduce(
		(result, course) => [...result, ...course.authors],
		[]
	);
