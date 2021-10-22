export const getDataFetch = async (url, data, token) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return await response.json();
};
