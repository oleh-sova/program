export const getFormatedTime = (m) => {
	const hour = Math.floor(m / 60);
	const mins = m - hour * 60;

	const checkTime = (n) => (n < 10 ? `0${n}` : `${n}`);

	return ` ${checkTime(hour)}:${checkTime(mins)} hours`;
};

export const addEllipsis = (text, amountSymbols) => {
	const createArr = text.split('');
	if (createArr.length >= amountSymbols) {
		let text = createArr.slice(0, amountSymbols - 1);
		text.push('...');
		return text.join('');
	}
	return text;
};

export const getAuthorsName = (authorsList, authors) => {
	return authorsList.reduce((author, nextAuthor) => {
		authors.includes(nextAuthor.id) && (author += `${nextAuthor.name}; `);
		return author;
	}, '');
};

export const getAuthorsInfo = (authorsList, authors) => {
	return authorsList.reduce((author, nextAuthor) => {
		authors.includes(nextAuthor.id) && (author = [...author, nextAuthor]);
		return author;
	}, []);
};

export const clearAuthorList = (authorsList, authors) =>
	authorsList.reduce((result, author) => {
		!authors.includes(author.id) && (result = [...result, author]);
		return result;
	}, []);
