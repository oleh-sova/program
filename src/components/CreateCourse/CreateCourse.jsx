import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function CreateCourse(props) {
	const [clone, setClone] = useState(props.authorsList);
	const [localAuthor, setLocalAuthor] = useState({ id: '', name: '' });
	const [info, setInfo] = useState({
		title: '',
		description: '',
		duration: 0,
	});
	const [authorCourse, setAuthorCourse] = useState([]);
	const handlerSubmit = (event) => {
		event.preventDefault();
		if (
			info.title &&
			info.description &&
			info.duration > 0 &&
			authorCourse.length > 0 &&
			clone[0].name
		) {
			props.add({
				id: uuidv4(),
				...info,
				creationDate: new Intl.DateTimeFormat('en-US').format(new Date()),
				authors: authorCourse.map((item) => item.id),
			});
			props.showBack(true);
		} else {
			alert('Please enter all fields');
		}
	};
	// Add author
	const handlerAuthor = (event) => {
		setLocalAuthor({
			id: uuidv4(),
			name: event.target.value,
		});
	};

	const AddAuthorTo = () => {
		const error = "Pay attention, such user's name already existing";
		clone.forEach((item) => {
			if (item.name.includes(localAuthor.name)) {
				alert(error);
				throw error;
			}
		});
		props.authorsAdd(localAuthor);
		setClone([...clone, localAuthor]);
		setLocalAuthor({ name: '', id: '' });
	};
	const handlerChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInfo({ ...info, [name]: value });
	};
	const handlerAdAt = (value) => {
		const newList = clone.filter((item) => {
			if (value === item.id) {
				setAuthorCourse([...authorCourse, item]);
			}
			return value !== item.id;
		});
		setClone(newList);
	};
	const handlerDelete = (value) => {
		const newList = authorCourse.filter((item) => {
			value === item.id && setClone([...clone, item]);
			return value !== item.id;
		});
		setAuthorCourse([...newList]);
	};
	return (
		<section className='newCourse'>
			<form action='' onSubmit={handlerSubmit}>
				<div className='row align-justify expanded'>
					<div className='columns large-3'>
						<label htmlFor='title'>Title:</label>
						<input
							type='text'
							id='title'
							name='title'
							velue={info.title}
							onChange={handlerChange}
							placeholder='Enter title...'
						/>
					</div>
					<div className='columns large-3 align-self-right align-self-bottom'>
						<button type='submit' className='btn'>
							Create course
						</button>
					</div>
				</div>
				<div className='row expanded'>
					<div className='columns large-12'>
						<label htmlFor='description'>Description:</label>
						<textarea
							id='description'
							onChange={handlerChange}
							name='description'
						></textarea>
					</div>
				</div>
				<div className='row expanded'>
					<div className='columns large-6'>
						<div className='wrpList'>
							<h4 className='text-center'>Add author</h4>
							<label htmlFor='addAuthor'>Author name</label>
							<input
								type='text'
								id='addAuthor'
								value={localAuthor.name}
								onChange={handlerAuthor}
								placeholder='Enter author name...'
							/>
							<button type='button' className='btn' onClick={AddAuthorTo}>
								Create author
							</button>
						</div>
					</div>
					<div className='columns large-6'>
						<div className='wrpList wrpList--wait'>
							<h4 className='text-center'>Author</h4>
							<ul>
								{clone.length > 0 ? (
									clone.map((author) => {
										return (
											<li key={author.id}>
												<p>{author.name}</p>
												<button
													type='button'
													onClick={() => handlerAdAt(author.id)}
												>
													Add author
												</button>
											</li>
										);
									})
								) : (
									<div className='text-center'>Author list is empty</div>
								)}
								{}
							</ul>
						</div>
					</div>
				</div>
				<div className='row expanded'>
					<div className='columns large-6'>
						<div className='wrpList'>
							<h4 className='text-center'>Duration</h4>
							<label htmlFor='addDuratiom'>Duration</label>
							<input
								type='number'
								id='duration'
								name='duration'
								onChange={handlerChange}
								placeholder='Enter duration in minutes...'
							/>
							<p>
								Duration:
								{info.duration > 0
									? props.changeTime(info.duration)
									: ` 00:00 `}
								hours
							</p>
						</div>
					</div>
					<div className='columns large-6'>
						<div className='wrpList wrpList--delete'>
							<h4 className='text-center'>Course author</h4>
							<ul>
								{authorCourse.length > 0 ? (
									authorCourse.map((item) => {
										return (
											<li key={item.id}>
												<p>{item.name}</p>
												<button
													type='button'
													onClick={() => handlerDelete(item.id)}
												>
													Delete author
												</button>
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
}

export default CreateCourse;
