import { useState, useEffect } from 'react';

function Search(props) {
	const [value, setValue] = useState('');

	useEffect(() => {
		const searchString = value.trim().toLowerCase();
		let arr = props.infoCourses.filter((item) => {
			return (
				item.title.toLowerCase().match(searchString) ||
				item.id.toLowerCase().match(searchString)
			);
		});
		props.returnBuild(arr);
	}, [value]);

	const handleSubmit = (event) => {
		event.preventDefault();
		value.length < 1 && alert('Empty value, please enter something');
		props.infoCourses.length < 1 &&
			alert("Sorry, but i don't have anything for you:(");
	};
	const handleInput = (event) => {
		setValue(event.target.value);
	};

	return (
		<div className='search'>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={value}
					onChange={handleInput}
					placeholder='Enter course name or id...'
				/>
				<button type='submit'>Search</button>
			</form>
		</div>
	);
}

export default Search;
