import PropTypes from 'prop-types';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsPencilFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import { deleteCourse } from '../../store/courses/actionsCreators.js';
import { getAuthorsStore, getUserStore } from '../../store/selectors.js';
import { deleteDataAPI } from '../../utils/API/api.js';
import { getFormatedTime, addEllipsis } from '../../utils/utils.js';
import Button from '../UI/Button/Button';

const CourseCard = ({
	courseInfo: { title, description, creationDate, duration, authors, id },
}) => {
	const { path } = useRouteMatch();
	const dispatch = useDispatch();

	const { authors: authorsList } = useSelector(getAuthorsStore);
	const { token } = useSelector(getUserStore);

	const authorsName = authorsList.reduce((author, nextAuthor) => {
		authors.includes(nextAuthor.id) && (author += `${nextAuthor.name}; `);
		return author;
	}, '');

	const handlerDeleteCourse = () => {
		deleteDataAPI('http://localhost:3000/courses/', id, token).then(
			({ successful }) => {
				if (successful) {
					dispatch(deleteCourse(id));
				}
			}
		);
	};

	const handlerChangeCourse = () => {};
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
						<div className='wrapper-btn'>
							<Link to={`${path}/${id}`} className='btn-g1'>
								Show course
							</Link>
							<Button handler={handlerDeleteCourse}>
								<AiTwotoneDelete />
							</Button>
							<Button handler={handlerChangeCourse}>
								<BsPencilFill />
							</Button>
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
