import CourseCard from '../CourseCard/CourseCard';
import Search from '../Search/Search';
import CreateCourse from '../CreateCourse/CreateCourse.jsx';
import { useState, useMemo } from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import CourseInfo from '../CourseInfo/CourseInfo';
import useFetch from '../../utils/customHooks/useFetch.js';

function Courses({ upfateCoursesState, updateAuthorsState }) {
	const { path } = useRouteMatch();
	const [searchQuery, setSearchQuery] = useState('');
	const [coursesList, setCoursesList] = useState([]);
	const [authorsList, setAuthorsList] = useState([]);
	useFetch('http://localhost:3000/courses/all', setCoursesList);
	useFetch('http://localhost:3000/authors/all', setAuthorsList);

	const sortedCourses = useMemo(() => {
		if (searchQuery) {
			return coursesList.filter(
				(course) =>
					course.title.toLowerCase().match(searchQuery) ||
					course.id.toLowerCase().match(searchQuery)
			);
		}
		return coursesList;
	}, [searchQuery, coursesList]);

	const updateCoursesState = (newCourse) => {
		setCoursesList([...coursesList, newCourse]);
	};
	const updateAuthorState = (newAuthor) => {
		setAuthorsList([...authorsList, newAuthor]);
	};

	return (
		<Switch>
			<Route exact path={`${path}`}>
				<section className='courses'>
					<div className='row'>
						<div className='columns large-9'>
							<Search
								getSearchQuery={(searchString) => setSearchQuery(searchString)}
							/>
						</div>
						<div className='columns large-3'>
							<Link to={`${path}/add`} className='btn-g1'>
								Add new course
							</Link>
						</div>
					</div>
					{sortedCourses.length >= 1 ? (
						sortedCourses.map((course) => {
							return (
								<CourseCard
									key={course.id}
									courseInfo={course}
									authorsList={authorsList}
								/>
							);
						})
					) : (
						<div className='empty'> Matches not found, sorry</div>
					)}
				</section>
			</Route>
			<Route exact path={`${path}/add`}>
				<CreateCourse
					updateCoursesState={updateCoursesState}
					updateAuthorState={updateAuthorState}
					authorsList={authorsList}
				/>
			</Route>
			<Route path={`${path}/:id`}>
				<CourseInfo courses={sortedCourses} authorsList={authorsList} />
			</Route>
		</Switch>
	);
}

export default Courses;
