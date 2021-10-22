import { useState, useMemo } from 'react';

import { useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';

import CourseCard from '../CourseCard/CourseCard';
import Search from '../Search/Search';
import Error from '../UI/Error/Error';

function Courses() {
	const { path } = useRouteMatch();
	const [searchQuery, setSearchQuery] = useState('');
	const {
		courses: { courses },
		message: { messages },
	} = useSelector((state) => state);

	const sortedCourses = useMemo(() => {
		if (searchQuery) {
			return courses.filter(
				(course) =>
					course.title.toLowerCase().match(searchQuery) ||
					course.id.toLowerCase().match(searchQuery)
			);
		}
		return courses;
	}, [searchQuery, courses]);

	return (
		<section className='courses'>
			{messages.length > 0 && (
				<ul className='message'>
					{messages.map((message) => {
						return (
							<Error
								key={message.id}
								id={message.id}
								text={message.text}
								statusMessage={message.statusMessage}
							/>
						);
					})}
				</ul>
			)}
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
					return <CourseCard key={course.id} courseInfo={course} />;
				})
			) : (
				<div className='empty'> Matches not found, sorry</div>
			)}
		</section>
	);
}

export default Courses;
