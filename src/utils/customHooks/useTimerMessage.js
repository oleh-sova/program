import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { hideError } from '../../store/errors/actionsCreators';

const useHideMessage = (alert) => {
	const dispatch = useDispatch();

	console.log('work');

	useEffect(() => {
		let timer;

		if (alert) {
			timer = setTimeout(() => {
				dispatch(hideError());
				console.log('start');
			}, 2000);
		}

		return () => {
			if (alert) {
				console.log('close');
				clearTimeout(timer);
				dispatch(hideError());
			}
		};
	}, [alert, dispatch]);
};

export default useHideMessage;
