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

export const deleteDataAPI = async (url, courseId, token) => {
	const response = await fetch(`${url}${courseId}`, {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
