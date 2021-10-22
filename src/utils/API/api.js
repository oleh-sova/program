export const getDataAPI = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	return data;
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
