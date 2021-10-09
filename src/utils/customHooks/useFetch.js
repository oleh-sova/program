import { useEffect } from 'react';

const useFetch = (url, setState) => {
	useEffect(() => {
		console.log('get info..');
		const getCourses = async () => {
			const response = await fetch(url);
			const data = await response.json();
			setState(data.result);
		};
		getCourses();
	}, [url, setState]);
};

export default useFetch;
