function CourseCard(props) {
	const { title, description, creationDate, duration, authors } = props.value;
	const infoAuthor = props.infoAuth;

	const name = infoAuthor
		.filter((auth) => authors.includes(auth.id))
		.map((obj) => obj.name)
		.join(', ');

	const addElipsis = (text, amountSymbols) => {
		const createArr = text.split('');
		if (createArr.length >= amountSymbols) {
			let i = createArr.slice(0, amountSymbols - 1);
			i.push('...');
			return i.join('');
		}
		return text;
	};
	return (
		<div className='courseCard'>
			<div className='row'>
				<div className='columns large-8'>
					<h2 className='courseCard__title'>{title}</h2>
					<div className='courseCard__description'>
						{addElipsis(description, 300)}
					</div>
				</div>
				<div className='columns large-4'>
					<div className='courseCard__info'>
						<div className='auth'>
							<span>Author:</span> {name}
						</div>
						<div>
							<span>Duration:</span> {props.changeTime(duration)} hours
						</div>
						<div>
							<span>Created:</span> {creationDate}
						</div>
						<button>Show course</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CourseCard;
