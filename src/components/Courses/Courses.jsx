import CourseCard from '../CourseCard/CourseCard';
import Search from '../Search/Search';
import { useState } from 'react';

function Courses(props) {
	const [build, setBuild] = useState(props.infoCourses);

	const returnBuild = (value) => {
		setBuild(value);
	};
	return (
		<section className='courses'>
			<div className='row'>
				<div className='columns large-10'>
					<Search infoCourses={props.infoCourses} returnBuild={returnBuild} />
				</div>
				<div className='columns large-2'>
					<button className='btn' onClick={() => props.showBack(false)}>
						Add new course
					</button>
				</div>
			</div>
			{build.map((item) => {
				return (
					<CourseCard
						key={item.id}
						value={item}
						infoAuth={props.infoAuthor}
						changeTime={props.changeTime}
					/>
				);
			})}
		</section>
	);
}

export default Courses;
