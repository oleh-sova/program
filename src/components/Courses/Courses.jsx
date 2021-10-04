import CourseCard from '../CourseCard/CourseCard';
import Search from '../Search/Search';
import { useState } from 'react';

function Courses(props) {
	const { infoCourses, infoAuthor, showCB, filterTime } = props;
	const [courses, setCourses] = useState(infoCourses);

	const searchCB = (value) => {
		const searchString = value.trim().toLowerCase();

		let filterCourses = infoCourses.filter((item) => {
			return (
				item.title.toLowerCase().match(searchString) ||
				item.id.toLowerCase().match(searchString)
			);
		});
		if (value) {
			setCourses(filterCourses);
		} else {
			setCourses(infoCourses);
		}
	};
	return (
		<section className='courses'>
			<div className='row'>
				<div className='columns large-10'>
					<Search searchCB={searchCB} />
				</div>
				<div className='columns large-2'>
					<button className='btn' onClick={() => showCB(false)}>
						Add new course
					</button>
				</div>
			</div>
			{courses.length >= 1 ? (
				courses.map((item) => {
					return (
						<CourseCard
							key={item.id}
							value={item}
							infoAuthor={infoAuthor}
							filterTime={filterTime}
						/>
					);
				})
			) : (
				<div className='empty'> Matches not found, sorry</div>
			)}
		</section>
	);
}

export default Courses;
