import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

import { getFormatedTime, addEllipsis } from '../../utils/utils.js';

const CourseCard = ({
	courseInfo: { title, description, creationDate, duration, authors, id },
	authorsList,
}) => {
	const { path } = useRouteMatch();

	const authorsName = authorsList.reduce((author, nextAuthor) => {
		authors.includes(nextAuthor.id) && (author += `${nextAuthor.name}; `);
		return author;
	}, '');

	return (
		<div className='courseCard'>
			<div className='row'>
				<div className='columns large-8'>
					<h2 className='courseCard__title'>{title}</h2>
					<div className='courseCard__description'>
						{addEllipsis(description, 300)}
					</div>
				</div>
				<div className='columns large-4'>
					<div className='courseCard__info'>
						<div className='auth'>
							<span>Author:</span> {authorsName}
						</div>
						<div>
							<span>Duration:</span> {getFormatedTime(duration)} hours
						</div>
						<div>
							<span>Created:</span> {creationDate}
						</div>
						<Link to={`${path}/${id}`} className='btn-g1'>
							Show course
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	courseInfo: PropTypes.object,
	authorsList: PropTypes.array,
};

export default CourseCard;
