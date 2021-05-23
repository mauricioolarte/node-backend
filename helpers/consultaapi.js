const axios = require('axios');
const { request } = require('express');
const fs = require('fs')

const consultasApi = (url) => {

	axios.get(url)
		.then((respuesta) => {
			const values = JSON.stringify(respuesta.data);
			// console.log(values)
			fs.writeFileSync('values.json', values);
		})
		.catch((error) => console.error(error))
}

module.exports = consultasApi;