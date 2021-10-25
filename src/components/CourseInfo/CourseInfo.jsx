import React from 'react';

import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import { getFormatedTime, getAuthorsName } from '../../utils/utils.js';
import Button from '../UI/Button/Button.jsx';

const CourseInfo = ({ courses, authorsList }) => {
	const router = useHistory();
	const { id } = useParams();

	const course = courses.find((course) => course.id === id) || null;

	const patternCourse = (
		<>
			<h1 className='text-center'>{course && course.title}</h1>
			<div className='row expaneded'>
				<div className='columns large-8'>
					<p>{course && course.description}</p>
				</div>
				<div className='columns large-4'>
					<table>
						<tbody>
							<tr>
								<td>ID:</td>
								<td>{id}</td>
							</tr>
							<tr>
								<td>Duration:</td>
								<td>{course && getFormatedTime(course.duration)}</td>
							</tr>
							<tr>
								<td>Created:</td>
								<td>{course && course.creationDate.replace(/\//g, '.')}</td>
							</tr>
							<tr>
								<td>Authors:</td>
								<td>{course && getAuthorsName(authorsList, course.authors)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);

	return (
		<section className='section-loyout'>
			<div className='wrapper-section'>
				<Button className='scrumblers' onClick={() => router.goBack()}>
					Back to courses
				</Button>
				{course ? (
					patternCourse
				) : (
					<div> Can't find any course with given id </div>
				)}
			</div>
		</section>
	);
};

CourseInfo.propTypes = {
	courses: PropTypes.array,
	coursesList: PropTypes.array,
};
export default CourseInfo;
