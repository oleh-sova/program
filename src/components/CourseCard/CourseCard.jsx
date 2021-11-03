import PropTypes from 'prop-types';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsPencilFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import { deleteCourse } from '../../store/courses/actionsCreators.js';
import {
	getAuthorsStore,
	getUserRole,
	getUserToken,
} from '../../store/selectors.js';
import {
	getFormatedTime,
	addEllipsis,
	authorNameFilter,
} from '../../utils/utils.js';
import Button from '../UI/Button/Button';

const CourseCard = ({
	courseInfo: { title, description, creationDate, duration, authors, id },
}) => {
	const { path } = useRouteMatch();
	const dispatch = useDispatch();

	const authorsList = useSelector(getAuthorsStore);
	const token = useSelector(getUserToken);
	const userRole = useSelector(getUserRole);

	const isAdmin = userRole === 'admin';

	const handlerDeleteCourse = () => {
		dispatch(deleteCourse(id, token));
	};

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
							<span>Author:</span>{' '}
							<span data-testid='authors'>
								{' '}
								{authorNameFilter(authorsList, authors)}
							</span>
						</div>
						<div>
							<span>Duration:</span> {getFormatedTime(duration)} hours
						</div>
						<div>
							<span>Created:</span>{' '}
							<span data-testid='date'>{creationDate}</span>
						</div>
						<div className='wrapper-btn'>
							<Link to={`${path}/${id}`} className='btn-g1'>
								Show course
							</Link>
							{isAdmin && (
								<>
									<Link to={`${path}/update/${id}`} className='update-button'>
										<BsPencilFill />
									</Link>
									<Button handler={handlerDeleteCourse}>
										<AiTwotoneDelete />
									</Button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	courseInfo: PropTypes.object,
};

export default CourseCard;
