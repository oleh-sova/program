import { useEffect } from 'react';

const useFetch = (url, setState, udatingComponent) => {
	useEffect(() => {
		console.log('get info..');
		const getCourses = async () => {
			const response = await fetch(url);
			const data = await response.json();
			setState(data.result);
		};
		getCourses();
	}, [url, setState, udatingComponent]);
};

export default useFetch;
