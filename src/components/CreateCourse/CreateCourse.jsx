import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {
	addAuthor,
	deletelAuthor,
} from '../../store/authors/actionsCreators.js';
import {
	addNewCourse,
	updateCourse,
} from '../../store/courses/actionsCreators.js';
import { isOpenMessage } from '../../store/message/actionsCreators.js';
import {
	getAuthorsStore,
	getCoursesStore,
	getMessageStore,
	getAuthorsInCourses,
	getUserToken,
} from '../../store/selectors.js';
import {
	clearAuthors,
	getFormatedTime,
	sortAuthors,
} from '../../utils/utils.js';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Message from '../UI/Message/Message';

const CreateCourse = () => {
	const { push, goBack } = useHistory();
	const dispatch = useDispatch();

	const { id } = useParams();

	const { messages } = useSelector(getMessageStore);
	const token = useSelector(getUserToken);
	const { courses } = useSelector(getCoursesStore);
	const authors = useSelector(getAuthorsStore);
	const authorsInCourses = useSelector(getAuthorsInCourses);

	const [newAuthor, setNewAuthor] = useState({ name: '' });
	const [infoCourse, setInfoCourse] = useState({
		title: '',
		description: '',
		duration: 0,
	});

	const [authorCourse, setAuthorCourse] = useState([]);
	const [authorsList, setAuthorsList] = useState([]);

	useEffect(() => {
		setAuthorsList(
			clearAuthors(
				authors,
				authorCourse.map(({ id }) => id)
			)
		);
	}, [authors, authorCourse]);

	/// update course
	useEffect(() => {
		if (id) {
			const [currentCurse] = courses.filter((course) => {
				return course.id === id;
			});

			const authorsInCourse = sortAuthors(authors, currentCurse.authors);

			setAuthorCourse(authorsInCourse);
			setInfoCourse({
				title: currentCurse.title,
				description: currentCurse.description,
				duration: currentCurse.duration,
			});
		}
	}, [id, courses, authors]);
	///

	const handlerInfoCourse = ({ target: { name, value } }) => {
		setInfoCourse({ ...infoCourse, [name]: value });
	};

	const handlerSubmitForm = (event) => {
		event.preventDefault();

		const course = {
			title: infoCourse.title,
			description: infoCourse.description,
			duration: Number(infoCourse.duration),
			creationDate: new Intl.DateTimeFormat('en-US').format(new Date()),
			authors: authorCourse.map((item) => item.id),
		};
		const isFormValid =
			infoCourse.title &&
			infoCourse.description &&
			infoCourse.duration > 0 &&
			authorCourse.length > 0;

		if (!isFormValid) {
			return dispatch(isOpenMessage('Please enter all fields'));
		}

		if (id) {
			dispatch(updateCourse(id, course, token, push));
		} else {
			dispatch(addNewCourse(course, token, push));
		}
	};

	const hundlerCreateAuthor = () => {
		const authorName = newAuthor?.name;

		if (!authorName) {
			return dispatch(isOpenMessage('Empty field, please enter name'));
		}

		if (
			authors.find(({ name }) => name === authorName) ||
			authorCourse.find(({ name }) => name === authorName)
		) {
			return dispatch(
				isOpenMessage("Pay attention, such user's name already existing")
			);
		}

		dispatch(addAuthor(newAuthor, token));

		setNewAuthor({ name: '' });
	};

	const handlerDeleteAuthor = (authorId) => {
		if (authorsInCourses.includes(authorId)) {
			return dispatch(
				isOpenMessage('Sorry, but current user already uses in some course')
			);
		}
		dispatch(deletelAuthor(authorId, token));
	};

	const handlerAddAuthor = (authorId) => {
		const newList = authorsList.filter((author) => {
			if (authorId === author.id) {
				setAuthorCourse([...authorCourse, author]);
			}
			return authorId !== author.id;
		});
		setAuthorsList(newList);
	};

	const handlerCancelAuthor = (authorId) => {
		const newList = authorCourse.filter((author) => {
			authorId === author.id && setAuthorsList([...authorsList, author]);
			return authorId !== author.id;
		});
		setAuthorCourse(newList);
	};

	return (
		<section className='newCourse' data-testid='newCourse'>
			{messages.length > 0 && (
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
			<form onSubmit={handlerSubmitForm}>
				<div className='row align-justify expanded'>
					<div className='columns large-3'>
						<Input
							id='title'
							name='title'
							value={infoCourse.title}
							onChange={handlerInfoCourse}
							placeholder='Enter title...'
						/>
					</div>
					<div className='columns large-3 align-self-right align-self-bottom'>
						{id ? (
							<Button>Udate course</Button>
						) : (
							<Button>Create course</Button>
						)}
						<Button
							className='scrumblers'
							type='button'
							onClick={() => goBack()}
						>
							Back to courses
						</Button>
					</div>
				</div>
				<div className='row expanded'>
					<div className='columns large-12'>
						<label htmlFor='description'>Description:</label>
						<textarea
							id='description'
							value={infoCourse.description}
							onChange={handlerInfoCourse}
							name='description'
						></textarea>
					</div>
				</div>
				<div className='row expanded'>
					<div className='columns large-6'>
						<div className='wrpList'>
							<h4 className='text-center'>Add author</h4>
							<label htmlFor='addAuthor'>Author name</label>
							<Input
								withLabel={false}
								id='addAuthor'
								value={newAuthor.name}
								onChange={({ target: { value } }) =>
									setNewAuthor({
										name: value,
									})
								}
								placeholder='Enter author name...'
							/>
							<Button
								type='button'
								onClick={hundlerCreateAuthor}
								data-testid='event-createAuthor'
							>
								Create author
							</Button>
						</div>
					</div>
					<div className='columns large-6'>
						<div className='wrpList wrpList--wait'>
							<h4 className='text-center'>Author</h4>
							<ul>
								{!!authorsList.length ? (
									authorsList.map((author) => {
										return (
											<li key={author.id} className='author-course'>
												<p>{author.name}</p>
												<Button
													data-testid='event-addAuthor'
													type='button'
													onClick={() => handlerAddAuthor(author.id)}
												>
													Add author
												</Button>
												<Button
													type='button'
													onClick={() => handlerDeleteAuthor(author.id)}
												>
													Delete
												</Button>
											</li>
										);
									})
								) : (
									<div className='text-center'>Author list is empty</div>
								)}
							</ul>
						</div>
					</div>
				</div>
				<div className='row expanded'>
					<div className='columns large-6'>
						<div className='wrpList'>
							<h4 className='text-center'>Duration</h4>
							<Input
								type='number'
								id='duration'
								name='duration'
								value={infoCourse.duration}
								onChange={handlerInfoCourse}
								placeholder='Enter duration in minutes...'
							/>
							<p>
								Duration:
								{infoCourse.duration > 0
									? getFormatedTime(infoCourse.duration)
									: ` 00:00 `}
								hours
							</p>
						</div>
					</div>
					<div className='columns large-6'>
						<div className='wrpList wrpList--delete'>
							<h4 className='text-center'>Course author</h4>
							<ul>
								{!!authorCourse.length ? (
									authorCourse.map(({ id, name }) => {
										return (
											<li key={id} className='author-inCourse'>
												<p>{name}</p>
												<Button
													type='button'
													onClick={() => handlerCancelAuthor(id)}
													data-testid='event-cancelAuthor'
												>
													Cancel author
												</Button>
											</li>
										);
									})
								) : (
									<div className='text-center'>
										Please, add authors to the course list
									</div>
								)}
							</ul>
						</div>
					</div>
				</div>
			</form>
		</section>
	);
};

export default CreateCourse;
