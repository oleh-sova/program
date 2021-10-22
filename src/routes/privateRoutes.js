import { lazy } from 'react';

const routes = [
	{
		path: 'courses',
		component: lazy(() => import('../components/Courses/Courses')),
		exact: true,
	},
	{
		path: 'courses/add',
		component: lazy(() => import('../components/CreateCourse/CreateCourse')),
		exact: false,
	},
	{
		path: 'courses/:id',
		component: lazy(() => import('../components/CourseInfo/CourseInfo')),
		exact: false,
	},
];

export default routes;
