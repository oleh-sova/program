import PropTypes from 'prop-types';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

function Search({ getSearchQuery, searchQuery }) {
	const handlerSubmit = (event) => {
		event.preventDefault();
		searchQuery && getSearchQuery(searchQuery);
	};

	const handlerInput = (event) => {
		getSearchQuery(event.target.value);
	};

	return (
		<div className='search'>
			<form onSubmit={handlerSubmit}>
				<Input
					value={searchQuery}
					onChange={handlerInput}
					placeholder='Enter course name or id...'
				/>
				<Button>Search</Button>
			</form>
		</div>
	);
}

Search.propTypes = {
	searchQuery: PropTypes.string,
	getSearchQuery: PropTypes.func,
};

export default Search;
