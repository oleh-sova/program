import React from 'react';

import loader from '../../../utils/images/loader.gif';

export default function Loader() {
	return (
		<div className='section-loyout'>
			<img src={loader} alt='Loader' />
		</div>
	);
}
