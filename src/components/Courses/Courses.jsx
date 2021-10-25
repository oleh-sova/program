import { useState, useMemo } from 'react';

import PropTypes from 'prop-types';
import { useRouteMatch, Link } from 'react-router-dom';

import CourseCard from '../CourseCard/CourseCard';
import Search from '../Search/Search';

function Courses({ authorsList, coursesList }) {
	const { path } = useRouteMatch();
	const [searchQuery, setSearchQuery] = useState('');

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

	return (
		<section className='courses'>
			<div className='row'>
				<div className='columns large-9'>
					<Search
						getSearchQuery={(searchString) => setSearchQuery(searchString)}
						searchQuery={searchQuery}
					/>
				</div>
				<div className='columns large-3'>
					<Link to={`${path}/add`} className='btn-g1'>
						Add new course
					</Link>
				</div>
			</div>
			{sortedCourses.length > 0 ? (
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
	);
}

Courses.propTypes = {
	authorsList: PropTypes.array,
	coursesList: PropTypes.array,
};

export default Courses;
