const axios = require('axios');
const { request } = require('express');
const fs = require('fs')

const consultasApi = async (url) => {

	await axios.get(url)
		.then((respuesta) => {

			const values = JSON.stringify(respuesta.data);
			// console.log(values)
			fs.writeFileSync('values.json', values);
		})
		.catch((error) => {
			// console.error(error)
			const values = JSON.stringify(error);
			console.log(values)
			fs.writeFileSync('values.json', values);
		})
}

module.exports = consultasApi;