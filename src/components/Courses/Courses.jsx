import { useState, useMemo } from 'react';

import { useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';

import { getAuthors } from '../../store/authors/actionsCreators';
import { getCourses } from '../../store/courses/actionsCreators';
import {
	getCoursesStore,
	getMessageStore,
	getUserStore,
} from '../../store/selectors';
import useFetch from '../../utils/customHooks/useFetch';
import CourseCard from '../CourseCard/CourseCard';
import Search from '../Search/Search';
import Message from '../UI/Message/Message';

function Courses() {
	useFetch(getCourses);
	useFetch(getAuthors);
	const { path } = useRouteMatch();
	const [searchQuery, setSearchQuery] = useState('');

	const { messages } = useSelector(getMessageStore);
	const { role } = useSelector(getUserStore);
	const { courses } = useSelector(getCoursesStore);

	const isAdmin = role === 'admin' && true;

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
			{!!messages.length && (
				<ul className='message'>
					{messages.map((message) => {
						return (
							<Message
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
					{isAdmin && (
						<Link to={`${path}/add`} className='btn-g1'>
							Add new course
						</Link>
					)}
				</div>
			</div>
			{!!sortedCourses.length ? (
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
