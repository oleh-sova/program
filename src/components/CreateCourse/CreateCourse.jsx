import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
	addAuthor,
	addAuthorToCourse,
	clearAuthorCourse,
	deleteAuthorToCourse,
	getAuthors,
} from '../../store/authors/actionsCreators.js';
import { addNewCourse } from '../../store/courses/actionsCreators.js';
import { showError } from '../../store/errors/actionsCreators.js';
import { getAlertStore, getAuthorsStore } from '../../store/selectors.js';
import { sendDataAPI } from '../../utils/API/api.js';
import { getFormatedTime } from '../../utils/utils.js';
import Button from '../UI/Button/Button';
import Error from '../UI/Error/Error';
import Input from '../UI/Input/Input';

const CreateCourse = () => {
	const { push } = useHistory();
	const dispatch = useDispatch();

	const { authorsCourse, authors } = useSelector(getAuthorsStore);
	const { alert } = useSelector(getAlertStore);

	const tokenLocal = localStorage.getItem('token');

	const [newAuthor, setNewAuthor] = useState({ name: '' });
	const [infoCourse, setInfoCourse] = useState({
		title: '',
		description: '',
		duration: 0,
	});

	const handlerInfoCourse = ({ target: { name, value } }) => {
		setInfoCourse({ ...infoCourse, [name]: value });
	};

	const handlerSubmitForm = (event) => {
		event.preventDefault();

		const urlAddCourse = 'http://localhost:3000/courses/add';
		const course = {
			title: infoCourse.title,
			description: infoCourse.description,
			duration: Number(infoCourse.duration),
			creationDate: new Intl.DateTimeFormat('en-US').format(new Date()),
			authors: authorsCourse.map((item) => item.id),
		};
		const isFormValid =
			infoCourse.title &&
			infoCourse.description &&
			infoCourse.duration > 0 &&
			authorsCourse.length > 0;
		if (isFormValid) {
			sendDataAPI(urlAddCourse, course, tokenLocal).then((data) => {
				dispatch(addNewCourse(data.result));
				dispatch(clearAuthorCourse());
				push('/courses');
			});
		} else {
			dispatch(showError('Please enter all fields'));
		}
	};

	const handlerAuthorName = (event) => {
		setNewAuthor({
			name: event.target.value,
		});
	};

	const hundlerCreateAuthor = () => {
		if (!newAuthor.name) {
			dispatch(showError('Empty field, please enter name'));
			return;
		}

		if (authors.find((author) => author.name === newAuthor.name)) {
			dispatch(showError("Pay attention, such user's name already existing"));
			return;
		}
		sendDataAPI(
			'http://localhost:3000/authors/add',
			newAuthor,
			tokenLocal
		).then(({ successful, result }) => {
			if (successful) {
				dispatch(addAuthor(result));
			}
		});

		setNewAuthor({ name: '' });
	};

	const handlerAddAuthor = (authorId) => {
		dispatch(addAuthorToCourse(authorId));
	};

	const handlerDeleteAuthor = (authorId) => {
		dispatch(deleteAuthorToCourse(authorId));
	};

	const Test = () => {
		dispatch(getAuthors());
	};

	return (
		<section className='newCourse'>
			{alert && <Error text={alert} />}
			<form onSubmit={handlerSubmitForm}>
				<div className='row align-justify expanded'>
					<div className='columns large-3'>
						<label htmlFor='title'>Title:</label>
						<Input
							id='title'
							name='title'
							value={infoCourse.title}
							onChange={handlerInfoCourse}
							placeholder='Enter title...'
						/>
					</div>
					<div className='columns large-3 align-self-right align-self-bottom'>
						<Button>Create course</Button>
						<Button type='button ' onClick={Test}>
							Test
						</Button>
					</div>
				</div>
				<div className='row expanded'>
					<div className='columns large-12'>
						<label htmlFor='description'>Description:</label>
						<textarea
							id='description'
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
								id='addAuthor'
								value={newAuthor.name}
								onChange={handlerAuthorName}
								placeholder='Enter author name...'
							/>
							<Button type='button' onClick={hundlerCreateAuthor}>
								Create author
							</Button>
						</div>
					</div>
					<div className='columns large-6'>
						<div className='wrpList wrpList--wait'>
							<h4 className='text-center'>Author</h4>
							<ul>
								{authors.length > 0 ? (
									authors.map((author) => {
										return (
											<li key={author.id}>
												<p>{author.name}</p>
												<Button
													type='button'
													onClick={() => handlerAddAuthor(author.id)}
												>
													Add author1
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
							<label htmlFor='addDuratiom'>Duration</label>
							<Input
								type='number'
								id='duration'
								name='duration'
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
								{authorsCourse.length > 0 ? (
									authorsCourse.map((author) => {
										return (
											<li key={author.id}>
												<p>{author.name}</p>
												<Button
													type='button'
													onClick={() => handlerDeleteAuthor(author.id)}
												>
													Delete author
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
