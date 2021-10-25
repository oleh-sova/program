import React from 'react';

import { Link } from 'react-router-dom';

const SectionDenied = () => {
	return (
		<section className='access_dn'>
			<div className='row'>
				<div className='columns small-12'>
					<div>
						Permission denied, please you{' '}
						<Link to={'/login'} className=''>
							Log in
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
export default SectionDenied;
