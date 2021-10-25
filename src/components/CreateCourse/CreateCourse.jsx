import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { getFormatedTime, FetchSend } from '../../utils/utils.js';
import Button from '../UI/Button/Button';
import Error from '../UI/Error/Error';
import Input from '../UI/Input/Input';

const CreateCourse = ({
	authorsList,
	updateComponent,
	messageForm,
	updateMessageForm,
}) => {
	const router = useHistory();
	const [authorsListClone, setAuthorsListClone] = useState([]);
	const [newAuthor, setNewAuthor] = useState({ id: '', name: '' });
	const [authorsCourse, setAuthorsCourse] = useState([]);

	const [infoCourse, setInfoCourse] = useState({
		title: '',
		description: '',
		duration: 0,
	});

	useEffect(() => {
		setAuthorsListClone(authorsList);
	}, [authorsList]);

	const handlerInfoCourse = ({ target: { name, value } }) => {
		setInfoCourse({ ...infoCourse, [name]: value });
	};

	const handlerCreateCourse = (event) => {
		event.preventDefault();
		if (
			infoCourse.title &&
			infoCourse.description &&
			infoCourse.duration > 0 &&
			authorsCourse.length > 0
		) {
			FetchSend(
				{
					id: uuidv4(),
					title: infoCourse.title,
					description: infoCourse.description,
					duration: Number(infoCourse.duration),
					creationDate: new Intl.DateTimeFormat('en-US').format(new Date()),
					authors: authorsCourse.map((item) => item.id),
				},
				'http://localhost:3000/courses/add'
			)
				.then((response) => {
					if (response.successful) {
						updateComponent('add_course');
						router.push('/courses');
					} else {
						updateMessageForm({ message: response.errors, classHtml: 'error' });
					}
				})
				.catch((e) =>
					updateMessageForm({
						message: 'Something wrong, please try later',
						classHtml: 'error',
					})
				);
		} else {
			alert('Please enter all fields');
		}
	};

	const handlerAuthorName = (event) => {
		setNewAuthor({
			name: event.target.value,
			id: uuidv4(),
		});
	};

	const hundlerCreateAuthor = () => {
		if (!newAuthor.name) return alert('Empty field, please enter name');

		const equalName = authorsListClone.find(
			(author) => author.name === newAuthor.name
		);
		if (equalName)
			return alert("Pay attention, such user's name already existing");

		FetchSend(newAuthor, 'http://localhost:3000/authors/add').then((data) =>
			alert('Author added')
		);

		updateComponent('add_author');
		setAuthorsListClone([...authorsListClone, newAuthor]);
		setNewAuthor({ name: '', id: '' });
	};

	const handlerAddAuthor = (value) => {
		const newList = authorsListClone.filter((item) => {
			if (value === item.id) {
				setAuthorsCourse([...authorsCourse, item]);
			}
			return value !== item.id;
		});
		setAuthorsListClone(newList);
	};

	const handlerDeleteAuthor = (value) => {
		const newList = authorsCourse.filter((item) => {
			value === item.id && setAuthorsListClone([...authorsListClone, item]);
			return value !== item.id;
		});
		setAuthorsCourse([...newList]);
	};
	return (
		<section className='newCourse'>
			<Error
				messageForm={messageForm.message}
				classHtml={messageForm.classHtml}
			/>
			<form onSubmit={handlerCreateCourse}>
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
								{authorsListClone.length > 0 ? (
									authorsListClone.map((author) => {
										return (
											<li key={author.id}>
												<p>{author.name}</p>
												<Button
													type='button'
													onClick={() => handlerAddAuthor(author.id)}
												>
													Add author
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
									authorsCourse.map((item) => {
										return (
											<li key={item.id}>
												<p>{item.name}</p>
												<Button
													type='button'
													onClick={() => handlerDeleteAuthor(item.id)}
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

CreateCourse.propTypes = {
	authorsList: PropTypes.array,
	updateComponent: PropTypes.func,
	messageForm: PropTypes.object,
	updateMessageForm: PropTypes.func,
};

export default CreateCourse;
