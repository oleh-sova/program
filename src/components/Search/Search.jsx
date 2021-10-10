import { useRef } from 'react';
import Button from '../UI/Button/Button';

function Search({ getSearchQuery }) {
	const valueInput = useRef(null);

	const handlerSubmit = (event) => {
		event.preventDefault();
		!valueInput.current.value && alert('Please, enter something for the query');
	};
	const handlerInput = (event) => {
		getSearchQuery(event.target.value);
	};

	return (
		<div className='search'>
			<form onSubmit={handlerSubmit}>
				<input
					type='text'
					ref={valueInput}
					onChange={handlerInput}
					placeholder='Enter course name or id...'
				/>
				<Button>Search</Button>
			</form>
		</div>
	);
}

export default Search;
