import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getFormatedTime, getAuthorsName } from '../../utils/utils.js';

const CourseInfo = ({ courses, authorsList }) => {
	const router = useHistory();
	const { id } = useParams();

	const {
		title = '',
		description = '',
		duration = '',
		creationDate = '',
		authors = '',
	} = courses.find((course) => course.id === id) || {};

	return (
		<section className='section-loyout'>
			<div className='wrapper-section'>
				<button className='scrumblers' onClick={() => router.goBack()}>
					Back to courses
				</button>
				<h1 className='text-center'>{title}</h1>
				<div className='row expaneded'>
					<div className='columns large-8'>
						<p>{description}</p>
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
									<td>{getFormatedTime(duration)}</td>
								</tr>
								<tr>
									<td>Created:</td>
									<td>{creationDate.replace(/\//g, '.')}</td>
								</tr>
								<tr>
									<td>Authors:</td>
									<td>{getAuthorsName(authorsList, authors)}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	);
};
export default CourseInfo;
