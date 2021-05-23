
const { response, request } = require('express');
const axios = require('axios');

const idGeneros = require('../helpers/idgeneros');
const consultasApi = require('../helpers/consultaapi');
const getDataFile = require('../helpers/getdatafile');



const searchPost = (req = request, res = response) => {

	const { words, sort, orderBy, genero, tipo, limite = 10 } = req.body;
	const searchWords = words ? `${words.replace(' ', '%20')}&` : '';
	const sortParameter = sort ? `sort=${sort}&` : '';
	const orderByParameter = orderBy ? `order_by=${orderBy}&` : '';
	let idGenre = idGeneros[genero];
	const generoParameter = genero ? `genre=${idGenre}&` : '';
	const limiteParameter = limite ? `limit=${limite}&` : '';
	const tipoParameter = tipo ? `type=${tipo}&` : '';


	const urlExternApi = 'https://api.jikan.moe/v3/search/anime?q=';


	const completeSearchUrl = `${urlExternApi}${searchWords}&${sortParameter}&${orderByParameter}` +
		`${generoParameter}&${limiteParameter}&${tipoParameter}`;

	consultasApi(completeSearchUrl);
	const info = getDataFile()

	console.log(info);
	info.results.forEach((element) => {
		let message = '';
		if (element.score >= 1 && element.score <= 4.9) {
			message = "I do not recommend it."
		} else if (element.score > 5 && element.score <= 7.9) {
			message = "You may have fun."
		} else {
			message = "Great, this is one of the best anime."
		}

		element.message = message
	})



	// pendiente manejar error respuesta

	res.json({
		'msg': 'ok',
		'values': info.results
	})
}

module.exports = {
	searchPost
} 