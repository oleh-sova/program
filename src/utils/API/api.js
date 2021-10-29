export const getDataAPI = async (url, token = null) => {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};

export const sendDataAPI = async (url, data, token = null) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: token || null,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return await response.json();
};

export const deleteDataAPI = async (url, token = null) => {
	console.log(url);
	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});
	return response;
};

export const changeDataAPI = async (url, data, token = null) => {
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(data),
	});
	return await response.json();
};
