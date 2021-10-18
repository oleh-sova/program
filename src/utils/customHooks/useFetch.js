import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

const useFetch = (actions) => {
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('get info..');
		dispatch(actions());
	}, [actions, dispatch]);
};

export default useFetch;
