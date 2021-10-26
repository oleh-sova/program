import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getDataAPI } from '../API/api';

const useFetch = (url, destinations) => {
	const dispatch = useDispatch();
	useEffect(() => {
		console.log('get info..');
		getDataAPI(url).then((data) => {
			dispatch(destinations(data.result));
		});
	}, [url, destinations, dispatch]);
};

export default useFetch;
