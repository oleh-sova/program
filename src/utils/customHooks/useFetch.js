import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

const useFetch = (actions) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions());
	}, [actions, dispatch]);
};

export default useFetch;
