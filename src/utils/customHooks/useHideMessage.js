import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { isCloseMessage } from '../../store/message/actionsCreators';

const useHideMessage = (id) => {
	const dispatch = useDispatch();

	useEffect(() => {
		let timer;

		if (id) {
			timer = setTimeout(() => {
				dispatch(isCloseMessage(id));
			}, 2000);
		}

		return () => {
			if (id) {
				clearTimeout(timer);
				dispatch(isCloseMessage(id));
			}
		};
	}, [id, dispatch]);
};

export default useHideMessage;
