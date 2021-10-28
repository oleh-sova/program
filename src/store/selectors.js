export const getUserStore = (state) => state.user;
export const getAuthorsStore = (state) => state.authors;
export const getCoursesStore = (state) => state.courses;
export const getMessageStore = (state) => state.message;

export const getAuthorsInCourses = (state) =>
	state.courses.courses.reduce(
		(result, course) => [...result, ...course.authors],
		[]
	);
